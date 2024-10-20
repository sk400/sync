"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import SignoutButton from "./signout-button";
import logo from "@/assets/sync-logo.png";
import { FiUser, FiSend } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="bg-[#FFFFFF] fixed top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="Sync Logo" width={100} height={100} />
        </div>
        <Input
          type="search"
          placeholder="Search"
          className="max-w-[400px] hidden md:block"
        />
        <div className="hidden md:flex items-center ">
          <SignoutButton />
          <FiUser />
        </div>

        <div className="md:hidden">
          <FiSend className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
