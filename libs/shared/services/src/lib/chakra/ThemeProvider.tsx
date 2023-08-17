'use client';

import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react';
import { CacheProvider as ChakraCacheProvider } from '@chakra-ui/next-js';
import { ReactNode } from 'react';
import theme, { balTheme } from './theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorModeScript
        initialColorMode={balTheme.config?.initialColorMode}
        type="cookie"
      />
      <ChakraCacheProvider>
        <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
          {children}
        </ChakraProvider>
      </ChakraCacheProvider>
    </>
  );
}
