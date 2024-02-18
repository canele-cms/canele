import { jsxSymbol } from "./jsx-runtime";

export function isJSXElement(value: object): value is JSX.Element {
  if ("s" in value && value.s === jsxSymbol) {
    return true;
  }

  return false;
}
