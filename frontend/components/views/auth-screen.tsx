import { motion } from "framer-motion";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShieldCheck, Rocket, Zap, BarChart, Wallet } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import WorldcoinVerify from "../worldcoin-verify";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Connect securely with your Web3 wallet of choice",
  },
  {
    icon: Rocket,
    title: "Launch Campaigns",
    description: "Create and manage your advertising campaigns",
  },
  {
    icon: BarChart,
    title: "Track Performance",
    description: "Access real-time analytics and insights",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Start advertising immediately after connecting",
  },
];

export function AuthScreen() {
  const { isDynamicLoggedIn, isWorldcoinVerified } = useAuth();
  return (
    <motion.div
      key="not-connected"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-[80vh] w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-12 p-4 md:p-8"
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-2 ">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-frost-50 to-frost-700/75 font-serif">
            Welcome to Radii
          </h1>
          <p className="text-lg text-zinc-400">
            {isDynamicLoggedIn
              ? "Verify your Worldcoin ID to continue"
              : "Connect your wallet to get started"}
          </p>
        </div>
        {isDynamicLoggedIn ? (
          !isWorldcoinVerified && <WorldcoinVerify />
        ) : (
          <DynamicWidget />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {features.map((feature, index) => (
          <Card key={index} className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-zinc-800">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium text-zinc-200">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <p className="text-xs text-frost-300/20">
        By connecting your wallet, you agree to our{" "}
        <a
          href="#"
          className="text-frost-300/50 hover:underline underline-offset-2"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-frost-300/50 hover:underline underline-offset-2"
        >
          Privacy Policy
        </a>
      </p>
    </motion.div>
  );
}
