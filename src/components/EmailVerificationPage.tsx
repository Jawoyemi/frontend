import React, { useState } from 'react';
import { ArrowLeft, MailCheck, RefreshCcw, Shield } from 'lucide-react';

interface EmailVerificationPageProps {
  email: string;
  error: string;
  loading: boolean;
  onBack: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
}

export default function EmailVerificationPage({
  email,
  error,
  loading,
  onBack,
  onVerify,
  onResend,
}: EmailVerificationPageProps) {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-sm p-8">
        <button onClick={onBack} className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-8 flex items-center gap-1 hover:text-text-primary">
          <ArrowLeft className="w-3 h-3" /> Back to registration
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
            <MailCheck className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <h1 className="text-lg font-extrabold text-text-primary">Verify Your Email</h1>
          </div>
          <p className="text-xs text-text-secondary leading-6 max-w-xs mx-auto">
            Enter the 6-digit verification code sent to <span className="font-bold text-text-primary">{email}</span>.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ''))}
            placeholder="000000"
            className="w-full text-center text-2xl tracking-[0.45em] font-bold px-4 py-3 rounded-xl border border-border bg-bg-main focus:border-primary outline-none"
          />

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            onClick={() => onVerify(code)}
            disabled={loading || code.length < 4}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-3 rounded-xl transition-colors disabled:opacity-70"
          >
            {loading ? 'Verifying...' : 'Verify & Open Dashboard'}
          </button>

          <button
            onClick={onResend}
            disabled={loading || !email}
            className="w-full bg-white text-primary border border-primary/20 hover:border-primary/40 font-bold text-xs py-3 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
