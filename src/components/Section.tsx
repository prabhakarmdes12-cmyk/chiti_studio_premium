"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
}

export default function Section({
  children,
  className,
  bordered = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        bordered && "border-t border-white/[0.04]",
        className
      )}
    >
      {children}
    </section>
  );
}
