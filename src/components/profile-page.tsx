"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  Home,
  User,
  MessageSquare,
  Bell,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";

export function ProfilePageComponent() {
  const [activeTab, setActiveTab] = useState("my-posts");
  const router = useRouter();

  

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         

          <div className="col-span-1 md:col-span-3">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="Robert Fox" />
                    <AvatarFallback>RF</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">Robert Fox</h1>
                    <p className="text-sm text-gray-500">@robert</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <div className="flex space-x-4">
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
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="my-posts" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="my-posts">
                      <p className="bg-gradient-to-tl">My Posts</p>
                    </TabsTrigger>
                    <TabsTrigger value="saved-posts">Saved Posts</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="my-posts">
                    <div className="space-y-4">
                      <PostCard
                        author="Robert Fox"
                        authorImage="/placeholder-user.jpg"
                        content="Received a lot of questions about breaking into the tech industry lately. If you're starting out or looking to switch careers, feel free to connect with me. I'm here to help and share insights! 📚"
                        timestamp="3 days ago"
                      />
                      <PostCard
                        author="Robert Fox"
                        authorImage="/placeholder-user.jpg"
                        content="Today marks 5 years in the software engineering field. Grateful for all the opportunities and growth along the way. Here's to many more years of coding excellence!"
                        timestamp="27 July, 2022"
                        image="/placeholder.svg"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="saved-posts">
                    <div className="space-y-4">
                      <PostCard
                        author="Bessie Cooper"
                        authorImage="/placeholder-user.jpg"
                        content="In today's fast-paced, digitally driven world, digital marketing is not just a strategy. It's a necessity for businesses of all sizes. 📊"
                        timestamp="7 hours ago"
                      />
                      <PostCard
                        author="Jacob Jones"
                        authorImage="/placeholder-user.jpg"
                        content="Prepare to be dazzled by our latest collection! From trendy fashion to must-have gadgets, we've got something for everyone."
                        timestamp="1 day ago"
                        image="/placeholder.svg"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Tabs defaultValue="general">
                      <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                      </TabsList>
                      <TabsContent value="general">
                        <form className="space-y-4">
                          <div>
                            <Label htmlFor="avatar">Profile Picture</Label>
                            <Input id="avatar" type="file" />
                          </div>
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue="Robert Fox" />
                          </div>
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@robert" />
                          </div>
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" />
                          </div>
                          <Button>Save Changes</Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="account">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            Delete Account
                          </h3>
                          <p className="text-sm text-gray-500">
                            This action is irreversible and will permanently
                            delete all your data associated with the account.
                          </p>
                          <Button variant="destructive">
                            Delete My Account
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function PostCard({ author, authorImage, content, timestamp, image }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            <AvatarImage src={authorImage} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        {image && (
          <Image
            src={image}
            alt="Post image"
            width={500}
            height={300}
            className="mt-4 rounded-lg"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
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
