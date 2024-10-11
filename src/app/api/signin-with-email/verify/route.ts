import { getUserByMagicLinkTokenQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tokenSchema = z.object({
  token: z.string(),
});
export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    const result = tokenSchema.safeParse({
      token,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 400 }
      );
    }

    const user = await client.fetch(getUserByMagicLinkTokenQuery, { token });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exists with this token", success: false },
        { status: 404 }
      );
    }

    const isTokenExpired = Date.now() > user.magicLinkExpiry;

    if (isTokenExpired) {
      return NextResponse.json(
        {
          message:
            "The token is expired. Please go to 'signin with email' page and enter your email to request a new one",
          success: false,
        },
        { status: 401 }
      );
    }

    await client
      .patch(user._id)
      .set({
        magicLink: "",
        magicLinkExpiry: 0,
        verified: true,
      })
      .commit();

    const response = NextResponse.json(
      { message: "Sign in successful", success: true },
      { status: 200 }
    );

    response.cookies.set("passwordless-signin-token", result.data.token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message, success: false },
      { status: 500 }
    );
  }
};
