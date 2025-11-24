import test from 'node:test';
import assert from 'assert';
import { AppError } from '../errors/AppError';


test('AppError - default status code', () => {
  const error = new AppError('Test error');
  
  assert.strictEqual(error.message, 'Test error');
  assert.strictEqual(error.statusCode, 400);
  assert.ok(error instanceof Error);
});

test('AppError - custom status code', () => {
  const error = new AppError('Not found', 404);
  
  assert.strictEqual(error.message, 'Not found');
  assert.strictEqual(error.statusCode, 404);
});

test('AppError - server error', () => {
  const error = new AppError('Server error', 500);
  
  assert.strictEqual(error.statusCode, 500);
});