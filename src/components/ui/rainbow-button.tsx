import React from "react";
import { cn } from "@/lib/utils";

export function RainbowButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative rounded-xl border border-transparent bg-black px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 overflow-hidden group shadow-lg shadow-purple-500/20",
        className
      )}
      {...props}
    >
      {/* Animated gradient border simulation via background pseudo-layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-[1px] bg-black rounded-xl" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
