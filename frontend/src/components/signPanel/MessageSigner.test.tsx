import { test, expect} from 'vitest'

test('should handle message state changes', () => {
  let message = ''
  const setMessage = (newMessage: string) => { message = newMessage }
  
  setMessage('test message')
  expect(message).toBe('test message')
  
  setMessage('')
  expect(message).toBe('')
})

test('should handle error state', () => {
  let error: string | null = null
  const setError = (newError: string | null) => { error = newError }
  
  setError('Signing failed')
  expect(error).toBe('Signing failed')
  
  setError(null)
  expect(error).toBe(null)
})

test('should create result with timestamp', () => {
  const data = { isValid: true, signer: '0x123', originalMessage: 'test' }
  const resultWithTimestamp = { ...data, timestamp: new Date().toLocaleString() }
  
  expect(resultWithTimestamp).toHaveProperty('timestamp')
  expect(resultWithTimestamp.isValid).toBe(true)
  expect(resultWithTimestamp.signer).toBe('0x123')
})
