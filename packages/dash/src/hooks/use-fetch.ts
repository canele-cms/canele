import { usePromise } from "./use-promise";

interface UseFetchProps extends RequestInit {
  url: string | URL;
  responseType?: "text" | "json";
}

export function useFetch<T>(props: UseFetchProps | null | undefined, lazy?: boolean) {
  return usePromise(async () => {
    if (!props) return;

    const res = await fetch(props.url, props);

    if (props.responseType === "text") {
      return (await res.text()) as T;
    }

    return (await res.json()) as T;
  }, lazy);
}
