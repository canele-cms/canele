import type { Store } from "../../types/impl";

export class StoreMemory implements Store {
  #store = new Map<string, unknown>();

  get<T>(key: string) {
    return this.#store.get(key) as T | undefined;
  }

  set<T>(key: string, value: T) {
    this.#store.set(key, value);
  }

  delete(key: string) {
    this.#store.delete(key);
  }
}
