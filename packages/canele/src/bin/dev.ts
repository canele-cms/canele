#!/usr/bin/env node

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import { ViteNodeServer } from "vite-node/server";
import { ViteNodeRunner } from "vite-node/client";
import { installSourcemapsSupport } from "vite-node/source-map";

const __dirname = dirname(fileURLToPath(import.meta.url));

dev();

async function dev() {
  const server = await createServer({
    optimizeDeps: {
      include: [],
      noDiscovery: true,
    },
  });

  await server.pluginContainer.buildStart({});

  const node = new ViteNodeServer(server);

  installSourcemapsSupport({
    getSourceMap: (source) => node.getSourceMap(source),
  });

  const runner = new ViteNodeRunner({
    root: server.config.root,
    base: server.config.base,
    fetchModule(id) {
      return node.fetchModule(id);
    },
    resolveId(id, importer) {
      return node.resolveId(id, importer);
    },
  });

  const index = join(__dirname, "../index.js");

  console.log("executing", index);

  await runner.executeFile(index);

  await server.close();
}
