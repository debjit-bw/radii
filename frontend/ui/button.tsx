"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "coral" | "frost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "dark",
  size = "sm",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-[#4D4AE8] hover:bg-[#3733E5] focus:bg-[#413FC5] active:bg-[#3E3BBA] border-[#4D4AE8] hover:border-[#3733E5] focus:border-[#3E3BBA]",
    coral:
      "bg-coral-500 hover:bg-coral-600 focus:bg-coral-700 active:bg-coral-800 border-coral-500 hover:border-coral-600 focus:border-coral-700",
    frost:
      "bg-frost-200 hover:bg-frost-300 focus:bg-frost-400 active:bg-frost-500 border-frost-200 hover:border-frost-300 focus:border-frost-400 text-night-900",
    dark: "bg-night-900 hover:bg-night-800 focus:bg-night-700 active:bg-night-600 border-night-900 hover:border-night-800 focus:border-night-700 text-frost-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        // Base styles
        "relative inline-block rounded-lg font-medium leading-6 text-center select-none shadow-btn",
        "transition-all duration-150",
        "border",
        "text-white",

        // Default background gradient overlay
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b",
        "before:from-white/5 before:to-transparent",
        "before:transition-opacity",

        // Hover and focus states
        "hover:before:opacity-0",
        "focus:outline-none",
        "focus:ring-2 focus:ring-offset-2",

        // Active state
        "active:before:opacity-0",
        "active:shadow-inner-sm",

        // Disabled state
        "disabled:opacity-65 disabled:pointer-events-none disabled:before:hidden",

        // Focus ring colors
        {
          "focus:ring-[#6865EB]/50": variant === "primary",
          "focus:ring-coral-500/50": variant === "coral",
          "focus:ring-frost-400/50": variant === "frost",
        },

        // Apply variant styles
        variants[variant],

        // Apply size styles
        sizes[size],

        // Custom classes
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
