import { NextFunction, Request, Response} from 'express';
import { AppError } from '../errors/AppError';
import { z } from 'zod';

const SignatureSchema = z.object({
    message: z.string().min(1, "Message is required and cannot be empty."),
    signature: z.string().min(1, "Signature is required and cannot be empty."),
});

export const validateSignatureRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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