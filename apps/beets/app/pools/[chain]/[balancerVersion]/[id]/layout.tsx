'use client';

import {
  BalancerVersion,
  ChainSlug,
  slugToChainMap,
  PoolProvider,
  useSeedPoolCacheQuery,
} from '@bb-nx/shared/modules';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: { id: string; chain: ChainSlug; balancerVersion: BalancerVersion };
}

export default function PoolLayout({
  params: { id, chain, balancerVersion },
  children,
}: Props) {
  const _chain = slugToChainMap[chain];

  useSeedPoolCacheQuery({ id, chain: _chain, balancerVersion });

  return (
    <PoolProvider id={id} chain={_chain} balancerVersion={balancerVersion}>
      {children}
    </PoolProvider>
  );
}
