import type { Tree } from "@canele-cms/astro/types/api";
import { useFetch } from "./use-fetch";

export function useBranchContentsTree(branch: string) {
  const res = useTree(branch);
  return useTree(res.data?.tree.find((node) => node.path === "content")?.sha);
}

export function useTree(sha: string | null | undefined, lazy?: boolean) {
  return useFetch<Tree>(sha ? { url: `/canele/api/tree?sha=${sha}` } : null, lazy);
}
