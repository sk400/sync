import { getUserByResetPasswordToken } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  token: z.string({
    message: "Invalid token",
  }),
});

export const POST = async (req: NextRequest) => {
  try {
    const { password, token } = await req.json();

    const result = schema.safeParse({
      password,
      token,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid password or token", success: false },
        { status: 400 }
      );
    }

    const user = await client.fetch(getUserByResetPasswordToken, {
      token,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 404 }
      );
    }

    const isTokenExpired = Date.now() > user.resetPasswordTokenExpiry;

    if (isTokenExpired) {
      return NextResponse.json(
        {
          message:
            "The token is expired. Please go to forgot password page and enter your email to request a new one",
          success: false,
        },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        {
          message: "Please verify your account before reseting your password",
          success: false,
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client
      .patch(user._id)
      .set({
        password: hashedPassword,
        resetPasswordToken: "",
      })
      .commit();

    return NextResponse.json(
      {
        message:
          "Password reset successfully. You can login with your new password",
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
