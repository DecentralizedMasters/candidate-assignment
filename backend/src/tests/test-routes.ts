import test from 'node:test';
import assert from 'assert';
import express from 'express';
import { AddressInfo } from 'net';
import router from '../routes/verify-signature';
import { errorHandler } from '../middleware/error-handling';
import { CONFIG } from '../config/config'; 

const app = express();
app.use(express.json());

app.use('/', router);

app.use(errorHandler);


const server = app.listen(0);
const port = (server.address() as AddressInfo).port;

test.after(() => {
    server.close();
});


test('POST /verify-signature - missing message', async () => {
    const response = await fetch(`http://localhost:${port}/verify-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({message:"", signature: '0x123' })
    });
    
    assert.strictEqual(response.status, CONFIG.STATUS_CODES.BAD_REQUEST, 'Expected 400 status for missing body field');
    
    const body = await response.json();
    
     const validationFailedPrefix = `${CONFIG.VALIDATION.MESSAGES.VALIDATION_FAILED}: `;

    assert.ok(body.error.startsWith(validationFailedPrefix), 
        `Error message must start with v alidation failed prefix: ${validationFailedPrefix}`);

    const requiredMessage = CONFIG.VALIDATION.MESSAGES.MESSAGE_REQUIRED; 

    assert.ok(body.error.includes(requiredMessage), 
        `Validation error message should contain: ${requiredMessage}`);
});


test('POST /verify-signature - invalid signature (fails verification)', async () => {
    const response = await fetch(`http://localhost:${port}/verify-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'test message', signature: '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' })
    });
    

    assert.strictEqual(response.status, CONFIG.STATUS_CODES.OK, 'Expected 200 status for valid request body'); 
    
    const body = await response.json();
    assert.strictEqual(body.isValid, false, 'Signature should be invalid for a random hash');
  
});