import type { APIRoute } from "astro";

const glob = import.meta.glob("../../api/**/*.ts", { eager: true });

interface RouteModules {
  GET?: APIRoute;
  POST?: APIRoute;
}

const routes: Record<string, RouteModules> = {};

for (const [name, mod] of Object.entries(glob)) {
  const path = name.replace("../../api/", "").replace(".ts", "");
  routes[path] = mod as RouteModules;
}

export const GET: APIRoute<Record<string, unknown>, { path: string }> = async (ctx) => {
  const route = routes[ctx.params.path];
  if (route?.GET) return route.GET(ctx);
  return new Response(null, { status: 404 });
};

export const POST: APIRoute<Record<string, unknown>, { path: string }> = async (ctx) => {
  const route = routes[ctx.params.path];
  if (route?.POST) return route.POST(ctx);
  return new Response(null, { status: 404 });
};
