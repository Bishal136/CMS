import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

/**
 * Encrypts a string using AES-256-GCM.
 * Key must be 32 bytes (64 hex characters or 32 ascii).
 */
export function encryptToken(text: string, secretKeyHex?: string): string {
  if (!text) return text;
  const keyStr = secretKeyHex || process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  const key = Buffer.from(keyStr.slice(0, 64), 'hex');

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  // Combine iv + authTag + encrypted text
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 */
export function decryptToken(cipherText: string, secretKeyHex?: string): string {
  if (!cipherText || !cipherText.includes(':')) return cipherText;

  const [ivHex, authTagHex, encryptedData] = cipherText.split(':');
  if (!ivHex || !authTagHex || !encryptedData) return cipherText;

  const keyStr = secretKeyHex || process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  const key = Buffer.from(keyStr.slice(0, 64), 'hex');

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
