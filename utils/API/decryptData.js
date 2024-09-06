// npm packages
import crypto from "crypto";

// lib directory
import { algorithm } from "@/lib/keys";

// utils directory
import { key, encryptionIV } from "@/utils/API/encryption_secrets";

/**
 * decrypt data once it has been encrypted
 * @param encryptedData
 * @returns {Promise<string>}
 */
export const decryptData = async (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(algorithm, key, encryptionIV);

  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  );
};
