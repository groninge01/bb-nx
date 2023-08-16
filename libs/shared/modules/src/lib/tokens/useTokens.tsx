'use client';

import { GetTokensDocument, GqlToken } from '@bb-nx/shared/services';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { isSameAddress } from '@bb-nx/shared/utils';

export const TokensContext = createContext<ReturnType<
  typeof _useTokens
> | null>(null);

function _useTokens() {
  const { data } = useQuery(GetTokensDocument);

  const tokens = data?.tokens || [];

  function getToken(address: string, chainId: number): GqlToken | undefined {
    return tokens.find(
      (token) =>
        isSameAddress(token.address, address) && token.chainId === chainId
    );
  }

  return { tokens, getToken };
}

export function TokensProvider({ children }: PropsWithChildren) {
  const tokens = _useTokens();
  return (
    <TokensContext.Provider value={tokens}>{children}</TokensContext.Provider>
  );
}

export const useTokens = () =>
  useContext(TokensContext) as ReturnType<typeof _useTokens>;
