const kv = new Map<string, unknown>();

export const store = {
  get<T>(key: string) {
    return kv.get(key) as T | undefined;
  },
  set<T>(key: string, value: T) {
    kv.set(key, value);
  },
  delete(key: string) {
    kv.delete(key);
  },
};
