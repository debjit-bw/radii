"use client";

import {
  DynamicContextProvider,
  mergeNetworks,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const DynamicProvider = ({ children }: { children: React.ReactNode }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://explorer.helium.fhenix.zone"],
      chainId: 8008135,
      chainName: "Fhenix Helium",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
      name: "Fhenix Heloum",
      nativeCurrency: {
        decimals: 18,
        name: "tFHE",
        symbol: "tFHE",
      },
      networkId: 1,

      rpcUrls: ["https://api.helium.fhenix.zone"],
      vanityName: "Fhenix Helium",
    },
  ];

  return (
    <DynamicContextProvider
      theme="light"
      settings={{
        environmentId: "38c97b69-b6dc-471a-8068-b34f1672c0d4",
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: (networks) => mergeNetworks(evmNetworks, networks),
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default DynamicProvider;
