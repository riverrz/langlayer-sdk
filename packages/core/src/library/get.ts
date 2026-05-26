type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : undefined
  : P extends keyof T
    ? T[P]
    : undefined;

export function get<T, P extends string>(obj: T, path: P): PathValue<T, P>;

export function get<T, P extends string, D>(
  obj: T,
  path: P,
  defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D;

export function get<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  defaultValue?: unknown,
): unknown {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);

  return result === undefined ? defaultValue : result;
}
