import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { SignatureSchema } from './schemas';
import { CONFIG } from '../../config/config';
import { logger } from '../../utils/Logger';


export const validateSignatureRequest = (req: Request, res: Response, next: NextFunction) => {
    const result = SignatureSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues
            .map(err => `Field '${err.path.join('.') || 'root'}': ${err.message}`)
            .join('; ');
        return next(new AppError(`${CONFIG.VALIDATION.MESSAGES.VALIDATION_FAILED}: ${errors}`, CONFIG.STATUS_CODES.BAD_REQUEST));
    }
    logger.info(`Signature request validated successfully | URL: ${req.url}`);

    next();
};