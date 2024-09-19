// npm packages
import crypto from "crypto";

// lib directory
import { NEXTAUTH_ALGORITHM } from "@/lib/keys";

// utils directory
import { key, encryptionIV } from "@/utils/API/encryption_secrets";

/**
 * encrypt data based on a key and IV while using a specific algorithm
 * @param data
 * @returns {Promise<string>}
 */
export const encryptData = async (data) => {
  const cipher = crypto.createCipheriv(NEXTAUTH_ALGORITHM, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex"),
  ).toString("base64");
};
