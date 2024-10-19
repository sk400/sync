"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { signinWithEmailSchema } from "@/schemas/signinWithEmailSchema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ApiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";

const SignInWithEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signinWithEmailSchema>>({
    resolver: zodResolver(signinWithEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinWithEmailSchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/signin-with-email/link", values);

      if (response.data.success === false) {
        toast({
          description: response.data.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        description: response.data.message,
      });

      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error);
      toast({
        title: "Error",
        description:
          axiosError.response?.data?.message ??
          "Unexpected error occured while sending signin link email",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className=" flex items-center justify-center  bg-[#fff] px-5 py-12 rounded-lg">
      <div className="w-full max-w-[300px] space-y-8">
        <div className="text-center">
          <h2 className=" mb-5 text-xl text-gray-900 font-semibold">
            Enter your email
          </h2>
          <p className="mt-2 text-sm text-gray-600 w-[80%] mx-auto">
            We will send a secure link to signin without remembering a password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#0C1024] text-[#fff]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Link"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignInWithEmail;
