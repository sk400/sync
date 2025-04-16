"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FiUploadCloud } from "react-icons/fi";
import { PostCardType } from "@/types/next-auth";

type MainTab = "my-posts" | "saved-posts" | "settings";
type SettingsTabType = "general" | "account" | "logout";
interface TabType {
  name: MainTab;
  icon: React.ReactNode;
}

const profileFormSchema = z.object({
  image: z.string(),
  fullname: z
    .string()
    .min(5, { message: "Fullname must be at least 5 characters" })
    .max(50),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(30),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters" }),
});

export function ProfilePageComponent() {
  const [activeTab, setActiveTab] = useState("my-posts");
  const [settingsTab, setSettingsTab] = useState<SettingsTabType>("general");

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
  }

  return (
    <main className="max-w-7xl mx-auto  sm:px-6 lg:px-8 mt-7">
      {/* Top container with tab triggers */}
      <div className="bg-[#fff]  py-5 ">
        <div className="flex px-4 justify-between items-start ">
          {/* User info */}
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4 sm:mb-6 md:mb-10">
            <Avatar className="w-20 h-20 rounded-[50%] ">
              <AvatarImage
                src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg"
                alt="Robert Fox"
              />
              <AvatarFallback>RF</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl font-medium">Robert Fox</h1>
              <p className="text-sm ">@robert</p>
              <p className="text-sm items-stretch hidden md:block mt-3 ">
                Software Engineer
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex space-x-4 mt-3">
            <div className="text-center">
              <p className="font-bold">12</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold">207</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">64</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>
        {/* Bio */}
        <p className="text-sm items-stretch md:hidden px-4">
          Software Engineer
        </p>
        <Separator className="mt-6   bg-[#ECF0F5]  " />
        <div className=" md:mt-0 ">
          <Tabs defaultValue="my-posts" className="w-full mb-20 ">
            {/* mobile screen tabs */}
            <TabsList className="grid w-full grid-cols-3 md:hidden px-4 bg-[#fff]">
              <TabsTrigger
                value="my-posts"
                onClick={() => setActiveTab("my-posts")}
              >
                <RxDashboard
                  className={`text-lg  ${activeTab === "my-posts" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                />
              </TabsTrigger>
              <TabsTrigger
                value="saved-posts"
                onClick={() => setActiveTab("saved-posts")}
              >
                <CiBookmark
                  className={`text-lg  ${activeTab === "saved-posts" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                />
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                onClick={() => setActiveTab("settings")}
              >
                <CiSettings
                  className={`text-lg  ${activeTab === "settings" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                />
              </TabsTrigger>
            </TabsList>
            {/* after md screen tab */}
            <TabsList className="bg-[#fff] px-4 hidden md:block ">
              <TabsTrigger
                value="my-posts"
                onClick={() => setActiveTab("my-posts")}
                className="pl-0"
              >
                <p
                  className={`${activeTab === "my-posts" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                >
                  My posts
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="saved-posts"
                onClick={() => setActiveTab("saved-posts")}
              >
                <p
                  className={` ${activeTab === "saved-posts" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                >
                  Saved posts
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                onClick={() => setActiveTab("settings")}
              >
                <p
                  className={` ${activeTab === "settings" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                >
                  Settings
                </p>
              </TabsTrigger>
            </TabsList>

            <div className="w-full h-[10px]  sm:h-[30px] bg-[#FAFBFF]  " />

            <TabsContent value="my-posts">
              <div className="space-y-4">
                <PostCard
                  author="Robert Fox"
                  authorImage="https://cdn.pixabay.com/photo/2018/12/20/23/55/tiger-3887020_1280.jpg"
                  content="Received a lot of questions about breaking into the tech industry lately. If you're starting out or looking to switch careers, feel free to connect with me. I'm here to help and share insights! 📚"
                  timestamp="3 days ago"
                  image="https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513852_1280.jpg"
                />
                <PostCard
                  author="Robert Fox"
                  authorImage="https://cdn.pixabay.com/photo/2018/12/20/23/55/tiger-3887020_1280.jpg"
                  content="Today marks 5 years in the software engineering field. Grateful for all the opportunities and growth along the way. Here's to many more years of coding excellence!"
                  timestamp="27 July, 2022"
                  image="https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513852_1280.jpg"
                />
              </div>
            </TabsContent>
            <TabsContent value="saved-posts">
              <div className="space-y-4">
                <PostCard
                  author="Bessie Cooper"
                  authorImage="https://cdn.pixabay.com/photo/2018/12/20/23/55/tiger-3887020_1280.jpg"
                  content="In today's fast-paced, digitally driven world, digital marketing is not just a strategy. It's a necessity for businesses of all sizes. 📊"
                  timestamp="7 hours ago"
                  image="https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513852_1280.jpg"
                />
                <PostCard
                  author="Jacob Jones"
                  authorImage="https://cdn.pixabay.com/photo/2018/12/20/23/55/tiger-3887020_1280.jpg"
                  content="Prepare to be dazzled by our latest collection! From trendy fashion to must-have gadgets, we've got something for everyone."
                  timestamp="1 day ago"
                  image="https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513852_1280.jpg"
                />
              </div>
            </TabsContent>
            <TabsContent value="settings" className="px-4 md:px-0 ">
              <h4 className="text-md font-semibold hidden md:block px-4 my-4">
                Settings
              </h4>

              <Separator className="mb-5 bg-[#ECF0F5]  hidden md:block" />

              <Tabs
                defaultValue="general"
                className="md:grid md:grid-cols-4 w-full"
              >
                {/* Mobile screen tabs */}
                <TabsList className="grid grid-cols-3 bg-[#fff] md:hidden">
                  <TabsTrigger
                    value="general"
                    onClick={() => setSettingsTab("general")}
                  >
                    <p
                      className={`text-[#0C1024]  ${settingsTab === "general" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      General
                    </p>
                  </TabsTrigger>

                  <TabsTrigger
                    value="account"
                    onClick={() => setSettingsTab("account")}
                  >
                    <p
                      className={`${settingsTab === "account" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      {" "}
                      Account
                    </p>
                  </TabsTrigger>

                  <TabsTrigger
                    value="logout"
                    onClick={() => setSettingsTab("logout")}
                  >
                    <p
                      className={`${settingsTab === "logout" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      Logout
                    </p>
                  </TabsTrigger>
                </TabsList>
                {/* Md screen tabs */}
                <TabsList className="hidden md:flex flex-col items-center  bg-[#fff] col-span-1 mt-9 -ml-12">
                  <TabsTrigger
                    value="general"
                    onClick={() => setSettingsTab("general")}
                  >
                    <p
                      className={` ${settingsTab === "general" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      General
                    </p>
                  </TabsTrigger>

                  <TabsTrigger
                    value="account"
                    onClick={() => setSettingsTab("account")}
                  >
                    <p
                      className={`${settingsTab === "account" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      {" "}
                      Account
                    </p>
                  </TabsTrigger>

                  <TabsTrigger
                    value="logout"
                    onClick={() => setSettingsTab("logout")}
                  >
                    <p
                      className={`${settingsTab === "logout" ? "text-[#0C1024]" : "text-[#838B98]"}`}
                    >
                      Logout
                    </p>
                  </TabsTrigger>
                </TabsList>

                <div className="col-span-3 mt-3 pr-4">
                  <TabsContent value="general" className=" ">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <label>
                                  <div className="flex w-full justify-center items-center rounded-md border-[1px] border-dashed border-primary/20 py-3 gap-2 ">
                                    <FiUploadCloud className="text-[#4B5669]" />

                                    <p className="text-xs text-[#4B5669]">
                                      Choose an image for Avatar
                                    </p>
                                    <input
                                      type="file"
                                      // onChange={uploadImage}
                                      style={{
                                        width: "0px",
                                        height: "0px",
                                      }}
                                      {...field}
                                    />
                                  </div>
                                </label>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fullname"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Full name"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Username"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Bio"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save</Button>
                      </form>
                    </Form>
                  </TabsContent>
                  <TabsContent value="account">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Delete Account</h3>
                      <p className="text-sm text-gray-500">
                        This action is irreversible and will permanently delete
                        all your data associated with the account.
                      </p>
                      <Button
                        variant="outline"
                        className="text-[#B81616] border-[#B81616]"
                      >
                        Delete my Account
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Tab sections */}
      {/* <div>
        <Tabs defaultValue="my-posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-posts">
              <p className="bg-gradient-to-tl">My Posts</p>
            </TabsTrigger>
            <TabsTrigger value="saved-posts">Saved Posts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}
    </main>
  );
}

function PostCard({
  author,
  authorImage,
  content,
  timestamp,
  image,
}: PostCardType) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="w-[56px] h-[56px] rounded-[50%] mr-2">
            <AvatarImage src={authorImage} alt={author} className="rounded-full" />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium  text-[14px]">{author}</p>
            <p className="text-[12px] text-gray-500">{timestamp}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-[46px]">
        <p className="text-[14px] font-normal">{content}</p>
        {/* {image && (
         
        )} */}
         <div className="w-full h-[247px] relative mt-[24px]">
            <Image
              src={image}
              alt="Post image"
              fill
              className=" rounded-lg absolute object-cover"
            />
          </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-[64px]">
        <Button variant="ghost" size="sm">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Send className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm">
          <Bookmark className="mr-2 h-4 w-4" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
