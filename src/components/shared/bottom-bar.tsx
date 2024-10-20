"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { FiHome, FiSearch, FiBell } from "react-icons/fi";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  const isSearchPage = pathname.includes("/search");
  const isHomePage = pathname.includes("/");
  const isNotificationsPage = pathname.includes("/notifications");
  const isProfilePage = pathname.includes("/profile");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 sm:px-6 bg-[#fff]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center">
          <FiHome
            className={`h-6 w-6 ${isHomePage ? "text-[#0C1024]" : "text-[#838B98]"}`}
          />
        </Link>
        <Link href="/search" className="flex flex-col items-center">
          <FiSearch
            className={`h-6 w-6 ${isSearchPage ? "text-[#0C1024]" : "text-[#838B98]"}`}
          />
        </Link>
        <Link href="/notifications" className="flex flex-col items-center">
          <FiBell
            className={`h-6 w-6 ${isNotificationsPage ? "text-[#0C1024]" : "text-[#838B98]"}`}
          />
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-gray-300 overflow-hidden">
            <User
              className={`h-6 w-6 ${isProfilePage ? "text-[#0C1024]" : "text-[#838B98]"}`}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomBar;
