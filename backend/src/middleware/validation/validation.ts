import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { SignatureSchema } from './schemas';


export const validateSignatureRequest = (req: Request, res: Response, next: NextFunction) => {
    const result = SignatureSchema.safeParse(req.body);

    if (!result.success) {
        const zodError = result.error;
        const formattedErrors = zodError.issues
            .map(err => `Field '${err.path.join('.') || 'root'}': ${err.message}`)
            .join('; ');
        return next(new AppError(`Input validation failed: ${formattedErrors}`, 400));
    }

    next();
};