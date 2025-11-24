import winston from 'winston'

/**
 * Winston logger configuration
 * Logs to console with timestamp and level
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const msg = stack || message
      return `[${timestamp}] [${level.toUpperCase()}] ${msg}`
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
})

export { logger }
