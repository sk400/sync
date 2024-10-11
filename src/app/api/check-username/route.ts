import { getUserByUsernameQuery } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { usernameValidationSchema } from "@/schemas/signupSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const checkUsernameSchema = z.object({
  username: usernameValidationSchema,
});

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const result = checkUsernameSchema.safeParse({
      username,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid username",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const userByUsername = await client.fetch(getUserByUsernameQuery, {
      username: result.data.username.toLowerCase().trim(),
    });

    if (userByUsername) {
      return NextResponse.json(
        {
          message: "Username is already taken",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: `Username is available`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};
