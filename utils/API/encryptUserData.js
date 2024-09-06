// import { createCipheriv, randomFill, scrypt } from "crypto";
// import prisma from "@/lib/prisma";
//
// const encryptData = async (user) => {
//   const algorithm = "aes-192-cbc";
//   const password = process.env.NEXTAUTH_SECRET;
//
//   scrypt(password, "salt", 24, (err, key) => {
//     if (err) throw err;
//
//     randomFill(new Uint8Array(16), async (err, iv) => {
//       if (err) throw err;
//
//       const nameCipher = createCipheriv(algorithm, key, iv);
//       let name = nameCipher.update(user.name, "utf8", "hex");
//       name += nameCipher.final("hex");
//
//       const ivHex = iv.toString("hex");
//
//       randomFill(new Uint8Array(16), async (err, ivEmail) => {
//         if (err) throw err;
//
//         const emailCipher = createCipheriv(algorithm, key, ivEmail);
//         let email = emailCipher.update(user.email, "utf8", "hex");
//         email += emailCipher.final("hex");
//
//         const ivEmailHex = ivEmail.toString("hex");
//
//         await prisma.user.update({
//           where: { email: user.email },
//           data: {
//             name,
//             email,
//             ivName: ivHex,
//             ivEmail: ivEmailHex,
//           },
//         });
//       });
//     });
//   });
//
//   return true;
// };
//
// export const encryptUserData = async (userData) => await encryptData(userData);
