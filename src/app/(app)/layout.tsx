import { BottomBar, Navbar, Sidebar } from "@/components/shared";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden bg-[#FAFBFF]">
      <Navbar />
      <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto mt-20">
        <div className="hidden md:block col-span-1  ">
          <Sidebar />
        </div>
        <div className="col-span-4 md:col-span-3 h-[90vh] overflow-y-auto">
          {" "}
          {children}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <BottomBar />
      </div>
    </div>
  );
}

// h-[90vh] overflow-y-auto
