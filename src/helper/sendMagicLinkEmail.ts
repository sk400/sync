import { MagicLinkEmail } from "@/components/emails/magicLinkEmail";

import { resendInstance } from "@/lib/resendInstance";

interface EmailParams {
  fullname: string;
  email: string;
  token: string;
}

export const sendMagicLinkEmail = async ({
  fullname,
  email,
  token,
}: EmailParams) => {
  try {
    const { error } = await resendInstance.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Sign in with a link",
      react: MagicLinkEmail({ fullname, token }),
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
      message: `The sign-in link is sent successfully to this email ${email}.`,
    };
  } catch (error) {
    console.error("Error while sending the signin link email", error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
