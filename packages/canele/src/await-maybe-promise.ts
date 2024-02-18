export async function awaitMaybePromise<T>(value: T): Promise<Awaited<T>> {
  if (value !== null && typeof value === "object" && "then" in value && typeof value?.then === "function") {
    return (await (value as unknown as Promise<T>)) as Awaited<T>;
  }

  return value as Awaited<T>;
}
