import express from 'express'
import router from './routes/verify-signature';
import { AppError } from './errors/AppError';
import { errorHandler } from './middleware/error-handling';
import { corsMiddleware } from './middleware/cors';
import { apiLimiter } from './middleware/rate-limit';

const PORT = process.env.PORT || 3000

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use(apiLimiter)



app.use('/', router);
app.use((req, _, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})  
