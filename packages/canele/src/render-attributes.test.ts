import { test, expect } from "vitest";
import { renderAttributes } from "./render-attributes";
import { jsx } from "./jsx-runtime";

test("render-attributes", () => {
  const result = renderAttributes(
    jsx("div", { className: [["test", "second", null, undefined, true, false, { v: {} }, ["end"]]], children: "hello" })
  );

  expect(result).toEqual(` class="test second true end"`);
});
