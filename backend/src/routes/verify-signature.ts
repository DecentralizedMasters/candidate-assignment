import { Router } from "express"
import { signatureService } from "../services/SignatureVerifierService"
import { validateSignatureRequest } from "../middleware/validation/validation"

const router = Router()

/**
 * POST /verify-signature
 * 
 * Verifies an Ethereum message signature
 * 
 * Request body:
 * {
 *   "message": "string",
 *   "signature": "0x..." (130 hex chars)
 * }
 * 
 * Response:
 * {
 *   "isValid": boolean,
 *   "signer": "0x...",
 *   "originalMessage": "string"
 * }
 */
router.post("/verify-signature", validateSignatureRequest, (req, res) => {
  const { message, signature } = req.body
  const result = signatureService.verifySignature(message, signature)
  res.json(result)
})

export default router