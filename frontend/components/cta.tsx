"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "@/ui/spotlight";
import GridBackground from "@/ui/grid-background";
import { Button } from "@/ui/button";
import Link from "next/link";

const steps = [
  {
    title: "Advertisers",
    description: "Upload ads and set targeting parameters while paying in ETH",
    icon: "💰",
  },
  {
    title: "Smart Contracts",
    description: "Process payments and manage ad distribution transparently",
    icon: "🔗",
  },
  {
    title: "Partners",
    description: "Display ads on their platforms and earn revenue share",
    icon: "🤝",
  },
  {
    title: "Users",
    description: "Interact with relevant ads and earn RADIUS tokens",
    icon: "👥",
  },
];

const HowItWorks = () => {
  const titleRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-[calc(100dvh_-_6rem)] w-full relative flex flex-col items-center justify-center py-20 pb-32">
      <GridBackground />

      {/* Title Section */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 z-10"
      >
        <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-frost-100 to-frost-900/75">
          How It Works
        </h2>
        <p className="text-lg mt-4 text-frost-100/50 max-w-2xl mx-auto">
          A decentralized ecosystem connecting advertisers, partners, and users
          through blockchain technology
        </p>
      </motion.div>

      {/* Flow Chart */}
      <div
        ref={stepsRef}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={
              stepsInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 20, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.5,
              delay: stepsInView ? index * 0.2 : 0,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
            className="relative"
          >
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6 h-full backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={stepsInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: stepsInView ? index * 0.2 + 0.3 : 0,
                  ease: "backOut",
                }}
                className="text-4xl mb-4"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-serif font-semibold text-frost-100 mb-2">
                {step.title}
              </h3>
              <p className="text-frost-100/50 text-sm">{step.description}</p>
            </div>
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={
                  stepsInView
                    ? { opacity: 1, width: "2rem" }
                    : { opacity: 0, width: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: stepsInView ? index * 0.2 + 0.5 : 0,
                }}
                className="hidden lg:block absolute top-1/2 -right-8 h-px bg-gradient-to-r from-frost-500 to-transparent w-16"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mt-16 text-center"
      >
        <Button asChild size="md" variant="coral">
          <Link href="/dashboard">Start Your Campaign</Link>
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="w-full py-6 border-t border-zinc-800/50 mt-20 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-frost-100/50">
          <div className="flex items-center gap-2">
            <span className="">Radii</span>
            <span className="text-zinc-600">•</span>
            <span>© 2024</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-frost-100 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-frost-100 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com/debjit-bw/radii"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-frost-100 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HowItWorks;
