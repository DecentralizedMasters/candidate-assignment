const getIntEnv = (key: string, defaultValue: number): number => {
    const value = process.env[key];
    let resultValue = defaultValue;

    if (value) {
        const parsed = parseInt(value, 10);
        
        if (!isNaN(parsed) && isFinite(parsed)) {
            resultValue = parsed;
        } else {
            console.warn(`Configuration warning: Environment variable ${key} is set, but its value '${value}' is not a valid integer. Using default value: ${defaultValue}.`);
        }
    }
    
    return resultValue;
};

export const CONFIG = {
    SERVER: {
        PORT: getIntEnv('PORT', 3000), 
        NODE_ENV: process.env.NODE_ENV || 'development',
    },
    CORS: {
        ORIGIN: process.env.CORS_ORIGIN || '*', 
        CREDENTIALS: false,
    },
    RATE_LIMIT: {
        WINDOW_MS: getIntEnv('RATE_LIMIT_WINDOW_MS', 60 * 1000),
        MAX: getIntEnv('RATE_LIMIT_MAX', 5),
        MESSAGE: 'Too many requests, please try again later!',
    },
    VALIDATION: {
        MESSAGES: {
            MESSAGE_REQUIRED: "Message is required and cannot be empty.",
            SIGNATURE_REQUIRED: "Signature must be a valid 132-character hexadecimal string starting with '0x'.",
            VALIDATION_FAILED: "Validation failed:",
        }
    },
    ERRORS: {
        INTERNAL_SERVER_ERROR: "Internal Server Error! Please contact support.",
        ROUTE_NOT_FOUND: "Route not found!",
    },
    ROUTES: {
        VERIFY_SIGNATURE: "/verify-signature",
    },
    STATUS_CODES: {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        TOO_MANY_REQUESTS: 429,
        INTERNAL_SERVER_ERROR: 500,
    }
};