import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useAutoRefresh<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  refetchInterval = 30000
) {
  const query = useQuery({
    queryKey,
    queryFn,
    refetchInterval,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  useEffect(() => {
    // Start auto-refresh on mount
    const interval = setInterval(() => {
      query.refetch();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [query.refetch, refetchInterval]);

  return query;
}