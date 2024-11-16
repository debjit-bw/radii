"use client";
import { DollarSign, Tv, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/ui/logo";

const items = [
  {
    title: "Campaigns",
    param: "campaigns",
    icon: User,
  },
  {
    title: "Buy Ads",
    param: "buy",
    icon: DollarSign,
  },
  {
    title: "Show Ads",
    param: "show",
    icon: Tv,
  },
  {
    title: "Profile",
    param: "profile",
    icon: User,
  },
];

const sidebarAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "profile";

  const handleNavigate = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", param);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Sidebar className="font-sans border-transparent">
      <SidebarContent className="bg-zinc-900/25 border border-zinc-800/50 rounded-md m-2">
        <motion.div
          initial="hidden"
          animate="show"
          variants={sidebarAnimation}
          className="h-full"
        >
          <SidebarGroup className="h-full">
            <SidebarGroupLabel className="py-9 bg-zinc-900/50 -m-2 rounded-b-none border-b border-b-zinc-800/50 px-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Logo isGradient size={16} />
                  <h1 className="text-transparent text-2xl font-bold font-serif leading-tight pt-0.5 bg-clip-text bg-gradient-to-b from-frost-100 to-frost-900/75">
                    Radii
                  </h1>
                </Link>
              </motion.div>
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-6 flex-grow">
              <SidebarMenu>
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={itemAnimation}
                    custom={index}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => handleNavigate(item.param)}
                        className={`${
                          currentView === item.param
                            ? "bg-zinc-800 shadow-btn"
                            : ""
                        } hover:bg-zinc-900`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon
                            className={`${
                              currentView === item.param ? "text-frost-500" : ""
                            } size-4 opacity-50`}
                          />
                          <span
                            className={
                              currentView === item.param ? "text-frost-500" : ""
                            }
                          >
                            {item.title}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex p-2"
              >
                <p className="text-xs text-zinc-500">
                  © 2024 Radii. All rights reserved.
                </p>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}
