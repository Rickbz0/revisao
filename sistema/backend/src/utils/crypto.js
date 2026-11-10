// Algoritimo: AES-256-CBC
// Chave: 32 bytes (256 bits)
// IV: 16 bytes (128 bits)

import crypto from 'crypto';
import { deflate } from 'zlib';

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.CRYPTO_SECRET || '12345678901234567890123456789012');
const inicialIV = Buffer.from(process.env.CRYPTO_IV || '1234567890123456');

function encrypt(text) {
    if (!text) return text;
    try {
        const cipher = crypto.createCipheriv(algorithm, secretKey, inicialIV);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Erro ao criptografar', error.message);
        return encryptedText;
    }
}

function decrypt(encryptedText) {
    if (!encryptedText) return encryptedText;
    try {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, inicialIV);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Erro ao descriptografar', error.message);
        return encryptedText;
    }
}

export default {
    encrypt,
    decrypt
};
