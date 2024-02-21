import type { PluginOption } from "vite";

export function canele(): PluginOption & { name: string } {
  return {
    name: "vite-plugin-canele",
    enforce: "pre",
  };
}
