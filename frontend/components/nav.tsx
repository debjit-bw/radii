"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-[calc(100%_-_2rem)] bg-frost-200/30 z-50 border border-frost-900/30 rounded-2xl m-4 backdrop-blur-md px-4 py-2 flex justify-between items-center">
      <motion.h1
        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        className="text-night-900 text-2xl font-bold font-serif leading-tight pt-0.5"
      >
        Radii
      </motion.h1>
      <DynamicWidget />
    </nav>
  );
}
