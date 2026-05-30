export class Cache {
  private store = new Map<string, unknown>();

  get<T>(key: string): T | undefined {
    return this.store.get(key) as T;
  }

  set(key: string, value: unknown) {
    this.store.set(key, value);
  }

  has(key: string) {
    return this.store.has(key);
  }

  clear() {
    this.store.clear();
  }
}
