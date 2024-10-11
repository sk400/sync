// import { getUserByEmailQuery } from "@/lib/sanityQueries";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getUserByEmailOrUsername } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function Home() {
  // const email = "skdeveloper101@gmail.com";

  const query = groq`*[_type == "user"]`;

  const user = await client.fetch(getUserByEmailOrUsername, {
    email: "skdeveloper101@gmail.com",
    username: "skdeveloper101",
  });

  console.log(user);

  return (
    <main>
      <h1>Smsung Galaxy Book 4</h1>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </main>
  );
}
