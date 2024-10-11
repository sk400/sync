import { getUserByEmailQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { signinWithEmailSchema } from "@/schemas/signinWithEmailSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sendMagicLinkEmail } from "@/helper/sendMagicLinkEmail";

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
      const userData = {
        _id: uuidv4(),
        _type: "user",
        name: "",
        email: result.data.email,
        username: "",
        password: "",
        verified: false,
      };

      const { _id } = await client.createIfNotExists(userData);

      const tokenData = {
        id: _id,
        email,
      };

      const token = jwt.sign(tokenData, process.env.SECRET_KEY!);
      const expiryDate = Date.now() + 1000 * 60 * 30;

      await client
        .patch(_id)
        .set({
          magicLink: token,
          magicLinkExpiry: expiryDate,
        })
        .commit();

      // email sending

      const emailParams = {
        fullname: result.data.email,
        email: email,
        token,
      };

      const res = await sendMagicLinkEmail(emailParams);

      if (res.success === false) {
        return NextResponse.json(
          { message: res.message, success: false },
          { status: 500 }
        );
      }
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY!);
    const expiryDate = Date.now() + 1000 * 60 * 30;

    await client
      .patch(user._id)
      .set({
        magicLink: token,
        magicLinkExpiry: expiryDate,
      })
      .commit();

    const emailParams = {
      fullname: result.data.email,
      email: email,
      token,
    };

    const res = await sendMagicLinkEmail(emailParams);

    if (res.success === false) {
      return NextResponse.json(
        { message: res.message, success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `The signin link  is sent successfully to this email ${email}. The link will expire in 30 minutes`,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, success: false },
      { status: 500 }
    );
  }
};
