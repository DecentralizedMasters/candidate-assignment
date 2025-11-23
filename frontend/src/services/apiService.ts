interface VerificationRequest {
    message: string
    signature: string
}

interface VerificationResponse {
    isValid: boolean
    signer: string
    originalMessage: string
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const apiService = {
    async verifySignature(request: VerificationRequest): Promise<VerificationResponse> {
        const res = await fetch(`${BASE_URL}/verify-signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        return await res.json()
    }
}