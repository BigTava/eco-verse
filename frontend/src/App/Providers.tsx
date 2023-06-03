// Core
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Contexts
import MainProvider from "contexts/Main.context";
import { Web3ContextProvider } from "contexts/Web3.context";
import { UserProvider } from "contexts/User.context";

// Wagmi
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { sepolia, hardhat } from "@wagmi/core/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

type ProvidersProps = {
  children: React.ReactNode;
};

const { chains, provider, webSocketProvider } = configureChains(
  [sepolia, hardhat],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `${process.env.REACT_APP_SEPOLIA_RPC_URL}`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `${process.env.REACT_APP_LOCALHOST_RPC_URL}`,
      }),
    }),
  ]
);

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "72fe8cfe616d31f641b9199add6c17a3",
          version: "2",
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <MainProvider>
          <Web3ContextProvider>
            <UserProvider>{children}</UserProvider>
          </Web3ContextProvider>
        </MainProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};

export default Providers;
