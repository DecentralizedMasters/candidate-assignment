import React from 'react';

const parseOtpFromPaste = (pasted: string): string[] => {
  const digits = pasted.replace(/\D/g, '').slice(0, 6).split('');
  const newOtp = Array(6).fill('');
  digits.forEach((d, i) => (newOtp[i] = d));
  return newOtp;
};

export const handleChangeOtp = (
  index: number, 
  value: string, 
  otp: string[], 
  setOtp: (otp: string[]) => void,
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>
) => {
  if (!/^[0-9]?$/.test(value)) return;
  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);
  
  if (value && index < otp.length - 1) {
    inputRefs.current?.[index + 1]?.focus();
  }
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>, 
  index: number, 
  otp: string[],
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>
) => {
  if (e.key === 'Backspace' && !otp[index] && index > 0) {
    inputRefs.current?.[index - 1]?.focus();
  }
};

export const handlePaste = (
  e: React.ClipboardEvent,
  setOtp: (otp: string[]) => void,
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>
) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData('text');
  const newOtp = parseOtpFromPaste(pasted);
  setOtp(newOtp);
  
  const nextIndex = newOtp.findIndex((d) => d === '');
  const focusIndex = nextIndex !== -1 ? nextIndex : 5;
  inputRefs.current?.[focusIndex]?.focus();
};
