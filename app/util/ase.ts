import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function aesEncrypt(data: string, key: string): string {
  const iv = randomBytes(32);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function aesDecrypt(encrypted: string, key: string): string {
  const iv = randomBytes(32);
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
