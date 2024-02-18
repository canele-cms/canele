export {};

declare global {
  namespace JSX {
    type RenderContext = {};

    type Primitive = string | number | boolean | null | undefined;

    type ElementType = Exclude<keyof IntrinsicElements, number> | FC<Props>;

    type Props<P extends Record<string, any> = any> = P & { children?: Children };

    type Children = Primitive | Element | Array<Children> | Promise<Primitive | Element | Array<Children>>;

    type FC<P extends Props = Props> = (props: P, context: RenderContext) => Children;

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
