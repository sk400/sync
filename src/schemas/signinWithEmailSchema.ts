import { z } from "zod";

export const signinWithEmailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
