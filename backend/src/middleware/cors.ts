import cors from 'cors';
import { RequestHandler } from 'express';
import { CONFIG } from '../config/config';

export const corsMiddleware: RequestHandler = cors({
    origin:CONFIG.CORS.ORIGIN,
    credentials:CONFIG.CORS.CREDENTIALS
});