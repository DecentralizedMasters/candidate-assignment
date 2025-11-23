import { ethers } from 'ethers';
import express from 'express'
import cors from 'cors';



const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())


type HistoryEntry = {
  originalMessage: string, signer: string, timestamp: number, isValid: boolean
}

const history: Array<HistoryEntry> = [];
app.get('/history', (_, res) => {
  res.json(history)
})


app.post("/verify-signature", (req, res) => {
  let isValid = false, signer = "";
  const { message, signature } = req.body ?? {};
  if (!message || !signature) {
    return res.status(400).json({ error: "Missing message or signature" });
  }
  try {
    signer = ethers.verifyMessage(message, signature);
    isValid = !!signer;
  } catch (error) {

  }
  const entry: HistoryEntry = {
    originalMessage: message,
    signer,
    timestamp: Date.now(),
    isValid
  }
  history.push(entry)
  res.json({ isValid, signer, originalMessage: message });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})  
