'use client';
export const dynamic = 'force-dynamic';

import { PoolsList } from '@bb-nx/shared/modules';
import { PoolsProvider, useSeedPoolsCacheQuery } from '@bb-nx/shared/modules';
import { Box } from '@chakra-ui/react';

export default function Home() {
  useSeedPoolsCacheQuery();

  return (
    <PoolsProvider>
      <Box p="md">
        <PoolsList />
      </Box>
    </PoolsProvider>
  );
}
