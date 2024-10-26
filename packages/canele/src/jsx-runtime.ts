const jsxSymbol = Symbol("jsx-symbol");

const jsx = (t: JSX.ElementType, p: JSX.Props): JSX.Element => ({ s: jsxSymbol, t, p });

const Fragment = (p?: { children?: JSX.Children }): JSX.Children => p?.children;

export { jsx as jsxs, jsx as jsxDEV, jsxSymbol, Fragment };

declare global {
  interface CaneleContext {}

  namespace JSX {
    type Primitive = string | number | boolean | null | undefined;

    type ElementType = Exclude<keyof IntrinsicElements, number> | FC<Props>;

    type Props<P extends Record<string, any> = any> = P & { children?: Children };

    type Children = Primitive | Element | Array<Children> | Promise<Primitive | Element | Array<Children>>;

    type FC<P extends Props = Props> = (props: P, context: CaneleContext) => Children;

    interface Element {
      s: Symbol;
      t: ElementType;
      p: Props;
    }

    interface IntrinsicElements extends Record<string, any> {
      [name: string]: any;
    }
  }
}
