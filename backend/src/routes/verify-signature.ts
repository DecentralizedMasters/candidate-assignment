import { Router } from "express";
import { signatureService } from "../services/SignatureVerifierServise";
import { validateSignatureRequest } from "../middleware/validation/validation";

const router = Router();

router.post("/verify-signature", validateSignatureRequest,(req, res) => {    

  const { message, signature } = req.body;
  const result = signatureService.verifySignature(message, signature)
  res.json(result)

})

export default router;