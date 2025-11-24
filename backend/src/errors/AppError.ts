import { CONFIG } from '../config/config';

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = CONFIG.STATUS_CODES.BAD_REQUEST) {
        super(message);
        this.statusCode = statusCode;
    }
}