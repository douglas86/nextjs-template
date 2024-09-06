// next auth packages
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib directory
import prisma from "@/lib/prisma";
import { secret_key } from "@/lib/keys";
import { google_id, google_secret } from "@/lib/keys";

// utils directory
import { encryptData, decryptData } from "@/utils/API";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  jwt: {
    secret: secret_key,
    encryption: false,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ user }) {
      // find current user email address
      const finding = user.email.indexOf("@gmail.com");

      // if current users email address is found,
      // then encrypt name and email address
      if (finding !== -1) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: await encryptData(user.name),
            email: await encryptData(user.email),
          },
        });
      }

      return {
        user: {
          id: user.id,
          name: finding > -1 ? user.name : await decryptData(user.name),
          email: finding > -1 ? user.email : await decryptData(user.email),
          image: user.image,
        },
      };
    },
    async signIn() {
      return true;
    },
  },
  secret: secret_key,
  providers: [
    GoogleProvider({
      clientId: google_id,
      clientSecret: google_secret,
    }),
  ],
});

export { handler as GET, handler as POST };
