import { test, expect } from "vitest";
import { Fragment, jsx } from "./jsx-runtime";
import { renderToString } from "./render-to-string";

type Props = { title: string; count: number };

const TestAsyncComponent: JSX.FC<Props> = async ({ title, count }) => {
  return jsx("div", { children: [title, count] });
};

const TestComponent: JSX.FC = () => {
  return jsx("html", {
    children: [
      jsx("div", { children: "test", className: "txt-small" }),
      jsx(Fragment, { children: "hello world" }),
      jsx(TestAsyncComponent, { title: "props", count: 10 } satisfies Props),
    ],
  });
};

test("render", async () => {
  const result = await renderToString(TestComponent({}, {}), {});

  expect(result).toBe(`<html><div class="txt-small">test</div>hello world<div>props10</div></html>`);
});
