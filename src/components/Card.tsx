"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "primary" | "secondary" | "tertiary";
}

export default function Card({ children, className, accent = "primary" }: CardProps) {
  const accentClasses = {
    primary: "border-primary/10 hover:border-primary/20",
    secondary: "border-secondary/10 hover:border-secondary/20",
    tertiary: "border-tertiary/10 hover:border-tertiary/20",
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-8 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        accentClasses[accent],
        className
      )}
    >
      {children}
    </div>
  );
}
