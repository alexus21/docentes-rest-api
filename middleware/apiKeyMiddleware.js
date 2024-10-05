import dotenv from 'dotenv';
import logger from "../utils/Logger.js";


dotenv.config();

export const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_COMMON_SECRET) {
        logger.error(`Intento fallido de acceso: ${req.ip} - Clave API no válida`);
        return res.redirect('/');
    }

    next();
};
