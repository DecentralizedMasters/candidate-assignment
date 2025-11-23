import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import { historyService } from '../services/historyService'




const MessageSigner = () => {
    const { primaryWallet } = useDynamicContext()
    const [message, setMessage] = useState('')
    const [error, setError] = useState<string | null>(null)


    async function signMessage() {


        try {

            const signature = await primaryWallet?.signMessage(message)

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/verify-signature`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, signature }),
            })
            const data = await res.json()
            console.log('Verification response:', data)
            const resultWithTimestamp = {...data, timestamp: new Date().toLocaleString()}
            historyService.addToHistory(resultWithTimestamp)
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
