// import { createDecipheriv, scrypt } from "crypto";
// import prisma from "@/lib/prisma";
//
// const decryptData = async (encryptedData, ivHex, password) => {
//   return new Promise((resolve, reject) => {
//     scrypt(password, "salt", 24, (err, key) => {
//       if (err) reject(err);
//
//       const iv = Buffer.from(ivHex, "hex");
//       const decipher = createDecipheriv("aes-192-cbc", key, iv);
//       let decrypted = decipher.update(encryptedData, "hex", "utf8");
//       decrypted += decipher.final("utf8");
//
//       resolve(decrypted);
//     });
//   });
// };
//
// const getOriginalData = async (email) => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });
//
//   if (!user || !user.ivName || !user.ivEmail) {
//     throw new Error("User or IV not found.");
//   }
//
//   const ivNameArray = user.ivName.split(",");
//   const nameHexArray = ivNameArray.map((num) =>
//     parseInt(num, 10).toString(16).padStart(2, "0"),
//   );
//
//   const ivNameHex = nameHexArray.join("");
//
//   const ivEmailArray = user.ivEmail.split(",");
//   const emailHexArray = ivEmailArray.map((num) =>
//     parseInt(num, 10).toString(16).padStart(2, "0"),
//   );
//   const ivEmailHex = emailHexArray.join("");
//
//   const originalName = await decryptData(
//     user.name,
//     ivNameHex,
//     process.env.NEXTAUTH_SECRET,
//   );
//
//   const originalEmail = await decryptData(
//     user.email,
//     ivEmailHex,
//     process.env.NEXTAUTH_SECRET,
//   );
//
//   return { name: originalName, email: originalEmail };
// };
//
// export const decryptUserData = async (userData) => {
//   const { name, email } = await getOriginalData(userData.email)
//     .then((res) => res)
//     .catch((err) => err.message);
//
//   return { user: { id: userData.id, image: userData.image, name, email } };
// };
