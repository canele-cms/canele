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

export interface GithubOauthResponse {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface GitHubLoginResponse extends GithubOauthResponse {
  expires_at: number;
}
