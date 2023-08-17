'use client';

import { TokensProvider, Web3Provider } from '@bb-nx/shared/modules';
import {
  ApolloProviderWrapper,
  ThemeProvider,
  COLOR_MODE_STORAGE_KEY,
} from '@bb-nx/shared/services';
import { ReactNode } from 'react';
//import { cookies } from 'next/headers';

// TODO: disabled cookies for now

export function Providers({ children }: { children: ReactNode }) {
  //const initialColorMode = cookies().get(COLOR_MODE_STORAGE_KEY)?.value;

  return (
    // <ThemeProvider initialColorMode={initialColorMode}>
    <ThemeProvider>
      <Web3Provider>
        <ApolloProviderWrapper>
          <TokensProvider>{children}</TokensProvider>
        </ApolloProviderWrapper>
      </Web3Provider>
    </ThemeProvider>
  );
}
