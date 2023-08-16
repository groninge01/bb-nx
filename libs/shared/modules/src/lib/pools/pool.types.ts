import { GetPoolsQuery, GqlChain } from '@bb-nx/shared/services';

export type PoolsListQuery = GetPoolsQuery['pools'];

export type PoolsListItem = PoolsListQuery[0];

export type BalancerVersion = 'v2' | 'v3';

export interface FetchPoolProps {
  id: string;
  // chain & balancerVersion are not used yet, but will be needed in the future.
  chain: GqlChain;
  balancerVersion?: BalancerVersion;
}
