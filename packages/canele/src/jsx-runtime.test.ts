import { test, expect } from "vitest";
import { Fragment, jsx, jsxDEV, jsxs, jsxSymbol } from "./jsx-runtime";

test("jsx-runtime jsx", () => {
  const result = jsx("div", { children: [] });
  expect(result).toEqual({ s: jsxSymbol, t: "div", p: { children: [] } } satisfies JSX.Element);
});

test("jsx-runtime jsxs", () => {
  const result = jsxs("div", { children: [] });
  expect(result).toEqual({ s: jsxSymbol, t: "div", p: { children: [] } } satisfies JSX.Element);
});

test("jsx-runtime jsxDEV", () => {
  const result = jsxDEV("div", { children: [] });
  expect(result).toEqual({ s: jsxSymbol, t: "div", p: { children: [] } } satisfies JSX.Element);
});

test("jsx-runtime Fragment", () => {
  const result = Fragment({ children: "test" });
  expect(result).toEqual("test");
});
