// npm packages
import crypto from "crypto";

// lib directory
import { NEXTAUTH_SECRET_IV, DATA_ENCRYPTION_SECRET } from "@/lib/keys";

/**
 * Key used to encrypt data
 * @type {string}
 */
export const key = crypto
  .createHash("sha256")
  .update(DATA_ENCRYPTION_SECRET)
  .digest("hex")
  .substring(0, 32);

/**
 * IV (initialization vector) used from encrypting data
 * @type {string}
 */
export const encryptionIV = crypto
  .createHash("sha512")
  .update(NEXTAUTH_SECRET_IV)
  .digest("hex")
  .substring(0, 16);
