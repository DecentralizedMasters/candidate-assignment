import express from 'express'
import router from './routes/verify-signature';
import { AppError } from './errors/AppError';
import { errorHandler } from './middleware/error-handling';
import { corsMiddleware } from './middleware/cors';
import { apiLimiter } from './middleware/rate-limit';
import { logger } from './utils/Logger';
import { CONFIG } from './config/config';

const PORT = CONFIG.SERVER.PORT

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use(apiLimiter)

app.use('/', router);
app.use((_, __, next) => {
  next(new AppError(`Route not found`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
