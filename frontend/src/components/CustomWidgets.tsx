import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import MessageSigner from './MessageSigner'
import { historyService } from '../services/historyService'
import VerificationHistory from './VerificationHistory'


const CustomWidget = () => {
    const { primaryWallet, user, handleLogOut } = useDynamicContext()
    
    const [, forceUpdate] = useState({})
    const refreshHistory = () => forceUpdate({})

    return (
        <>
           <div className='wallet-header'> <h2> {user?.email || 'user'} connected</h2>
            <button onClick={() => { handleLogOut(); historyService.clearHistory(); }}>Log Out</button>
            </div>
            <div className='wallet-address'>Wallet Address: {primaryWallet?.address || "no wallet connected"}</div>
            <div className='wallet-signer'><MessageSigner onSuccess={refreshHistory} /></div>
            <VerificationHistory />
        </>
    )
}

export default CustomWidget
