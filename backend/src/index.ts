import { ethers } from 'ethers';
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000


app.post("/verify-signature", (req, res) => {
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})  
