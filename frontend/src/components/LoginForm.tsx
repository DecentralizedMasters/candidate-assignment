import { useConnectWithOtp } from '@dynamic-labs/sdk-react-core';
import React, { useRef, useState } from 'react';
import ErrorDisplay from './ErrorDisplay';
import { handleChangeOtp, handleKeyDown, handlePaste } from '../utils/otpUtils';



const LoginForm = () => {
    const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp();

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


    const handleSubmit = async (e: React.FormEvent, action: () => Promise<void>) => {
        e.preventDefault();
        try {
            await action();
        } catch (err) {
            setError((err as Error)?.message);
        }
    };

    const handleEmailSubmit = async () => {
        setError(null);
        await connectWithEmail(email);
        setOtpSent(true);
    };

    const handleBackClick = () => {
        setOtpSent(false);
        setOtp(Array(6).fill(''));
        setError(null);
    };

    const handleResendClick = () =>{
      setError(null);
      connectWithEmail(email);
    } 

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) {
            setError('Please enter all 6 digits.');
            return;
        }
        try {
            await verifyOneTimePassword(fullOtp);
        } catch (err) {
            setError((err as Error)?.message);
        }
    };

    return otpSent ? (
        <form onSubmit={handleOtpSubmit}>
            <div className="form-header">
                <button type="button" onClick={handleBackClick} aria-label="Go back">
                    ⟵
                </button>
                <h2>Enter OTP</h2>
            </div>

            <ErrorDisplay error={error} />

            <div className="otp-container" onPaste={(e) => handlePaste(e, setOtp, inputRefs)}>
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChangeOtp(i, e.target.value, otp, setOtp, inputRefs)}
                        onKeyDown={(e) => handleKeyDown(e, i, otp, inputRefs)}
                        className="otp-input"
                        aria-label={`OTP digit ${i + 1}`}
                    />
                ))}
            </div>

            <div className="button-group">
                <button type="submit">Verify OTP</button>
                <button type="button" onClick={handleResendClick}>
                    Resend
                </button>
            </div>
        </form>
    ) : (
        <form onSubmit={(e) => handleSubmit(e, handleEmailSubmit)}>
            <h2>Log in or sign up</h2>
            <ErrorDisplay error={error} />
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                name="email"
            />
            <button type="submit">Continue</button>
        </form>
    );
};

export default LoginForm;
