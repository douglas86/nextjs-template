// node packages
import crypto from "crypto";

// next auth packages
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib directory
import prisma from "@/lib/prisma";
// import { decryptUserData, encryptUserData } from "@/utils/API";

const secret_key = process.env.NEXTAUTH_SECRET_KEY;
const secret_iv = process.env.NEXTAUTH_SECRET_IV;
const algorithm = process.env.NEXTAUTH_ALGORITHM;

const key = crypto
  .createHash("sha256")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

const encryptData = async (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex"),
  ).toString("base64");
};

const decryptData = async (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(algorithm, key, encryptionIV);

  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  );
};

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET_KEY,
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
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_APP_GOOGLE_SECRET_KEY,
    }),
  ],
});

export { handler as GET, handler as POST };
