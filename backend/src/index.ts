import express from 'express'
import cors from 'cors'
import router from './routes/verify-signature';

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})  
