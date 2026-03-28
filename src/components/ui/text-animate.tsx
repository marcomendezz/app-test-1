"use client";
import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextAnimate = ({ text, className }: { text: string; className?: string }) => {
  const characters = text.split("");
  return (
    <h1 className={cn("flex flex-wrap justify-center", className)}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.03, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};
