/// <reference types="vite/client" />

// import { RouteExports } from "./types";

main();

export async function main() {
  const routes = import.meta.glob("../../src/routes/**/*") as Record<string, any>;

  console.log({ routes });

  for (const [name, importRoute] of Object.entries(routes)) {
    const modules = await importRoute();

    console.log(name, modules);

    console.log(modules.render?.({ test: true }));
  }
}
