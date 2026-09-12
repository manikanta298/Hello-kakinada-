import { useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

/**
 * Runs `fetcher` whenever `deps` change, tracking loading state and
 * guarding against setting state after the effect has been cleaned up
 * (e.g. the component unmounted or the deps changed again before the
 * previous call resolved). This is the exact pattern every screen in
 * this app was hand-rolling with useEffect + a `cancelled` flag.
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: true,
    error: null,
  });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true }));

    fetcher()
      .then((data) => {
        if (cancelled) return;
        setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ data: undefined, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // deps is caller-controlled, same contract as a manual useEffect dep array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { ...state, refetch };
}
