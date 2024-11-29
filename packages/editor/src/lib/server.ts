import { nanoquery } from "@nanostores/query";

const [createFetcherStore] = nanoquery({
  fetcher: async (...keys) => {
    const res = await fetch("/canele" + keys.join(""));
    return await res.json();
  },
});

export const $github = createFetcherStore(["/github/api"]);
