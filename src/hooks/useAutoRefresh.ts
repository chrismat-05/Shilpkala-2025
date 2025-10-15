import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useAutoRefresh<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  refetchInterval = 30000
): UseQueryResult<T, Error> {
  const options: UseQueryOptions<T, Error, T, string[]> = {
    queryKey,
    queryFn,
    refetchInterval,
    refetchIntervalInBackground: true,
    staleTime: 0,
    keepPreviousData: true,
    cacheTime: 5 * 60 * 1000,
  };

  const query = useQuery<T, Error, T, string[]>(options);

  useEffect(() => {
    const interval = setInterval(() => {
      query.refetch();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [query.refetch, refetchInterval]);

  return query;
}