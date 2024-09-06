// npm packages
import crypto from "crypto";

// lib directory
import { secret_iv, secret_key } from "@/lib/keys";

/**
 * Key used to encrypt data
 * @type {string}
 */
export const key = crypto
  .createHash("sha256")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);

/**
 * IV (initialization vector) used from encrypting data
 * @type {string}
 */
export const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);
