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

const SignInWithEmail = () => {
  const form = useForm<z.infer<typeof signinWithEmailSchema>>({
    resolver: zodResolver(signinWithEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinWithEmailSchema>) {
    console.log(values);
  }

  return (
    <main className=" flex items-center justify-center  bg-[#fff] px-5 py-12 rounded-lg">
      <div className="w-full max-w-[300px] space-y-8">
        <div className="text-center">
          <h2 className=" mb-5 text-xl text-gray-900 font-semibold">
            Enter your email
          </h2>
          <p className="mt-2 text-sm text-gray-600 w-[80%] mx-auto">
            We will send a secure link for instant access to your account.
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
            <Button type="submit" className="w-full bg-[#0C1024] text-[#fff]">
              Send link
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignInWithEmail;
