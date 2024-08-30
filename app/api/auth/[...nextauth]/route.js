// node packages
import { scrypt, randomFill, createCipheriv, createDecipheriv } from "crypto";

// next auth packages
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib directory
import prisma from "@/lib/prisma";

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
      const decryptData = async (encryptedData, ivHex, password) => {
        return new Promise((resolve, reject) => {
          scrypt(password, "salt", 24, (err, key) => {
            if (err) reject(err);

            const iv = Buffer.from(ivHex, "hex");
            const decipher = createDecipheriv("aes-192-cbc", key, iv);
            let decrypted = decipher.update(encryptedData, "hex", "utf8");
            decrypted += decipher.final("utf8");

            resolve(decrypted);
          });
        });
      };

      const getOriginalUserData = async (userEmail) => {
        const user = await prisma.user.findUnique({
          where: { email: userEmail },
        });

        if (!user || !user.ivName || !user.ivEmail) {
          throw new Error("User or IV not found.");
        }

        const ivNameArray = user.ivName.split(",");
        const nameHexArray = ivNameArray.map((num) =>
          parseInt(num, 10).toString(16).padStart(2, "0"),
        );
        const ivNameHex = nameHexArray.join("");

        const ivEmailArray = user.ivEmail.split(",");
        const emailHexArray = ivEmailArray.map((num) =>
          parseInt(num, 10).toString(16).padStart(2, "0"),
        );
        const ivEmailHex = emailHexArray.join("");

        const originalName = await decryptData(
          user.name,
          ivNameHex,
          process.env.NEXTAUTH_SECRET,
        );
        const originalEmail = await decryptData(
          user.email,
          ivEmailHex,
          process.env.NEXTAUTH_SECRET,
        );

        return { name: originalName, email: originalEmail };
      };

      const { name, email } = await getOriginalUserData(user.email)
        .then((res) => res)
        .catch((err) => console.log("Decryption failed: ", err.message));

      return { user: { id: user.id, image: user.image, name, email } };
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
