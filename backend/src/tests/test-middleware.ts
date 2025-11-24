import test from 'node:test';
import assert from 'assert';
import { AppError } from '../errors/AppError';
import { errorHandler } from '../middleware/error-handling';
import { Request, Response } from 'express';

test('errorHandler - AppError handling', () => {
  const error = new AppError('Test error', 400);
  const mockRes = {
    status: (code: number) => {
      assert.strictEqual(code, 400);
      return mockRes;
    },
    json: (body: { error: string }) => {
      assert.deepStrictEqual(body, { error: 'Test error' });
    }
  } as Response;
  
  errorHandler(error, {} as Request, mockRes, () => {});
});

test('errorHandler - generic Error handling', () => {
  const error = new Error('Generic error');
  const mockRes = {
    status: (code: number) => {
      assert.strictEqual(code, 500);
      return mockRes;
    },
    json: (body: { error: string }) => {
      assert.deepStrictEqual(body, { error: 'Internal Server Error' });
    }
  } as Response;
  
  errorHandler(error, {} as Request, mockRes, () => {});
});
