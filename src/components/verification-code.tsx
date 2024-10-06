"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function VerificationCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter verification code
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Code sent to anorouzi.work@gmail.com
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

        <Button type="submit" className="w-full bg-[#0C1024] text-[#fff]">
          Continue
        </Button>
      </div>
    </div>
  );
}
