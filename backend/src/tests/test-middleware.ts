import test from 'node:test';
import assert from 'assert';
import { AppError } from '../errors/AppError';
import { errorHandler } from '../middleware/error-handling';
import { Request, Response } from 'express';
import { CONFIG } from '../config/config';

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
      assert.strictEqual(code, CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR);
      return mockRes;
    },
    json: (body: { error: string }) => {
      assert.deepStrictEqual(body, { error: CONFIG.ERRORS.INTERNAL_SERVER_ERROR });
    }
  } as Response;
  
  errorHandler(error, {} as Request, mockRes, () => {});
});
