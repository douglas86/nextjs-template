// next auth packages
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib directory
import prisma from "@/lib/prisma";
import { JWT_SECRET, DATA_ENCRYPTION_SECRET } from "@/lib/keys";
import { GOOGLE_ID, GOOGLE_SECRET } from "@/lib/keys";

// utils directory
import { encryptData, decryptData } from "@/utils/API";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  jwt: {
    secret: JWT_SECRET,
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
  secret: JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
