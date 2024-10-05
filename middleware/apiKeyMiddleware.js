import dotenv from 'dotenv';

dotenv.config();

export const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_COMMON_SECRET) {
        return res.status(401).json({ message: 'API SECRET inválida' });
    }

    next();
};
