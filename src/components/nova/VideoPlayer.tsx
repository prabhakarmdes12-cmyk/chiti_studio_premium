'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  subtitle?: string;
  question?: string;
  options?: { label: string; value: string; nextStep: string }[];
  inputType?: 'text' | 'email';
  inputPlaceholder?: string;
  onComplete?: () => void;
  onOptionSelect?: (value: string, nextStep: string) => void;
  onInputSubmit?: (value: string, nextStep: string) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onClose?: () => void;
}

export default function VideoPlayer({ 
  src, 
  subtitle, 
  question, 
  options, 
  inputType, 
  inputPlaceholder,
  onComplete, 
  onOptionSelect,
  onInputSubmit,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onClose
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const hasEndedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoComplete = useCallback(() => {
    if (!hasEndedRef.current) {
      hasEndedRef.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  useEffect(() => {
    hasEndedRef.current = false;
  }, [src]);

  useEffect(() => {
    if (!isClient || !videoRef.current || hasEndedRef.current || !src) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.loop = false;
    video.muted = false;
    
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    const handleEnded = () => handleVideoComplete();
    video.addEventListener('ended', handleEnded);

    const timeout = setTimeout(handleVideoComplete, 12000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.pause();
      clearTimeout(timeout);
    };
  }, [src, isClient, handleVideoComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-cyan-500/25 rounded-3xl blur-3xl" />

      <div className="absolute inset-0">
        {isClient && src && (
          <video ref={videoRef} src={src} className="w-full h-full object-cover" playsInline preload="auto" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />
      </div>

      <div className="absolute top-4 left-0 right-0 flex justify-between px-4 z-10">
        <button onClick={onGoBack} disabled={!canGoBack} className={`w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center ${canGoBack ? 'text-white/70 hover:bg-black/60' : 'text-white/20 cursor-not-allowed'}`}>
          <ChevronLeft size={18} />
        </button>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/60">
          <X size={18} />
        </button>
        <button onClick={onGoForward} disabled={!canGoForward} className={`w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center ${canGoForward ? 'text-white/70 hover:bg-black/60' : 'text-white/20 cursor-not-allowed'}`}>
          <ChevronRight size={18} />
        </button>
      </div>

      {subtitle && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute top-20 left-6 right-6 text-center">
          <p className="text-white/90 text-sm font-light tracking-wide">{subtitle}</p>
        </motion.div>
      )}

      {(question || options || inputType) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          {question && <p className="text-white text-xl font-light text-center mb-6">{question}</p>}

          {options && (
            <div className="space-y-3">
              {options.map((option, i) => (
                <motion.button key={option.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} onClick={() => onOptionSelect?.(option.value, option.nextStep)} className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white/90 font-light text-left backdrop-blur-sm hover:bg-white/20 hover:border-white/20 transition-all">
                  {option.label}
                </motion.button>
              ))}
            </div>
          )}

          {inputType && (
            <div className="space-y-4">
              <input type={inputType} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={inputPlaceholder} className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 font-light backdrop-blur-sm focus:outline-none focus:border-white/30" onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && onInputSubmit?.(inputValue.trim(), '')} />
              <button onClick={() => inputValue.trim() && onInputSubmit?.(inputValue.trim(), '')} disabled={!inputValue.trim()} className="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all">
                Continue
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
