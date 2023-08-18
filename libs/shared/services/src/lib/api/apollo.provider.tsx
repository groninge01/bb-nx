// eslint-disable-next-line max-len
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { createApolloClient } from './apollo.client';
import { ApolloPrimeCacheProvider } from './apollo-prime-cache.provider';

export function ApolloProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      <ApolloPrimeCacheProvider>{children}</ApolloPrimeCacheProvider>
    </ApolloNextAppProvider>
  );
}
