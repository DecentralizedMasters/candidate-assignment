import { Router } from "express";
import { ethers } from "ethers";
import { AppError } from "../errors/AppError";

const router = Router();

router.post("/verify-signature", (req, res) => {    
let isValid = false, signer = "";
  const { message, signature } = req.body ?? {};
  if (!message || !signature) {
     throw new AppError("Missing message or signature", 400)
  }
  try {
    signer = ethers.verifyMessage(message, signature);
    isValid = !!signer;
  } catch (error) {

  }
    res.json({ isValid, signer ,originalMessage: message});

})

export default router;