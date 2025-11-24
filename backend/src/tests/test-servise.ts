import test from 'node:test';
import assert from 'assert';
import { signatureService } from '../services/SignatureVerifierServise';


test('SignatureService - valid signature', () => {
  const message = 'test message';
  const signature = '0x123';
  const result = signatureService.verifySignature(message, signature);
  
  assert.strictEqual(result.originalMessage, message);
  assert.strictEqual(typeof result.isValid, 'boolean');
  assert.strictEqual(typeof result.signer, 'string');
});

test('SignatureService - invalid signature returns false', () => {
  const result = signatureService.verifySignature('test', 'invalid');
  
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.signer, '');
  assert.strictEqual(result.originalMessage, 'test');
});