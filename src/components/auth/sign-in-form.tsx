"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signinSchema } from "@/schemas/signinSchema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // skdeveloper101@gmail.com
  // saumya123@gmail.com

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      setIsSubmitting(true);
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log(response);

      if (response?.error) {
        toast({
          title: "Sign in failed",
          description: response?.code,
          variant: "destructive",
        });

        return;
      } else {
        toast({
          title: "Sign in successful",
          description: `Welcome back ${values.email}`,
        });

        router.push("/");

        // form.reset();
      }
      // toast({
      //   title: "Sign in successful",
      //   description: `Welcome back ${values.email}`,
      // });
      // router.push("/");
    } catch (error) {
      console.log(error);

      toast({
        title: "Sign in failed",
        description:
          (error as Error).message ??
          "Unexpected error occured while signing in",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-0 px-4 sm:px-6 lg:px-8 bg-[#FAFBFF] rounded-lg">
      <div className="max-w-[450px] w-full space-y-8 py-10 ">
        <div className=" space-y-6">
          {/* Google sign in button and Email sign in button */}
          <div className="space-y-4">
            {/* Google sign in button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Sign in with Google
            </Button>
            {/* Email sign in button */}
            <Button variant="outline" className="w-full">
              <Mail className="w-5 h-5 mr-2" />
              <Link href="/signin-with-email">Sign in with Email</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3" />
          </div>
          {/* Sign up form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end w-full">
                      <Link
                        href="/forgot-password"
                        className="text-right text-sm text-gray-600 "
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0C1024] text-[#fff]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-gray-900 hover:text-gray-800"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
