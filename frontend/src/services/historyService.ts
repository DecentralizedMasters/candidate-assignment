interface VerificationResult {
    isValid: boolean
    signer: string
    originalMessage: string
    timestamp?: string
}

const STORAGE_KEY = 'verificationHistory'

export const historyService = {
    getHistory(): VerificationResult[] {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    },

    addToHistory(result: VerificationResult): void {
        const history = this.getHistory()
        const newHistory = [result, ...history]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
    },

    clearHistory(): void {
        localStorage.removeItem(STORAGE_KEY)
    }
}