"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface PasswordGateProps {
  onUnlocked: () => void;
}

export default function PasswordGate({ onUnlocked }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [exiting, setExiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (res.ok) {
        setExiting(true);
        setTimeout(onUnlocked, 600);
      } else {
        setError(true);
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-surface" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(153,102,255,0.06)_0%,_transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="glass-panel rounded-3xl p-10 border border-white/[0.06]">
              <div className="flex flex-col items-center text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
                  className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                >
                  <Lock size={28} strokeWidth={1.5} className="text-primary" />
                </motion.div>

                <h1 className="text-on-surface text-2xl font-extrabold font-headline tracking-[-0.02em] mb-2">
                  Case Study in Development
                </h1>
                <p className="text-on-surface-variant/60 text-[14px] leading-[1.65] max-w-xs">
                  This project is currently under wraps. Enter the password to view the case study.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter password"
                    autoComplete="off"
                    spellCheck={false}
                    className={`w-full h-12 px-4 pr-12 rounded-xl bg-surface-container border text-on-surface text-[14px] placeholder:text-on-surface-variant/30 transition-all duration-[var(--duration-normal)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(153,102,255,0.15)] ${
                      error
                        ? "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(255,82,82,0.15)]"
                        : "border-white/[0.06] hover:border-white/[0.12]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant/40 hover:text-on-surface-variant/70 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-error text-[12px] text-center"
                    >
                      Incorrect password
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading || !password.trim()}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-semibold font-headline text-[14px] tracking-[0.01em] flex items-center justify-center gap-2 transition-all duration-[var(--duration-normal)] hover:shadow-[0_0_30px_rgba(153,102,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="size-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                  ) : (
                    <>
                      Unlock
                      <ArrowRight size={16} strokeWidth={2} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            <p className="text-center text-[11px] text-on-surface-variant/25 mt-6 font-label tracking-[0.08em] uppercase">
              Chiti Technologies &mdash; Private Preview
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
