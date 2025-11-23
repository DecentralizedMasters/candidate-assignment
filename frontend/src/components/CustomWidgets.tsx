import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import MessageSigner from './MessageSigner'
import VerificationHistory from './VerificationHistory'
import { historyService } from '../services/historyService'



const CustomWidget = () => {

    const { primaryWallet, user, handleLogOut } = useDynamicContext()

    return (
        <>
            <h2> {user?.email || 'user'} connected</h2>
            <p>Wallet Address: {primaryWallet?.address || "no wallet connected"}</p>
            <button onClick={() => { handleLogOut(); historyService.clearHistory(); }}>Log Out</button>
            <MessageSigner />
            <VerificationHistory />
        </>
    )
}

export default CustomWidget
