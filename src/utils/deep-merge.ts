function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  const result = { ...target };

  for (const source of sources) {
    if (!source) continue;

    for (const key of Object.keys(source) as Array<keyof T>) {
      const sourceVal = source[key];
      const targetVal = result[key];

      if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
        (result as Record<string, unknown>)[key as string] = deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>
        );
      } else if (sourceVal !== undefined) {
        (result as Record<string, unknown>)[key as string] = sourceVal;
      }
    }
  }

  return result;
}
