import { test, expect, beforeEach ,vi} from 'vitest'
import { historyService } from '../services/historyService'

const storage = new Map()
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => storage.get(key) || null),
  setItem: vi.fn((key, value) => storage.set(key, value)),
  removeItem: vi.fn((key) => storage.delete(key)),
  clear: vi.fn(() => storage.clear()),
})


beforeEach(() => {
  localStorage.clear()
 
})
 const result = { isValid: true, signer: '0x123', originalMessage: 'test' }
test('should save and retrieve history', () => {
  
  
  historyService.addToHistory(result)
  const history = historyService.getHistory()
  
  expect(history).toHaveLength(1)
  expect(history[0]).toEqual(result)
})

test('should clear history', () => {
  historyService.addToHistory(result)
  historyService.clearHistory()
  const history = historyService.getHistory()

  expect(history).toHaveLength(0)
})


