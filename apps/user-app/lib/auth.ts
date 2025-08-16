import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import db from "@repo/db/client";
import { SessionStrategy } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

// Credentials parameter type for authorize method
type CredentialsType = {
  email: string;
  password: string;
};

type AuthorizedUser = {
  name?: string;
  id: string;
  email: string;
};

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email or phone number",
        },
        password: { label: "Password", type: "password", placeholder: "" },
      },

      async authorize(
        credentials: CredentialsType | undefined,
      ): Promise<AuthorizedUser | null> {
        if (!credentials) return null;

        // Zod validation, OTP validation
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const existingUser = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            firstName: true,
            lastName: true,
            id: true,
            password: true,
            email: true,
          },
        });

        if (existingUser) {
          const passwordValidated = await bcrypt.compare(
            existingUser.password ?? "",
            credentials.password,
          );

          if (passwordValidated) {
            return {
              id: existingUser.id,
              name: `${existingUser?.firstName ?? ""} ${existingUser.lastName ?? ""}`,
              email: existingUser.email ?? "",
            };
          }

          return null; // wrong password
        }

        try {
          const newUser = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });

          return {
            email: newUser.email ?? "",
            id: newUser.id,
            name: `${newUser?.firstName ?? ""} ${newUser.lastName ?? ""}`,
          };
        } catch (err) {
          console.error(err);
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true, // allows users to signIn through diff providers using the same email address
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET ?? "secr3t",

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      token.id = user.id;
      return token;
    },

    async session({ session, token }: any) {
      if (!session || !token) return null;

      if (token && session.user) {
        session.user.id = token.id;
      }

      return session;
    },

    async signIn({ profile }) {
      if (!profile) {
        throw new Error("No profile");
      }

      try {
        await db.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            firstName: profile.name.split(" ")[0] ?? "",
          },
          update: {},
        });
      } catch (err) {
        console.error(err);
      }

      return true;
    },
  },
};
