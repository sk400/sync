import { z } from "zod";

export const usernameValidationSchema = z
  .string()
  .min(2, {
    message: "Username must be at least 2 characters.",
  })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Username can only contain letters and numbers.",
  });

export const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: usernameValidationSchema,
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
