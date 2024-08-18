import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_APP_GOOGLE_SECRET_KEY,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user: ", user);
      console.log("Account: ", account);
      console.log("Profile: ", profile);
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  // secret: process.env.NEXT_APP_SECRET_KEY,
});

export { handler as GET, handler as POST };
