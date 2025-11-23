import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import { apiService } from '../services/apiService'
import { historyService } from '../services/historyService'



const MessageSigner = ({ onSuccess }: { onSuccess: () => void }) => {
    const { primaryWallet } = useDynamicContext()
    const [message, setMessage] = useState('')
    const [error, setError] = useState<string | null>(null)



    async function signMessage() {


        try {
            const signature = await primaryWallet?.signMessage(message)
            if (!signature) return
            
            const data = await apiService.verifySignature({ message, signature })
            console.log('Verification response:', data)
            const resultWithTimestamp = {...data, timestamp: new Date().toLocaleString()}
            historyService.addToHistory(resultWithTimestamp)
            onSuccess()
        } catch (err) {
            setError((err as Error)?.message || 'Signing failed')
        }
    }

    return (
        <>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={signMessage}>Sign & Verify</button>
            {error && <p>{error}</p>}

        </>
    )
}
export default MessageSigner
