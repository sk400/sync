import VerificationEmail from "@/components/emails/verificationEmail";
import { resendInstance } from "@/lib/resendInstance";

interface EmailParams {
  fullname: string;
  email: string;
  otp: string;
}

export const sendVerificationEmail = async ({
  fullname,
  email,
  otp,
}: EmailParams) => {
  try {
    const { error } = await resendInstance.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ fullname, otp }),
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
      message: `Verification email is sent successfully to this email ${email}`,
    };
  } catch (error) {
    console.error("Error while sending the verification email", error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
