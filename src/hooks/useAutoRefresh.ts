import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useAutoRefresh<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  refetchInterval = 30000
): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    refetchInterval,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}