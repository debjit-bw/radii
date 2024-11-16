"use client";

import React from "react";
import { motion } from "framer-motion";
import GridBackground from "@/ui/grid-background";
import { Button } from "@/ui/button";
import { Spotlight } from "@/ui/spotlight";

const Hero = () => {
  const letters = "Radii".split("");

  const getRandomWeight = () => Math.floor(Math.random() * (900 - 100) + 100);

  return (
    <div className="h-[calc(100dvh_-_6rem)] w-full grid place-items-center relative">
      <Spotlight
        className="-top-0 left-0 md:left-60 md:-top-20"
        fill="rgba(192, 213, 255, 0.2)"
      />
      <GridBackground />
      <div className="grid place-items-center">
        <div className="flex items-center gap-[0.1em]">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
            >
              <motion.span
                className="inline-block text-[10rem] leading-none font-serif text-transparent bg-clip-text bg-gradient-to-b from-frost-100 to-frost-900/75"
                animate={{
                  fontVariationSettings: [
                    `"wght" ${getRandomWeight()}`,
                    `"wght" ${getRandomWeight()}`,
                    `"wght" ${getRandomWeight()}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                {letter}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
            className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-b from-frost-100/75 to-frost-100/25 font-medium font-serif"
          >
            The Future of Digital Advertisements
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
            className="flex items-center gap-4 justify-center mt-8"
          >
            <Button size="md" variant="coral" onClick={() => {}}>
              Get Started
            </Button>
            <Button size="md">Learn More</Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
