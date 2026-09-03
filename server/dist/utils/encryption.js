"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptToken = encryptToken;
exports.decryptToken = decryptToken;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
/**
 * Encrypts a string using AES-256-GCM.
 * Key must be 32 bytes (64 hex characters or 32 ascii).
 */
function encryptToken(text, secretKeyHex) {
    if (!text)
        return text;
    const keyStr = secretKeyHex || process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
    const key = Buffer.from(keyStr.slice(0, 64), 'hex');
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    // Combine iv + authTag + encrypted text
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}
/**
 * Decrypts an AES-256-GCM encrypted string.
 */
function decryptToken(cipherText, secretKeyHex) {
    if (!cipherText || !cipherText.includes(':'))
        return cipherText;
    const [ivHex, authTagHex, encryptedData] = cipherText.split(':');
    if (!ivHex || !authTagHex || !encryptedData)
        return cipherText;
    const keyStr = secretKeyHex || process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
    const key = Buffer.from(keyStr.slice(0, 64), 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
//# sourceMappingURL=encryption.js.map