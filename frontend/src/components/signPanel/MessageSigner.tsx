import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import { apiService } from '../../services/apiService'
import { historyService } from '../../services/historyService'

const MessageSigner = ({ onSuccess }: { onSuccess: () => void }) => {
    const { primaryWallet } = useDynamicContext()
    const [message, setMessage] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function signMessage() {
        if (isLoading) return

        setIsLoading(true)
        setError(null)

        try {
            const signature = await primaryWallet?.signMessage(message)
            
            if (signature) {
                const data = await apiService.verifySignature({ message, signature })
                const resultWithTimestamp = { ...data, timestamp: new Date().toLocaleString() }
                historyService.addToHistory(resultWithTimestamp)
                setMessage('')
                onSuccess()
            } else {
                setError('Failed to sign message')
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Signing failed'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const isButtonDisabled = !message.trim() || isLoading

    return (
        <>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                aria-label='message'
            />
            <button onClick={signMessage} disabled={isButtonDisabled}>
                {isLoading ? 'Signing...' : 'Sign & Verify'}
            </button>
            {error && <div className='error'>{error}</div>}
        </>
    )
}
export default MessageSigner
