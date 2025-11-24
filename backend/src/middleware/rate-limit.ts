import { rateLimit } from 'express-rate-limit';
import { AppError } from '../errors/AppError';
import { CONFIG } from '../config/config';

export const apiLimiter = rateLimit({
    windowMs: CONFIG.RATE_LIMIT.WINDOW_MS,
    max: CONFIG.RATE_LIMIT.MAX,
    handler: (_req, _res, next) => {
        next(new AppError(CONFIG.RATE_LIMIT.MESSAGE, CONFIG.STATUS_CODES.TOO_MANY_REQUESTS));
    }
});