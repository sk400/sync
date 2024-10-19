"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponse";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  const { toast } = useToast();
  const router = useRouter();
  const signoutUser = async () => {
    try {
      const response = await axios.get("/api/sign-out");

      if (response.data.success === false) {
        toast({
          title: "Sign out failed",
          description: response.data.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Sign out successful",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error);
      toast({
        title: "Sign out failed",
        description:
          axiosError.response?.data?.message ??
          "Unexpected error occured while signing out",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          signOut();
          signoutUser();
        }}
        variant="ghost"
      >
        Signout
      </Button>
    </div>
  );
};

export default SignoutButton;
