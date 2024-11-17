"use client";

import { useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CampaignsView } from "@/components/views/campaigns";
import { BuyAdsView } from "@/components/views/buy-ads";
import { ShowAdsView } from "@/components/views/show-ads";
import { ProfileView } from "@/components/views/profile";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { AuthScreen } from "@/components/views/auth-screen";
import { useAuth } from "@/providers/auth-provider";
import { Toaster } from "sonner";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Page = () => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "campaigns";

  const { isAuthenticated, isWorldcoinVerified, isDynamicLoggedIn } = useAuth();

  const renderView = () => {
    if (!isAuthenticated) {
      return <AuthScreen />;
    }

    const View = (() => {
      switch (currentView) {
        case "campaigns":
          return CampaignsView;
        case "buy":
          return BuyAdsView;
        case "show":
          return ShowAdsView;
        case "profile":
          return ProfileView;
        default:
          return CampaignsView;
      }
    })();

    return (
      <motion.div
        key={currentView}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.15 }}
      >
        <View />
      </motion.div>
    );
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "campaigns":
        return "Campaign Dashboard";
      case "buy":
        return "Buy Advertisement";
      case "show":
        return "Available Ad Spaces";
      case "profile":
        return "Profile Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="flex items-center justify-between border-b border-zinc-800 px-6 py-6 pt-0"
      >
        <div className="flex items-center">
          <SidebarTrigger className="mr-4" />
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentView}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              className="text-xl font-bold leading-tight"
            >
              {getViewTitle()}
            </motion.h1>
          </AnimatePresence>
        </div>
        <DynamicWidget />
      </motion.nav>

      <Toaster richColors />

      <main className="p-6">
        <AnimatePresence mode="wait">{renderView()}</AnimatePresence>
      </main>
    </div>
  );
};

export default Page;
