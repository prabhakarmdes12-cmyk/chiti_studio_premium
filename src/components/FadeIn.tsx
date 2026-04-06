"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FadeInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "none" | "left" | "right" | "up" | "down";
}

const directionMap = {
  none: { opacity: 0, y: 20 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
};

export default function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.8,
  direction = "none",
  ...props 
}: FadeInProps) {
  const initial = directionMap[direction];
  const whileInView = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
