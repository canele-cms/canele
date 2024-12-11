import { publicProcedure } from "../trpc.js";

export const healthcheck = publicProcedure.query(() => ({ ok: true }));
