import { z } from 'zod';

const ETH_SUGNATURE_REGEX = /^0x[a-fA-F0-9]{130}$/;

export const SignatureSchema = z.object({
    message: z.string().min(1, "Message is required and cannot be empty."), 
    signature: z.string().regex(ETH_SUGNATURE_REGEX,"Signature must be a valid 132-character hexadecimal string starting with '0x'."
 ),
});

export type SignatureRequest = z.infer<typeof SignatureSchema>;