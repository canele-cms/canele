export interface Store<K = string> {
  get<T>(key: K): Promise<T | undefined> | T | undefined;
  set<T>(key: K, value: T): Promise<void> | void;
  delete(key: K): Promise<void> | void;
}
