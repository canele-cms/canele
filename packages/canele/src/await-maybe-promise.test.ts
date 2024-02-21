import { test, expect } from "vitest";
import { awaitMaybePromise } from "./await-maybe-promise";

const wait: Promise<number> = new Promise((resolve) => resolve(10));

test("await-maybe-promise", async () => {
  expect(await awaitMaybePromise(wait)).toBe(10);
  expect(await awaitMaybePromise("test")).toBe("test");
});
