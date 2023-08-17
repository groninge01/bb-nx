'use client';
import { usePool } from '@bb-nx/shared/modules';

export default function PoolPage() {
  const { pool } = usePool();

  return (
    <>
      {pool.name}: {pool.id}
    </>
  );
}
