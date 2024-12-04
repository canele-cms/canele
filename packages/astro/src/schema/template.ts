import type { Component } from "./component";
import Layout, { type LayoutComponent } from "../components/layout.astro";

export type Template = ReturnType<typeof template>;

type Components = ReturnType<typeof components>;

export function components<T extends Record<string, Component>>(options: T) {
  return options;
}

interface TemplateOptions {
  layout?: LayoutComponent;
  header?: Component;
  components: Components;
}

export function template<T extends TemplateOptions, C extends Record<string, Component>>(options: T, components: C) {
  return {
    layout: (options.layout || Layout) as LayoutComponent,
    header: options.header,
    components,
  } as const;
}
