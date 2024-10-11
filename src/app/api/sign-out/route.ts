import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = NextResponse.json(
      {
        message: "Sign out successful",
      },
      { status: 200 }
    );

    res.cookies.delete("passwordless-signin-token");
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
};
