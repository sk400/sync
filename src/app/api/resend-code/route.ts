import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { getUserByEmailQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { signinWithEmailSchema } from "@/schemas/signinWithEmailSchema";
import { NextRequest, NextResponse } from "next/server";

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
        {
          message: `User doesn't exists with this ${result.data.email} email`,
          success: false,
        },
        { status: 404 }
      );
    }

    if (user.verified) {
      return NextResponse.json(
        { message: "User is already verified, please sign in", success: false },
        { status: 401 }
      );
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    const expiryDate = Date.now() + 1000 * 60 * 30;

    await client
      .patch(user._id)
      .set({
        verifyCode: code.toString(),
        verifyCodeExpiry: expiryDate,
      })
      .commit();

    // email sending

    const emailParams = {
      fullname: user.name ?? result.data.email,
      email: result.data.email,
      otp: code.toString(),
    };

    const res = await sendVerificationEmail(emailParams);

    if (res.success === false) {
      return NextResponse.json(
        { message: res.message, success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Verification code sent to your email. The code will expire in 30 minutes",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
