'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Brain, ArrowLeft, Lock, Zap, Shield, Cpu, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/* ── Google sign-in SVG icon ── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ── Animated feature list for left panel ── */
const features = [
  { icon: Lock,    text: 'Secure Admin Access'         },
  { icon: Zap,     text: 'Instant Project Management'  },
  { icon: Shield,  text: 'Private Content Control'     },
  { icon: Cpu,     text: 'AI-Powered Portfolio'        },
];

export default function LoginPage() {
  const { signInWithGoogle, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err.message && err.message.includes('Access denied')) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError(`Login failed: ${err.message || 'Unknown error occurred.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const isSpinning = loading || authLoading;

  return (
    <div className="min-h-screen flex bg-bg-base overflow-hidden">

      {/* ══════════════════════════════════════════
          LEFT PANEL — Cinematic AI background
          ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        {/* 
          ╔════════════════════════════════════════════╗
          ║  LOGIN BACKGROUND IMAGE PLACEHOLDER        ║
          ║                                            ║
          ║  The image /login-bg.png is used here.     ║
          ║  To replace: swap the src prop below,      ║
          ║  or update public/login-bg.png directly.   ║
          ╚════════════════════════════════════════════╝
        */}
        <div className="absolute inset-0">
          <Image
            src="/login-bg.png"
            alt="AI Research Background"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(2,8,26,0.85)] via-[rgba(10,22,40,0.6)] to-[rgba(2,8,26,0.75)]" />

        {/* Animated color sweeps */}
        <div
          className="absolute inset-0 animate-gradient-shift pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.05) 50%, rgba(139,92,246,0.08) 100%)',
          }}
        />

        {/* Animated vertical scan line */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-10"
          aria-hidden
        >
          <div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ animation: 'scan-line 8s linear infinite' }}
          />
        </div>

        {/* Floating grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Content on left panel */}
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 blur-md opacity-50 animate-glow-pulse" />
              <Brain className="relative w-9 h-9 p-2 text-white" />
            </div>
            <span
              className="font-bold text-xl text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              AI<span className="gradient-text-blue">Research</span>
            </span>
          </Link>

          {/* Center: headline */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl xl:text-5xl font-extrabold leading-tight text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Admin <span className="gradient-text">Command</span> Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary text-base max-w-sm leading-relaxed"
            >
              Manage your AI research portfolio — create projects, upload results, and publish to the world.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 pt-2"
            >
              {features.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <div className="w-7 h-7 rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  {text}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom attribution */}
          <p className="text-xs text-text-muted">
            Private admin access only. Unauthorized access is prohibited.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Glass login card
          ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-6">
        {/* Background for right panel */}
        <div className="absolute inset-0 bg-bg-base" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
        />

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Brain className="w-8 h-8 p-1.5 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              AI<span className="gradient-text-blue">Research</span>
            </span>
          </Link>
        </div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', damping: 22 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="glass-strong rounded-3xl p-8 border border-[rgba(59,130,246,0.18)] shadow-2xl">
            {/* Top glow line on card */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            {/* Card header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-[rgba(59,130,246,0.2)] flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-blue-400" />
              </div>
              <h2
                className="text-2xl font-bold text-text-primary mb-1"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Admin Login
              </h2>
              <p className="text-sm text-text-muted">
                Authorized personnel only
              </p>
            </div>

            {/* Google sign-in */}
            <div className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                id="google-signin-btn"
                onClick={handleGoogleLogin}
                disabled={isSpinning}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-[rgba(59,130,246,0.2)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(59,130,246,0.06)] hover:border-[rgba(59,130,246,0.35)] text-text-primary font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSpinning ? (
                  <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="text-sm">{isSpinning ? 'Authenticating...' : 'Continue with Google'}</span>
              </motion.button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                <span className="text-xs text-text-muted">or</span>
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              </div>

              {/* Email/password (placeholder — connect to Firebase) */}
              <div className="space-y-3">
                <input
                  type="email"
                  id="admin-email"
                  placeholder="admin@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(59,130,246,0.15)] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-[rgba(59,130,246,0.5)] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                />
                <input
                  type="password"
                  id="admin-password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(59,130,246,0.15)] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-[rgba(59,130,246,0.5)] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                />
                <motion.button
                  id="email-signin-btn"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center"
                  onClick={(e) => e.preventDefault()}
                >
                  Sign In
                </motion.button>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.05)] text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to portfolio
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Warning note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mt-6 text-xs text-text-muted text-center max-w-xs"
        >
          This admin area is private. Unauthorized access attempts are logged.
        </motion.p>
      </div>
    </div>
  );
}
