import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { CONFIG } from "../config/config";
import { logger } from "../utils/Logger";

export const errorHandler = (err: Error | AppError,
    req: Request,
    res: Response,
    _next: NextFunction) => {
    let statusCode = CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR;
    let body: { error: string } = { error: CONFIG.ERRORS.INTERNAL_SERVER_ERROR };
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        body = { error: err.message };
        logger.warn(`[Handled Error] ${err.message} | URL: ${req.url}`);

    }
    return res.status(statusCode).json(body);
}