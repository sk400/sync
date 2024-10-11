"use server";

import { signIn } from "./auth";

export const signInWithCredentials = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", credentials);
    console.log(res);

    return {
      success: true,
      message: "Sign in successfully",
    };
  } catch (error) {
    console.log("Error from server action: " + error);
    return {
      success: false,
      message: error,
    };
  }
};
