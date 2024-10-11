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
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ApiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";

export function ForgotPasswordComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/forgot-password", values);

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
          "Unexpected error occured while sending the password reset email",
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
            Forgot password
          </h2>
          <p className="mt-2 text-sm text-gray-600 w-[80%] mx-auto">
            Enter your email to reset your password and access your account.
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
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
