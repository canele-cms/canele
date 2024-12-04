import type { JSX } from "astro/jsx-runtime";
import type { Fields, FieldType } from "./field/field";

export type Component = ReturnType<typeof component>;

export type ComponentProps<F extends Fields> = {
  [K in keyof F]: F[K]["required"] extends true ? FieldType<F[K]["type"]> : FieldType<F[K]["type"]> | undefined;
};

interface ComponentOptions<F extends Fields> {
  fields: F;
}

export function component<F extends Fields, P extends ComponentProps<F>>(
  render: (props: P) => JSX.Children,
  options: ComponentOptions<F>,
) {
  return {
    render,
    ...options,
  } as const;
}
