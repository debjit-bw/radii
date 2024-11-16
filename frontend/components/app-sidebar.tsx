"use client";

import { DollarSign, Tv, User, Copy, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEnsName, useEnsAvatar, useBalance } from "wagmi";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/ui/logo";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";

const RADIUS_TOKEN = "0x87DaDbc6636DF9507Ee59e0f6068b785969420D0";
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

// Add this interface
interface ERC20ABI {
  balanceOf: (address: string) => Promise<bigint>;
  decimals: () => Promise<number>;
  symbol: () => Promise<string>;
}

const fetchTransfers = async (address: string | undefined) => {
  if (!address) throw new Error("No address provided");

  const response = await fetch(
    `https://base-sepolia.blockscout.com/api/v2/addresses/${address}/token-transfers?type=ERC-20&filter=to&token=${RADIUS_TOKEN}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transfers");
  }

  console.log("Fetched transfers response:", await response.clone().json());
  return response.json();
};

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
  const currentView = searchParams.get("view") || "campaigns";
  const { primaryWallet } = useDynamicContext();
  const [copied, setCopied] = useState(false);

  const walletAddress = primaryWallet?.address;

  const { data: ensName, isLoading: ensLoading } = useEnsName({
    address: walletAddress as `0x${string}`,
  });

  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    name: ensName!,
  });

  const { data: transfers, isLoading: balanceLoading } = useQuery({
    queryKey: ["transfers", walletAddress, RADIUS_TOKEN],
    queryFn: () => fetchTransfers(walletAddress),
    enabled: !!walletAddress,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const totalBalance =
    transfers?.items?.reduce(
      (
        acc: number,
        transfer: {
          total: {
            value: string | number | bigint | boolean;
            decimals: string;
          };
        }
      ) => {
        try {
          const value = BigInt(transfer.total.value);
          const decimals = parseInt(transfer.total.decimals);
          const formattedValue = Number(formatUnits(value, decimals));
          console.log("Processing transfer:", {
            value,
            decimals,
            formattedValue,
          });
          return acc + formattedValue;
        } catch (error) {
          console.error("Error processing transfer:", error);
          return acc;
        }
      },
      0
    ) || 0;

  const formatAddress = (address: string | null) => {
    if (!address) return "Not connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const displayAddress =
    ensName || (walletAddress ? formatAddress(walletAddress) : "Not connected");
  const displayImage = ensAvatar || "";

  const handleNavigate = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", param);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
                className="space-y-4 px-2 py-4 border-t border-zinc-800/50"
              >
                {/* Profile Section */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-800">
                    {avatarLoading ? (
                      <Skeleton className="h-full w-full rounded-full" />
                    ) : (
                      <>
                        <AvatarImage src={displayImage} />
                        <AvatarFallback className="bg-zinc-900">
                          <User className="h-4 w-4 text-zinc-400" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="space-y-1">
                    {ensLoading ? (
                      <Skeleton className="h-4 w-24" />
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={copyAddress}
                            >
                              <p className="text-sm font-medium text-frost-500">
                                {displayAddress}
                              </p>
                              {copied ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3 text-zinc-400" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-zinc-400" />
                      {balanceLoading ? (
                        <Skeleton className="h-3 w-16" />
                      ) : (
                        <p className="text-xs text-zinc-400">
                          {totalBalance.toFixed(2)} RADIUS
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Copyright */}
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
