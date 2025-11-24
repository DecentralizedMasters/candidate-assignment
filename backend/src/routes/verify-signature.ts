import { Router } from "express";
import { ethers } from "ethers";
import { AppError } from "../errors/AppError";
import { signatureService } from "../services/SignatureVerifierServise";

const router = Router();

router.post("/verify-signature", (req, res) => {    

  const { message, signature } = req.body ?? {};
  if (!message || !signature) {
     throw new AppError("Missing message or signature", 400)
  }
  const result = signatureService.verifySignature(message, signature)
  res.json(result)

})

export default router;