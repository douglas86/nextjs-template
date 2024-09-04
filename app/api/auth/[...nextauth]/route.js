// node packages
import { createCipheriv, randomFill, scrypt } from "crypto";

// next auth packages
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib directory
import prisma from "@/lib/prisma";
import { decryptUserData } from "@/utils/API";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
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
      return await decryptUserData(user);
    },
    async signIn({ user }) {
      const algorithm = "aes-192-cbc";
      const password = process.env.NEXTAUTH_SECRET;

      scrypt(password, "salt", 24, (err, key) => {
        if (err) throw err;

        randomFill(new Uint8Array(16), async (err, iv) => {
          if (err) throw err;

          // encrypts users name for storing to database
          const nameCipher = createCipheriv(algorithm, key, iv);
          let name = nameCipher.update(user.name, "utf8", "hex");
          name += nameCipher.final("hex");

          const ivHex = iv.toString("hex");

          randomFill(new Uint8Array(16), async (err, ivEmail) => {
            if (err) throw err;

            // encrypts email address for storing to database
            const emailCipher = createCipheriv(algorithm, key, ivEmail);
            let email = emailCipher.update(user.email, "utf8", "hex");
            email += emailCipher.final("hex");

            const ivEmailHex = ivEmail.toString("hex");

            // updates encrypted name and email address with Its iv for a database
            await prisma.user.update({
              where: { email: user.email },
              data: {
                name,
                email,
                ivName: ivHex,
                ivEmail: ivEmailHex,
              },
            });
          });
        });
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_APP_GOOGLE_SECRET_KEY,
    }),
  ],
});

export { handler as GET, handler as POST };
