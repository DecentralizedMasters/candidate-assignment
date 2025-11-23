interface VerificationResult {
    isValid: boolean
    signer: string
    originalMessage: string
    timestamp?: string
}



const VerificationHistory = () => {
    const saved = localStorage.getItem('verificationHistory')
    const history: VerificationResult[] = saved ? JSON.parse(saved) : []
    return (
        <div>
            <h3>Verification History:</h3>
            {history.map(({ isValid, signer, originalMessage, timestamp }, index) => (
                <div key={index}>
                    <p><strong>Verified at:</strong> {timestamp}</p>
                    <p><strong>Valid:</strong> {isValid ? 'Yes' : 'No'}</p>
                    <p><strong>Signer:</strong> {signer}</p>
                    <p><strong>Message:</strong> {originalMessage}</p>
                </div>
            ))}
        </div>
    )
}

export default VerificationHistory