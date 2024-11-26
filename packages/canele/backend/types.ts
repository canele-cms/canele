export interface CaneleOptions {
  githubClientId: string;
  githubClientSecret: string;
}

export interface CaneleContext extends CaneleOptions {
  base: string;
  url: URL;
  request: Request;
}

export type Handler = (ctx: CaneleContext) => Response | Promise<Response>;
