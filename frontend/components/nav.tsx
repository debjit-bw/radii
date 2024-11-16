"use client";

import Logo from "@/ui/logo";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    y: "12px",
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function Nav() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textBlur = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const textBlurValue = useTransform(textBlur, (value) => `blur(${value}px)`);
  const textY = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <>
      <nav className="overflow-hidden fixed top-0 left-0 w-[calc(100%_-_2rem)] bg-zinc-900/30 z-50 border border-zinc-700/30 rounded-2xl m-4 backdrop-blur-md px-4 py-2 flex justify-between items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={contentVariants}
          className="flex items-center gap-2"
        >
          <Logo isGradient size={16} />
          <motion.h1
            style={{
              opacity: textOpacity,
              y: textY,
              filter: textBlurValue,
            }}
            className="text-transparent text-2xl font-bold font-serif leading-tight pt-0.5 bg-clip-text bg-gradient-to-b from-frost-100 to-frost-900/75"
          >
            Radii
          </motion.h1>
        </motion.div>
        <DynamicWidget />
      </nav>

      {/* Scroll measurement target */}
      <div
        ref={targetRef}
        className="absolute top-[calc(50vh_-_8rem)] left-0 w-full h-[100px] pointer-events-none opacity-0"
      />
    </>
  );
}
