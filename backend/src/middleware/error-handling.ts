import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction) => {
    let statusCode = 500;
    let body: { error: string } = { error: "Internal Server Error" };
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        body = { error: err.message };
    }
    res.status(statusCode).json(body);

}