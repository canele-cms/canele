import { test, expect } from "vitest";
import { jsx } from "./jsx-runtime";
import { isJSXElement } from "./is-jsx-element";

const wrongSymbol = Symbol("test");

test("is-jsx-element", () => {
  const invalid = { s: wrongSymbol, t: "div", p: {} };
  expect(isJSXElement(invalid)).toBe(false);

  const valid = jsx("div", {});
  expect(isJSXElement(valid)).toBe(true);
});
