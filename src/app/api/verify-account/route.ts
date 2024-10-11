import { getUserByEmailQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const verifyAccountSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4, { message: "Code must be 4 digits" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const { email, code } = await req.json();

    const result = verifyAccountSchema.safeParse({
      email,
      code,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid email or code", success: false },
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

    if (user.verifyCode !== code) {
      return NextResponse.json(
        { message: "Code doesn't match", success: false },
        { status: 401 }
      );
    }

    const now = Date.now();
    if (user.verifyCodeExpiry < now) {
      return NextResponse.json(
        { message: "Code expired", success: false },
        { status: 401 }
      );
    }

    await client
      .patch(user._id)
      .set({
        verifyCode: "",
        verified: true,
      })
      .commit();

    return NextResponse.json({ message: "Account verified", success: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, success: false },
      { status: 500 }
    );
  }
};
