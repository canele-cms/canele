export type FieldText = ReturnType<typeof text>;

interface TextOptions {
  default?: string;
  required?: boolean;
}

export function text<T extends TextOptions>(options: T = {} as T) {
  return {
    type: "text",
    ...options,
  } as const;
}
