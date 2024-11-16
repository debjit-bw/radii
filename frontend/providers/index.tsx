"use client";

import React, { ReactNode, Suspense } from "react";
import DynamicProvider from "./dynamic-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./auth-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "viem/chains";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              disableTransitionOnChange
            >
              <AuthProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </AuthProvider>
            </ThemeProvider>
          </DynamicProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Suspense>
  );
};

export default Providers;
