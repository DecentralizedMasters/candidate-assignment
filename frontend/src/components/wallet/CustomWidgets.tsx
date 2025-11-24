import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useCallback, useState, } from 'react'
import MessageSigner from '../signPanel/MessageSigner'
import VerificationHistory from '../signPanel/VerificationHistory'
import { historyService } from '../../services/historyService'

const CustomWidget = () => {
    const { primaryWallet, user, handleLogOut } = useDynamicContext()
    const [historyVersion, setHistoryVersion] = useState(0);
    
    const refreshHistory = useCallback(() => {
        setHistoryVersion((v) => v + 1)
    }, []);

    const handleLogoutAndClear = useCallback(() => {
        handleLogOut()
        historyService.clearHistory()
    }, [handleLogOut])


    return (
        <>
            <div className='wallet-header'> <h2> {user?.email || 'user'} connected</h2>
                <button onClick={handleLogoutAndClear}>Log Out</button>
            </div>
            <div className='wallet-address'>Wallet Address: {primaryWallet?.address || "no wallet connected"}</div>
            <div className='wallet-signer'><MessageSigner onSuccess={refreshHistory} /></div>
            <VerificationHistory key={historyVersion} />
        </>
    )
}

export default CustomWidget
