import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { client } from "@/sanity/lib/client";
import { signupSchema } from "@/schemas/signupSchema";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import {
  getUserByEmailQuery,
  getUserByUsernameQuery,
} from "@/lib/sanityQueries";

export const POST = async (req: NextRequest) => {
  try {
    // get user credentials
    const { name, username, email, password } = await req.json();

    // validate using zod and return error if invalid

    const result = signupSchema.safeParse({
      name,
      username,
      email,
      password,
    });
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }

    // check if user exists in sanity (by username)
    const userByUsername = await client.fetch(getUserByUsernameQuery, {
      username,
    });

    if (userByUsername) {
      return NextResponse.json(
        { message: "User with this username already exists", success: false },
        { status: 400 }
      );
    }

    // check if user exists in sanity (by email)

    const userByEmail = await client.fetch(getUserByEmailQuery, {
      email,
    });

    // create a 4 digit verification code
    const code = Math.floor(1000 + Math.random() * 9000);
    const verifyCodeExpiry = Date.now() + 1000 * 60 * 30;

    //   hash password

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userData = { ...result.data, password: hashedPassword };

    if (!userByEmail) {
      // create a user in sanity
      await client.createIfNotExists({
        _id: uuidv4(),
        _type: "user",
        verified: false,
        ...userData,
        username: userData.username.toLowerCase(),
        verifyCode: code.toString(),
        verifyCodeExpiry,
      });
    } else {
      if (userByEmail.verified === true) {
        return NextResponse.json(
          {
            message:
              "Verified user with this email already exists. Please sign in",
            success: false,
          },
          { status: 400 }
        );
      } else {
        // update user in sanity
        await client
          .patch(userByEmail._id)
          .set({
            username: userData.username.toLowerCase(),
            name: userData.name,
            password: hashedPassword,
            verifyCode: code.toString(),
            verifyCodeExpiry,
          })
          .commit();
      }
    }

    // send the verification email
    const emailParams = {
      fullname: name,
      email: email,
      otp: code.toString(),
    };

    const res = await sendVerificationEmail(emailParams);

    if (res.success === false) {
      return NextResponse.json(
        { message: res.message, success: false },
        { status: 500 }
      );
    }

    // if successful then return a nextResponse
    return NextResponse.json(
      {
        message:
          "Sign up successful. Check your email for verification code. The verification code will expire in 30 minutes",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
};
