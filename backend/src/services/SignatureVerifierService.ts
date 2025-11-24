import { ethers } from "ethers"
import { logger } from "../utils/Logger"

/**
 * Result of signature verification
 */
interface VerificationResult {
  isValid: boolean
  signer: string
  originalMessage: string
}

/**
 * Service for verifying Ethereum message signatures
 * Uses ethers.js to recover the signer address from a message and signature
 */
class SignatureVerifierService {
  /**
   * Verifies an Ethereum message signature
   * @param message - The original message that was signed
   * @param signature - The signature (0x + 130 hex characters)
   * @returns VerificationResult with validity status and recovered signer address
   */
  verifySignature(message: string, signature: string): VerificationResult {
    const result: VerificationResult = { isValid: false, signer: "", originalMessage: message }
    
    try {
      // Recover the signer address from the message and signature
      result.signer = ethers.verifyMessage(message, signature)
      result.isValid = true
      logger.info(`Signature verified successfully for signer: ${result.signer}`)
    } catch (error) {
      // Log verification failure but don't throw - return invalid result
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.warn(`Signature verification failed: ${errorMessage}`)
    }
    
    return result
  }
}

export const signatureService = new SignatureVerifierService()