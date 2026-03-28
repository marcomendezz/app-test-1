"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedCircularProgressBar({
  max = 100,
  value = 0,
  min = 0,
  gaugePrimaryColor = "#000",
  gaugeSecondaryColor = "#f3f4f6",
  className,
}: {
  max?: number;
  value?: number;
  min?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / max) * circumference;

  return (
    <div className={cn("relative flex h-32 w-32 items-center justify-center", className)}>
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          className="stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={gaugeSecondaryColor}
        />
        <circle
          className="stroke-current transition-all duration-1000 ease-out"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={gaugePrimaryColor}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute text-2xl font-bold tracking-tight text-gray-900">{Math.round((progress / max) * 100)}%</span>
    </div>
  );
}
