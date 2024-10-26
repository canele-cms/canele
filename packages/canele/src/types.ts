export type CaneleRender = (ctx: CaneleContext) => JSX.Children;

export interface RouteExports {
  render?: CaneleRender;
}
