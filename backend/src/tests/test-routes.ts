import test from 'node:test';
import assert from 'assert';
import express from 'express';
import { AddressInfo } from 'net';
import router from '../routes/verify-signature';
import { errorHandler } from '../middleware/error-handling';

const app = express();
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const server = app.listen(0);
const port = (server.address() as AddressInfo).port;

test('POST /verify-signature - missing message', async () => {
  const response = await fetch(`http://localhost:${port}/verify-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ signature: '0x123' })
  });
  
  assert.strictEqual(response.status, 400);
  const body = await response.json();
  assert.strictEqual(body.error, 'Missing message or signature');
});

test('POST /verify-signature - invalid signature', async () => {
  const response = await fetch(`http://localhost:${port}/verify-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'test', signature: '0xinvalid' })
  });
  
  assert.strictEqual(response.status, 200);
  const body = await response.json();
  assert.strictEqual(body.isValid, false);
  
  server.close();
});
