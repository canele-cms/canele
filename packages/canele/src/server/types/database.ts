import type { Site } from "./schema.js";

export interface Database {
  getSiteByRoot: (root: string) => Promise<Site | undefined>;
  createSite: (data: { name: string; root: string }) => Promise<Site>;
}
