import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { scrypt, randomFill, createCipheriv } from "crypto";

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
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async signIn({ user }) {
      console.log("user", user);

      const algorithm = "aes-192-cbc";
      const password = process.env.NEXTAUTH_SECRET;

      scrypt(password, "salt", 24, (err, key) => {
        if (err) throw err;

        randomFill(new Uint8Array(16), async (err, iv) => {
          if (err) throw err;

          const nameCipher = createCipheriv(algorithm, key, iv);
          let name = nameCipher.update(user.name, "utf8", "hex");
          name += nameCipher.final("hex");
          console.log("name", name);

          randomFill(new Uint8Array(16), async (err, ivEmail) => {
            if (err) throw err;

            const emailCipher = createCipheriv(algorithm, key, ivEmail);
            let email = emailCipher.update(user.email, "utf8", "hex");
            email += emailCipher.final("hex");

            console.log("email", email);

            await prisma.user.update({
              where: { email: user.email },
              data: {
                name,
                email,
                ivName: iv.toString(),
                ivEmail: ivEmail.toString(),
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
