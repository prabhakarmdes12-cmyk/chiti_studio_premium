"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center rounded-full font-semibold font-headline tracking-[0.01em] cursor-pointer overflow-hidden",
    "transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
  );

  const variants = {
    primary: cn(
      "bg-gradient-to-r from-primary to-primary-dim text-on-primary",
      "hover:shadow-[0_0_30px_rgba(77,208,225,0.3),0_0_80px_rgba(77,208,225,0.08)]",
      "active:shadow-[0_0_16px_rgba(77,208,225,0.35)]",
      "btn-primary-wrap"
    ),
    secondary: cn(
      "border border-white/[0.08] text-on-surface",
      "bg-white/[0.03] backdrop-blur-sm",
      "hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(77,208,225,0.06)]"
    ),
    ghost: cn(
      "text-on-surface-variant bg-transparent",
      "transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      "hover:text-on-surface"
    ),
  };

  const sizes = {
    sm: "h-10 px-6 text-[13px]",
    md: "h-[52px] px-8 text-[14px]",
    lg: "h-14 px-10 text-[15px]",
  };

  const mergedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-fixed to-primary-dim opacity-0 hover:opacity-100 transition-opacity duration-[600ms]" />
      )}
      <span className="relative z-10 truncate">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={mergedClassName}
        >
          {inner}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={mergedClassName}
    >
      {inner}
    </motion.button>
  );
}
