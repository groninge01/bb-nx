'use client';

import { TokensProvider, Web3Provider } from '@bb-nx/shared/modules';
import { ApolloProviderWrapper, ThemeProvider } from '@bb-nx/shared/services';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Web3Provider>
        <ApolloProviderWrapper>
          <TokensProvider>{children}</TokensProvider>
        </ApolloProviderWrapper>
      </Web3Provider>
    </ThemeProvider>
  );
}
