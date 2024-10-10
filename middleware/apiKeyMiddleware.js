import { Buffer } from 'node:buffer';
import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const apiKeyMiddleware = (req, res, next) => {
    const xKey = req.headers['x-api-key'];

    if (!xKey) {
        return res.status(403).send('No API key provided');
    }

    try {
        const decrypted = decryptData(xKey);

        if (decrypted !== process.env.PASSPHRASE){
            return res.status(403).send('Invalid API KEY');
        }

        next();

    } catch (error) {
        return res.status(500).send('Error decrypting API key');
    }
};

const decryptData = (encryptedData) => {
    // Decodificar los datos base64
    const dataBuffer = Buffer.from(encryptedData, 'base64');

    // Extraer el IV (los primeros 16 bytes)
    const iv = dataBuffer.slice(0, 16);

    // Extraer los datos cifrados (lo que queda)
    const encryptedText = dataBuffer.slice(16);

    // Asegurarse de que la clave tiene 32 bytes
    const derivedKey = crypto.createHash('sha256').update(process.env.API_ENCRYPTION_KEY).digest().slice(0, 32);

    // Descifrar los datos
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
    let decrypted = decipher.update(encryptedText, null, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};
