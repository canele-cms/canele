import { jsxSymbol } from "./jsx-runtime";

export function isJSXElement(value: unknown): value is JSX.Element {
  if (value && typeof value === "object" && "s" in value && value.s === jsxSymbol) {
    return true;
  }

  return false;
}
