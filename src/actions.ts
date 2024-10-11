"use server";

import { redirect } from "next/navigation";
import { signOut } from "./auth";
import { cookies } from "next/headers";

export const signoutUser = async () => {
  try {
    await signOut();
    cookies().delete("passwordless-signin-token");
    console.log("Signout successfully");
    redirect("/sign-in");
  } catch (error) {
    console.log("Error from server action to signout user: " + error);
    // return {
    //   success: false,
    //   message: (error as Error).message,
    // };
  }
};
