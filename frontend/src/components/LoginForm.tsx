import { useConnectWithOtp } from '@dynamic-labs/sdk-react-core';
import React, { useState } from 'react'

const LoginForm = () => {
    const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp()

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await connectWithEmail(email);
            setOtpSent(true);
        } catch (err) {
            setError((err as Error)?.message);
        }

    }
    const verifyPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyOneTimePassword(otp);
        } catch (err) {
            setError((err as Error)?.message);
        }
    }


    return (
        otpSent ? (
            <form onSubmit={verifyPassword}>
                <div className='form-header'>
                    <button type="button" onClick={() => { setOtpSent(false); setOtp(''); }}>⟵ </button>
                    <h2>Enter OTP</h2>
                </div>
                {error && <div className='error'>{error}</div>}
                <input type="number" placeholder="Enter OTP" value={otp}
                    onChange={(e) => setOtp(e.target.value)} />
                <div className='button-group'>
                    <button type="submit">Verify OTP</button>
                    <button type="button" onClick={() => { connectWithEmail(email); }}>Resend</button>
                </div>
            </form>
        ) : (
            <form onSubmit={handleEmailSubmit}>
                <h2>Log in or sign up</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="email"
                    placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Continue</button>
            </form>
        )
    )
}

export default LoginForm
