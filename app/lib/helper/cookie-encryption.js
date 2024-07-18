import { createCipheriv, randomBytes } from "crypto";

function encryptCookies(text, secretKey) {
  const iv = randomBytes(16);
  const chiper = createCipheriv("aes-256-gcm", secretKey, iv);
  const encrypted = Buffer.concat([chiper.update(text), chiper.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptCookies(encrypted, secretKey) {
  const [iv, encryptedText] = encrypted.split(":");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    secretKey,
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}

export { encryptCookies, decryptCookies };
