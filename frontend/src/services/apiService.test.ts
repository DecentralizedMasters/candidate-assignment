import { test, expect, vi } from 'vitest'
import { apiService } from './apiService'

test('should call verify endpoint', async () => {
    const result = await apiService.verifySignature({ message: 'test', signature: '0x123' })
    expect(result).toHaveProperty('isValid')
})

test('should handle invalid signature', async () => {
    const result = await apiService.verifySignature({ message: 'test', signature: '0x123' })
    expect(result.isValid).toBe(false)
})


test('should throw error on bad response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    global.fetch = mockFetch as typeof fetch

    await expect(apiService.verifySignature({ message: 'test', signature: '0x123' })).rejects.toThrow('HTTP error! status: 500')
})
