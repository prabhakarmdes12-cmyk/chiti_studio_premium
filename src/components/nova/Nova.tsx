'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNovaStore } from '@/store/useNovaStore';
import Sphere from './Sphere';
import ConversationEngine from './ConversationEngine';

export default function Nova() {
  const { isOpen, close, isComplete, leadStatus } = useNovaStore();

  return (
    <>
      <Sphere />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-[480px] aspect-[9/16] bg-black/95 border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <ConversationEngine />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}