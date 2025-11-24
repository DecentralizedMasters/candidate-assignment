import { Router } from "express";
import { ethers } from "ethers";

const router = Router();

router.post("/verify-signature", (req, res) => {    
let isValid = false, signer = "";
  const { message, signature } = req.body ?? {};
  if (!message || !signature) {
     res.status(400).json({ error: "Missing message or signature" });
  }
  try {
    signer = ethers.verifyMessage(message, signature);
    isValid = !!signer;
  } catch (error) {

  }
    res.json({ isValid, signer ,originalMessage: message});

})

export default router;