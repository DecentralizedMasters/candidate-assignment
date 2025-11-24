import { z } from 'zod';
import { CONFIG } from '../../config/config';

const ETH_SUGNATURE_REGEX = /^0x[a-fA-F0-9]{130}$/;

export const SignatureSchema = z.object({
    message: z.string().trim().min(1, CONFIG.VALIDATION.MESSAGES.MESSAGE_REQUIRED),
    signature: z.string().regex(ETH_SUGNATURE_REGEX, CONFIG.VALIDATION.MESSAGES.SIGNATURE_REQUIRED),
});

export type SignatureRequest = z.infer<typeof SignatureSchema>;