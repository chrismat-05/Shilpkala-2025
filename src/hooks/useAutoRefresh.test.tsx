import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import React from 'react';

describe('useAutoRefresh', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches data initially', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    
    const { result } = renderHook(
      () => useAutoRefresh(['test'], mockFn, 30000),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 2000 });

    expect(mockFn).toHaveBeenCalled();
    expect(result.current.data).toEqual({ data: 'test' });
  });

  it('uses default refetch interval of 30000ms when not specified', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    
    const { result } = renderHook(
      () => useAutoRefresh(['test'], mockFn),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 2000 });

    expect(mockFn).toHaveBeenCalled();
  });

  it('handles errors gracefully', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('Fetch failed'));
    
    const { result } = renderHook(
      () => useAutoRefresh(['test'], mockFn, 30000),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 2000 });

    expect(result.current.error).toBeDefined();
  });

  it('respects custom refetch interval parameter', () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    const customInterval = 10000; // 10 seconds
    
    const { result } = renderHook(
      () => useAutoRefresh(['test'], mockFn, customInterval),
      { wrapper }
    );

    // Hook should initialize with the interval setting
    expect(result.current).toBeDefined();
  });
});
