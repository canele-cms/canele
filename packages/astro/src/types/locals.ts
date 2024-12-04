import type { GitHub } from "arctic";
import type { GitHubStoreData } from "./github";

export interface CaneleLocals {
  editor?: boolean;
  github: {
    oauth: GitHub;
    data: Partial<GitHubStoreData>;
  };
}

declare global {
  namespace App {
    interface Locals {
      canele: CaneleLocals;
    }
  }
}
