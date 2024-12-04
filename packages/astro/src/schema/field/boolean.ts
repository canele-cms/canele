export type FieldBoolean = ReturnType<typeof boolean>;

interface BooleanOptions {
  default?: boolean;
  required?: boolean;
}

export function boolean<T extends BooleanOptions>(options: T = {} as T) {
  return {
    type: "boolean",
    ...options,
  } as const;
}
