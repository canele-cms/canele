export declare namespace JSX {
  export type Children = null | undefined | boolean | string | number | Element | Children[];

  export type Type = string | FC;

  export type Props = Record<string, any>;

  export type FC<P = Props> = (props: P) => Children | Promise<Children>;

  export type ElementType = FC | keyof IntrinsicElements;

  export type Element = { __t: 0; t: Type; p: Props };

  export interface IntrinsicAttributes {
    "x-data"?: Record<string | number, unknown>;
    "x-text"?: () => string | number;
  }

  export interface IntrinsicElements {
    [tagName: string]: Props;
  }
}

export let jsx = (t: JSX.Type, p: JSX.Props): JSX.Element => ({ __t: 0, t, p });

export { jsx as jsxs, jsx as jsxDEV };

export let Fragment = (props: JSX.Props) => props?.children;
