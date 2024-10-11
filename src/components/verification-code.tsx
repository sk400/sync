"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponse";

export function VerificationCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const email = window.location.search.split("=")[1];
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.length <= 1) {
      const newArray = [...code];
      newArray[index] = e.target.value;
      setCode(newArray);
      if (index < 3 && e.target.value !== "") {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  const verify = async () => {
    if (!email || !code.join("").length) return;

    try {
      setVerifying(true);
      const response = await axios.post("/api/verify-account", {
        email,
        code: code.join(""),
      });

      if (response.data.success === false) {
        toast({
          title: "Verification failed",
          description: response.data.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Verification successful",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error);
      toast({
        title: "Verification failed",
        description:
          axiosError.response?.data?.message ??
          "Unexpected error occured while verifying your account",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter verification code
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Code sent to {email}
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          {code.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputs.current[index] = el)}
              className="w-12 h-12 text-center text-2xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#0C1024] text-[#fff]"
          onClick={verify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
}
