'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionPanelProps {
  question: string;
  options?: { label: string; value: string; nextStep: string }[];
  inputType?: 'text' | 'email';
  inputPlaceholder?: string;
  onOptionSelect?: (value: string, nextStep: string) => void;
  onInputSubmit?: (value: string, nextStep: string) => void;
}

export default function QuestionPanel({
  question,
  options,
  inputType,
  inputPlaceholder,
  onOptionSelect,
  onInputSubmit,
}: QuestionPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleOptionClick = (option: { label: string; value: string; nextStep: string }) => {
    onOptionSelect?.(option.value, option.nextStep);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onInputSubmit?.(inputValue.trim(), '');
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-white/90 text-xl font-light text-center mb-8">
        {question}
      </p>

      {options && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white/80 font-light text-left backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      )}

      {inputType && (
        <div className="space-y-4">
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 font-light backdrop-blur-md focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
            onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
          />
          <motion.button
            onClick={handleInputSubmit}
            disabled={!inputValue.trim()}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}