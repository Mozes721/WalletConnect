"use client";
import  { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, avalanche } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, polygon, avalanche],
    transports: {
      [mainnet.id]: http(
        `https://lb.nodies.app/v1/5e9daed367d1454fab7c75f0ec8aceff`,
      ),
    },

    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

    appName: "Get started with Nodie powered by POKT",
    appDescription: "Walllet Connect with Nodie",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <ConnectKitButton />
            {children}
          </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};