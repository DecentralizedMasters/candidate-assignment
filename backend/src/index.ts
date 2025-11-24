import express from 'express'
import cors from 'cors'
import router from './routes/verify-signature';
import { AppError } from './errors/AppError';
import { errorHandler } from './middleware/error-handling';

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000


app.use('/', router);
app.use((req, _, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})  
