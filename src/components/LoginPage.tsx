import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight, Shield, Brain, Award } from 'lucide-react';
import { User } from '../types';
import { demoStudent, demoSupervisor } from '../data';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'adeola@clinix.ng' && password === 'password') {
        onLogin(demoStudent);
      } else if (email === 'okonkwo@clinix.ng' && password === 'password') {
        onLogin(demoSupervisor);
      } else {
        setError('Invalid credentials. Try adeola@clinix.ng or okonkwo@clinix.ng');
        setIsLoading(false);
      }
    }, 800);
  };

  const features = [
    { icon: Brain, title: 'AI-Guided Diagnosis', desc: 'Real-time clinical analysis powered by sovereign AI agents' },
    { icon: Shield, title: 'Verified Credentials', desc: 'Cryptographically signed clinical encounters and portfolio' },
    { icon: Award, title: 'MCP Action Skills', desc: 'Automated drug checks, lab orders, and follow-up scheduling' },
  ];

  return (
    <div className="min-h-screen login-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Side - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white space-y-8 hidden lg:block"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/clinix-logo.jpg" 
                alt="Clinix Logo" 
                className="w-14 h-14 object-cover rounded-xl border-2 border-white/20 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Clinix</h1>
                <p className="text-sm font-medium text-white/60 tracking-wide">Sovereign Clinical Intelligence</p>
              </div>
            </div>
            <p className="text-lg text-white/80 leading-relaxed max-w-md">
              Every supervised patient encounter becomes verified competence for the medical student 
              and a portable health record for the patient.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-primary/20 flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{feature.title}</h3>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-white/30 font-medium">
            Partnered with Chekk Inc. — Building the clinical layer Nigerian medical education has never had.
          </p>
        </motion.div>

        {/* Right Side - Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-8 border border-white/50">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
              <img 
                src="/clinix-logo.jpg" 
                alt="Clinix Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-xl font-extrabold text-text-primary tracking-tight">Clinix</h1>
                <p className="text-[10px] font-medium text-text-secondary">Sovereign Clinical Intelligence</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-text-primary tracking-tight">Welcome back</h2>
              <p className="text-sm text-text-secondary mt-1">Sign in to your clinical dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5" htmlFor="login-email">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adeola@clinix.ng"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-main text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5" htmlFor="login-password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-main text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-danger font-medium bg-danger/5 px-3 py-2 rounded-lg border border-danger/10"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                id="login-submit"
                className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-[10px] font-semibold text-text-light uppercase tracking-wider mb-3">Demo Accounts</p>
              <div className="space-y-2">
                <button
                  onClick={() => { setEmail('adeola@clinix.ng'); setPassword('password'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-bg-main hover:bg-primary/5 border border-border hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    Ademilua Adeola
                    <span className="text-text-light font-medium ml-1">— 500L Student</span>
                  </p>
                  <p className="text-[10px] text-text-light font-mono mt-0.5">adeola@clinix.ng</p>
                </button>
                <button
                  onClick={() => { setEmail('okonkwo@clinix.ng'); setPassword('password'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-bg-main hover:bg-primary/5 border border-border hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    Dr. Chukwuemeka Okonkwo
                    <span className="text-text-light font-medium ml-1">— Supervisor</span>
                  </p>
                  <p className="text-[10px] text-text-light font-mono mt-0.5">okonkwo@clinix.ng</p>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] text-white/30 mt-4 font-medium">
            Clinix v2.1 — Hackathon Edition • LAUTECH Teaching Hospital
          </p>
        </motion.div>
      </div>
    </div>
  );
}
