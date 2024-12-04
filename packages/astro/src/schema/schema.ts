import type { Component } from "./component";

export * from "./field/text";
export * from "./field/field";
export * from "./field/boolean";

export * from "./component";
export * from "./template";

export type Schema = ReturnType<typeof schema>;

export function schema<T extends Record<string, Component>>(components: T) {
  return {
    components,
  } as const;
}
