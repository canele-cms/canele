import { nanoquery } from "@nanostores/query";

const [createFetcherStore] = nanoquery({
  fetcher: (...keys) => fetch(`/canele${keys.join("")}`).then((r) => r.json()),
});

export const $githubTree = createFetcherStore(["/github/api/tree/main"]);
