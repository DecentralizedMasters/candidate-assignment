import { ethers } from "ethers";

class SignatureVerifierService {
  verifySignature(message: string, signature: string): { isValid: boolean; signer: string; originalMessage: string } {
    let res = { isValid: false, signer: "", originalMessage: message };
    try {
      res.signer = ethers.verifyMessage(message, signature);
      res.isValid = true;
    } catch {}
    return res;
  }
}

export const signatureService = new SignatureVerifierService();