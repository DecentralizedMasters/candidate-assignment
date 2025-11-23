import { historyService } from "../services/historyService"


const VerificationHistory = () => {
    const history = historyService.getHistory()
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