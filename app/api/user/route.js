import { NextResponse } from "next/server";
import { createCipheriv, createDecipheriv, randomFill, scrypt } from "crypto";

const algorithm = "aes-192-cbc";
const password = "123456";

const encryptData = async (data) => {
  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      if (err) reject(err);

      randomFill(new Uint8Array(16), async (err, iv) => {
        if (err) throw err;

        const cipher = createCipheriv(algorithm, key, iv);
        let encrypt = cipher.update(data, "utf8", "hex");
        encrypt = cipher.final("hex");

        const ivHex = iv.toString("hex");

        resolve({ encrypted: encrypt, key: ivHex });
      });
    });
  });
};

const decryptData = async (encryptedData, hexKey) => {
  const split = hexKey.split(",");
  const arr = split.map((num) =>
    parseInt(num, 10).toString(16).padStart(2, "0"),
  );
  const Hex = arr.join("");

  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      if (err) reject(err);

      const iv = Buffer.from(Hex, "hex");
      const decipher = createDecipheriv("aes-192-cbc", key, iv);
      let decrypted = decipher.update(encryptedData, "hex", "utf8");
      decrypted += decipher.final("utf8");

      resolve(decrypted);
    });
  });
};

export const GET = async () => {
  const e = await encryptData("Douglas");
  console.log("e", e);

  const d = await decryptData(e.encrypted, e.key);
  console.log("d", d);

  return NextResponse.json({
    message: "You have received the data successfully",
  });
};

// import prisma from "@/lib/prisma";
// import { skip, take } from "@/utils/API";
// import { NextResponse } from "next/server";
//
// export const GET = async (requests) => {
//   const { searchParams } = new URL(requests.url);
//
//   const length = await prisma.user.count();
//   const data = await prisma.user.findMany({
//     skip: skip(searchParams),
//     take: take(searchParams),
//   });
//
//   return NextResponse.json({
//     message: "You have successfully fetched data from database",
//     data,
//     length,
//   });
// };
