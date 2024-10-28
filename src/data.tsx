import { jsx, type JSX } from "./jsx-runtime";

export interface DataProps<D> {
  as: string;
  data: D;
  children: (keys: Record<keyof D, string>) => JSX.Children;
}

export function Data<D extends Record<string | number, unknown>>({ as, data, children }: DataProps<D>) {
  let x = "{";

  for (const [key, value] of Object.entries(data)) {
    let string = typeof value === "string";
    x += ` ${key}: ${string ? `"${value}"` : value}`;
  }

  x += " }";

  let keys: Record<string, string> = {};

  Object.keys(data).forEach((key) => (keys[key] = key));

  return jsx(as, { "x-data": x, children: children(keys as Record<keyof D, string>) });
}
