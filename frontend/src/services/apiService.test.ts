import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './apiService';

const mockFetch = vi.fn();
global.fetch = mockFetch as any;

const createSuccessfulResponse = (body: any) => ({
    ok: true,
    json: () => Promise.resolve(body),
    status: 200,
});

const createErrorResponse = (status: number) => ({
    ok: false,
    json: () => Promise.resolve({ error: 'Server error' }),
    status: status,
});

describe('apiService', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    const mockRequest = {
        message: 'test message',
        signature: '0x123',
        address: '0xabc',
    };
    
    it('should call verify endpoint', async () => {
        mockFetch.mockResolvedValue(createSuccessfulResponse({ isValid: true }));

        const result = await apiService.verifySignature(mockRequest);

        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/verify-signature'),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockRequest),
            })
        );
        expect(result).toHaveProperty('isValid');
        expect(result.isValid).toBe(true);
    });

    it('should handle invalid signature', async () => {
        mockFetch.mockResolvedValue(createSuccessfulResponse({ isValid: false }));

        const response = await apiService.verifySignature(mockRequest);

        expect(response.isValid).toBe(false);
    });

    it('should throw error on bad response', async () => {
        mockFetch.mockResolvedValue(createErrorResponse(500));

        await expect(apiService.verifySignature(mockRequest)).rejects.toThrow();
        await expect(apiService.verifySignature(mockRequest)).rejects.toThrow('HTTP error! status: 500');
    });
});