'use client';

import { useNovaStore } from '@/store/useNovaStore';
import { motion } from 'framer-motion';

export default function Sphere() {
  const { isOpen, open } = useNovaStore();

  return (
    <motion.button
      onClick={open}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
        }}
        animate={{
          boxShadow: [
            '0 0 40px rgba(139, 92, 246, 0.5)',
            '0 0 60px rgba(139, 92, 246, 0.7)',
            '0 0 40px rgba(139, 92, 246, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {!isOpen && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 12H16M12 8V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}