"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponse";

const VerifyLink = () => {
  const [verifying, setVerifying] = useState(true);
  const [token, setToken] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const tokenString = window.location?.search?.split("=")[1];
    if (tokenString.length > 0) {
      setToken(tokenString);
    }
  }, []);

  useEffect(() => {
    const verifySigninLink = async () => {
      if (!token) return;
      try {
        setVerifying(true);
        const response = await axios.post("/api/signin-with-email/verify", {
          token,
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

        router.replace("/");
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.log(error);
        toast({
          title: "Verification failed",
          description:
            axiosError.response?.data?.message ??
            "Unexpected error occured while verifying your link",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };
    verifySigninLink();
  }, [token]);

  return (
    <div>
      <p className="text-center text-lg gont-semibold">
        {verifying ? "Verifying..." : "Verified"}
      </p>
    </div>
  );
};

export default VerifyLink;

// signin-with-email/link
// signin-with-email/verify
