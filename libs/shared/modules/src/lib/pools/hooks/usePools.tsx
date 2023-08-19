import {
  GetPoolsDocument,
  GqlChain,
  GqlPoolFilterType,
  GqlPoolOrderBy,
  GqlPoolOrderDirection,
} from '@bb-nx/shared/services';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useQuery,
  useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { chainShortNames } from '@bb-nx/shared/constants';
import { config } from '@bb-nx/shared/services';

export type UsePoolsResponse = ReturnType<typeof _usePools>;
export const PoolsContext = createContext<UsePoolsResponse | null>(null);

export function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string
): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}

// TODO: this must be easier to get
const chains = Object.values(config.network)
  .map((network, index) =>
    chainShortNames[config.protocol].includes(network.shortName)
      ? (Object.keys(config.network)[index] as GqlChain)
      : null
  )
  .filter(Boolean) as GqlChain[];

/**
 * Uses useSuspenseQuery to seed the client cache with initial pool data on the SSR pass.
 */
export const useSeedPoolsCacheQuery = () => {
  return useSuspenseQuery(GetPoolsDocument, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: GqlPoolOrderBy.TotalLiquidity,
      orderDirection: GqlPoolOrderDirection.Desc,
      where: {
        chainIn: chains,
        poolTypeIn: [
          GqlPoolFilterType.Weighted,
          GqlPoolFilterType.Stable,
          GqlPoolFilterType.PhantomStable,
          GqlPoolFilterType.MetaStable,
        ],
      },
    },
  });
};

function _usePools() {
  const [numPerPage, setNumPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(0);

  const { data, refetch, loading, previousData } = useQuery(GetPoolsDocument, {
    variables: {
      first: numPerPage,
      skip: pageNum * numPerPage,
      orderBy: GqlPoolOrderBy.TotalLiquidity,
      orderDirection: GqlPoolOrderDirection.Desc,
      where: {
        chainIn: chains,
        poolTypeIn: [
          GqlPoolFilterType.Weighted,
          GqlPoolFilterType.Stable,
          GqlPoolFilterType.PhantomStable,
          GqlPoolFilterType.MetaStable,
        ],
      },
    },
  });

  useEffect(() => {
    refetch({ first: numPerPage, skip: pageNum * numPerPage });
  }, [numPerPage, pageNum, refetch]);

  const pools =
    loading && previousData ? previousData.pools : data?.pools || [];

  return { pools, loading, numPerPage, setNumPerPage, pageNum, setPageNum };
}

export function PoolsProvider({ children }: PropsWithChildren) {
  const pools = _usePools();
  return (
    <PoolsContext.Provider value={pools}>{children}</PoolsContext.Provider>
  );
}

export const usePools = () => useContext(PoolsContext) as UsePoolsResponse;
