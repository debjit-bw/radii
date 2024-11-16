"use client";

import {
  DynamicContextProvider,
  mergeNetworks,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const cssOverrides = `
	.button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		margin-right: -0.5rem;
	}
`;

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
      theme="dark"
      settings={{
        environmentId: "38c97b69-b6dc-471a-8068-b34f1672c0d4",
        walletConnectors: [EthereumWalletConnectors],
        cssOverrides,
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
