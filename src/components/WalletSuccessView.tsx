import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Copy, 
  Clock, 
  X,
  Check,
  Printer,
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

interface WalletSuccessProps {
  onClose: () => void;
  patientName?: string;
  diagnosis?: string;
  creditsEarned?: number;
}

export default function WalletSuccessView({ 
  onClose,
  patientName = "Fatima Abdullahi",
  diagnosis = "Probable Malaria (Uncomplicated)",
  creditsEarned = 8
}: WalletSuccessProps) {
  const [secondsLeft, setSecondsLeft] = useState(86400); // 24 hours
  const [copied, setCopied] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const encounterId = `CLINIX-ENC-${crypto.randomUUID().slice(0, 8)}`;
  const qrPayload = `https://wallet.chekk.io/demo/${encounterId}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) return 86400;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger credits animation
  useEffect(() => {
    const timer = setTimeout(() => setShowCredits(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(qrPayload);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" onClick={onClose} />

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Credits Animation */}
        {showCredits && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 gradient-primary py-3 flex items-center justify-center gap-2 z-20"
          >
            <div className="animate-credit-pop flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white font-extrabold text-sm">+{creditsEarned} Clinical Credits Earned!</span>
              <Sparkles className="w-4 h-4 text-white/60" />
            </div>
          </motion.div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer z-30"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`p-8 flex flex-col items-center text-center ${showCredits ? 'pt-16' : ''}`}>
          {/* Branding */}
          <div className="flex items-center gap-2 mb-2">
            <img src="/clinix-logo.jpg" alt="Clinix" className="w-6 h-6 rounded-lg" />
            <span className="font-extrabold text-sm text-primary tracking-tight">Clinix</span>
          </div>
          <h2 className="text-xs text-text-secondary font-medium mb-6">Encounter Slip — LAUTECH Teaching Hospital</h2>

          {/* Encounter Slip Card */}
          <div className="w-full bg-bg-main rounded-2xl border border-border p-6 mb-6">
            {/* Hospital Header */}
            <div className="text-center mb-4 pb-4 border-b border-border border-dashed">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">LAUTECH Teaching Hospital</h3>
              <p className="text-[10px] text-text-secondary mt-0.5">Ogbomoso, Oyo State, Nigeria</p>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-left">
              <div>
                <p className="text-[9px] text-text-light font-semibold uppercase">Patient</p>
                <p className="text-xs font-bold text-text-primary">{patientName}</p>
              </div>
              <div>
                <p className="text-[9px] text-text-light font-semibold uppercase">Date</p>
                <p className="text-xs font-bold text-text-primary">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[9px] text-text-light font-semibold uppercase">Diagnosis</p>
                <p className="text-xs font-semibold text-primary">{diagnosis}</p>
              </div>
              <div>
                <p className="text-[9px] text-text-light font-semibold uppercase">Encounter ID</p>
                <p className="text-[10px] font-mono font-semibold text-text-secondary">{encounterId}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center py-4 border-t border-border border-dashed">
              <div className="p-4 bg-white rounded-2xl border border-border shadow-sm mb-3">
                <QRCodeSVG 
                  value={qrPayload} 
                  size={160}
                  level="H"
                  includeMargin={false}
                  fgColor="#0f172a"
                />
              </div>
              <p className="text-[10px] font-semibold text-primary">Scan to view in Chekk Wallet</p>
              <p className="text-[9px] text-text-light mt-1 font-mono">{qrPayload}</p>
            </div>
          </div>

          {/* Expiry Timer */}
          <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-bg-main border border-border rounded-full">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] text-text-secondary font-semibold">Expires in:</span>
            <span className="text-xs font-mono font-bold text-accent">{formatTime(secondsLeft)}</span>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex gap-3">
            <button 
              onClick={() => window.print()}
              className="flex-1 py-3 gradient-primary text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Slip
            </button>
            <button 
              onClick={handleCopy}
              className="flex-1 py-3 bg-white text-primary border-2 border-primary/20 hover:border-primary/40 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Footer */}
          <p className="text-[10px] text-text-light mt-5">
            Patient scans this slip at home to access their record in the <span className="font-semibold text-primary">Chekk Data Wallet</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
