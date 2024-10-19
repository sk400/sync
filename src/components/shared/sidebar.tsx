import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { FiHome, FiBell, FiUser, FiSend } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

const SidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: <FiHome className="mr-2" size={20} />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <FiUser className="mr-2" size={20} />,
  },
  {
    name: "Send",
    href: "/send",
    icon: <FiSend className="mr-2" size={20} />,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: <FiBell className="mr-2" size={20} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="pt-7 pl-7">
      <Card>
        <img
          src="https://cdn.pixabay.com/photo/2023/06/18/12/17/meadow-8071932_640.jpg"
          alt="Background"
          className="w-full h-[100px] rounded-t-lg "
        />
        <CardHeader>
          <Avatar className="w-20 h-20 rounded-[50%] -mt-16">
            <AvatarImage
              src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg"
              alt="Robert Fox"
            />
            <AvatarFallback>RF</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-medium  mt-2">Robert Fox</h2>
          <p className="text-sm text-gray-500 ">Software Engineer</p>
        </CardHeader>
        <CardContent>
          <nav className="mt-4">
            <ul className="">
              {SidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-600 hover:text-gray-900 "
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  <Separator className="my-4 bg-[#ECF0F5]" />
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
