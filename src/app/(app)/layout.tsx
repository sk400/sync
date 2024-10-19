import { BottomBar, Navbar, Sidebar } from "@/components/shared";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-[#FAFBFF]">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="hidden md:block col-span-1 ">
          <Sidebar />
        </div>
        <div className=" md:col-span-3 "> {children}</div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomBar />
      </div>
    </div>
  );
}
