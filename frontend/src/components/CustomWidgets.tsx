import { useDynamicContext } from '@dynamic-labs/sdk-react-core'


const CustomWidget = () => {
    const{primaryWallet,user,handleLogOut}=useDynamicContext()
    return (
        <>
                <h2> {user?.email || 'user'} connected</h2>
                <p>Wallet Address: {primaryWallet?.address || "no wallet connected"}</p>
                <button onClick={handleLogOut}>Log Out</button>
            
    </>
  )
}

export default CustomWidget
