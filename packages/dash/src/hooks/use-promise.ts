import { useState, useEffect, useCallback } from "preact/hooks";

// biome-ignore lint/suspicious/noExplicitAny: any
export function usePromise<F extends () => any>(fn: F | null | undefined, lazy?: boolean) {
  const [data, setData] = useState<Awaited<ReturnType<F>>>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    if (!fn) return;

    setLoading(true);

    try {
      setData(await fn());
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [fn]);

  useEffect(() => {
    if (fn && !lazy && loading === false) {
      execute();
    }
  }, [fn, lazy, loading, execute]);

  return { data, error, loading, execute };
}
