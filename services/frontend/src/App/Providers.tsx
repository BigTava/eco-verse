// Core
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Contexts
import MainProvider from "contexts/Main.context";
import { Web3ContextProvider } from "contexts/Web3.context";
import { UserProvider } from "contexts/User.context";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <Web3ContextProvider>
          <UserProvider>{children}</UserProvider>
        </Web3ContextProvider>
      </MainProvider>
    </QueryClientProvider>
  );
};

export default Providers;
