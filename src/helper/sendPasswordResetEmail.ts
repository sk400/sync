import { PasswordResetEmail } from "@/components/emails/passwordResetEmail";
import {resendInstance}   from "@/lib/resendInstance"

interface EmailParams {
  fullname: string;
  email: string;
  token: string;
}



export const sendPasswordResetEmail = async ({
  fullname,
  email,
  token,
}: EmailParams) => {
  try {
    const { error } = await resendInstance.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      react: PasswordResetEmail({ fullname, token }),
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: `Password reset email is sent successfully to this email ${email}`,
    };
  } catch (error) {
    console.error("Error while sending the password reset email", error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
