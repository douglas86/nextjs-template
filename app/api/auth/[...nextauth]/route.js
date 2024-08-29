import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { scrypt, randomFill, createCipheriv, createDecipheriv } from "crypto";

const encryptData = async (data, password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      if (err) reject(err);

      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) reject(err);

        const cipher = createCipheriv("aes-192-cbc", key, iv);
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        resolve({ encryptedData: encrypted, iv: iv.toString("hex") });
      });
    });
  });
};

const decryptData = async (encryptedData, ivHex, password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      console.log("error1", err);
      if (err) reject(err);

      const iv = Buffer.from(ivHex, "hex");
      const decipher = createDecipheriv("aes-192-cbc", key, iv);
      let decrypted = decipher.update(encryptedData, "hex", "utf8");
      decrypted += decipher.final("utf8");
      console.log("decrypted", decrypted);
      resolve(decrypted);
    });
  });
};

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

          const cipher = createCipheriv(algorithm, key, iv);

          let encrypted = cipher.update(user.name, "utf8", "hex");
          encrypted += cipher.final("hex");
          console.log("encrypted1", encrypted);

          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: encrypted,
            },
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
