import { getUserByEmailQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { signinWithEmailSchema } from "@/schemas/signinWithEmailSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "@/helper/sendPasswordResetEmail";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const result = signinWithEmailSchema.safeParse({
      email,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid email", success: false },
        { status: 400 }
      );
    }

    const user = await client.fetch(getUserByEmailQuery, { email });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exists with this email", success: false },
        { status: 404 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { message: "Please verify your email before sign in", success: false },
        { status: 401 }
      );
    }

    //   Generate a jwt token

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY!);

    await client
      .patch(user._id)
      .set({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: Date.now() + 30 * 60 * 1000,
      })
      .commit();

    const emailParams = {
      fullname: user.name,
      email: email,
      token,
    };

    const res = await sendPasswordResetEmail(emailParams);

    if (res.success === false) {
      return NextResponse.json(
        { message: res.message, success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `A confirmation email is sent to this ${email} email. Please check your email and click on the link to reset your password.`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, success: false },
      { status: 500 }
    );
  }
};
