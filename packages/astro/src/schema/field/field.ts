import type { FieldText } from "./text";
import type { FieldBoolean } from "./boolean";

export type Field = FieldText | FieldBoolean;

export type Fields = ReturnType<typeof fields>;

export function fields<F extends Record<string, Field>>(options: F) {
  return options;
}

export type FieldType<T> = T extends "text" ? string : T extends "boolean" ? boolean : never;
