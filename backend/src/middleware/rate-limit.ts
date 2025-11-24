import { rateLimit } from 'express-rate-limit';
import { AppError } from '../errors/AppError';


export const apiLimiter = rateLimit({
    windowMs:  1 * 60 * 1000,
    max: 3,
    handler: (_req, _res, next) => {
       
       next(new AppError('Too many requests, please try again later.', 429));
    }
});