import { Buffer } from 'node:buffer';
import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

let previousXKey = null;

export const apiKeyMiddleware = (req, res, next) => {
    let xKey = req.headers['x-api-key'];
    console.log('xKey:', xKey);
    console.log('previousXKey:', previousXKey);

    if (!xKey) {
        return res.status(403).send('No API key provided');
    }

    if (xKey === previousXKey) {
        return res.status(403).send('API key reuse detected');
    }

    try {
        const decrypted = decryptData(xKey);

        if (decrypted !== process.env.PASSPHRASE) {
            return res.status(403).send('Invalid API KEY');
        }

        previousXKey = xKey;
        xKey = null;
        next();

    } catch (error) {
        return res.status(500).send('Error decrypting API key');
    }
};

const decryptData = (encryptedData) => {
    const dataBuffer = Buffer.from(encryptedData, 'base64');
    const iv = dataBuffer.slice(0, 16);
    const encryptedText = dataBuffer.slice(16);
    const derivedKey = crypto.createHash('sha256').update(process.env.API_ENCRYPTION_KEY).digest().slice(0, 32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
    let decrypted = decipher.update(encryptedText, null, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
