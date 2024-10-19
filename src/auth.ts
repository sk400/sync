import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signinSchema } from "./schemas/signinSchema";
import { client } from "./sanity/lib/client";
import { getUserByEmailQuery } from "./lib/sanityQueries";
import "next-auth";
import "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      name?: string | null;
      email?: string | null;
      username?: string;
      verified?: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: string;
    name?: string | null;
    email?: string | null;
    username?: string;
    verified?: boolean;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    name?: string | null;
    email?: string | null;
    username?: string;
    verified?: boolean;
  }
}

class InvalidEmailError extends CredentialsSignin {
  code = "User doesn't exists with this email";
}

class InvalidCredentials extends CredentialsSignin {
  code = "Invalid username or password";
}

class unVerifiedSignin extends CredentialsSignin {
  code = "Please verify your email before sign in";
}

class inorrectPassword extends CredentialsSignin {
  code = "Incorrect password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "text", label: "Username or Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        const validationResult = signinSchema.safeParse(credentials);

        if (!validationResult.success) {
          throw new InvalidCredentials();
        }

        const user = await client.fetch(getUserByEmailQuery, {
          email: validationResult.data.email,
        });

        if (!user) {
          throw new InvalidEmailError();
        }

        if (!user.verified) {
          throw new unVerifiedSignin();
        }

        const isPasswordCorrect = await bcrypt.compare(
          validationResult.data.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new inorrectPassword();
        }

        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.username = token.username;
        session.user.verified = token.verified;
      }
      return session;
    },
    async signIn({ account, profile }) {
      // console.log("Account:-");
      // console.log(account);
      // console.log("Profile:-");
      // console.log(profile);

      if (account?.provider === "google") {
        const user = await client.fetch(getUserByEmailQuery, {
          email: profile?.email,
        });

        if (!user) {
          const doc = {
            _type: "user",
            _id: uuidv4(),
            name: profile?.name,
            email: profile?.email,
            verified: profile?.email_verified,
            username: "",
          };
          await client.createIfNotExists(doc);
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});

// skdeveloper101@gmail.com
