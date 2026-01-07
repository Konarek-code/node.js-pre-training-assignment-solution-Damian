/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

// JS-TS/solutions/array-helpers.ts

function assertSource<T>(source: readonly T[]): void {
  if (source == null) {
    throw new TypeError("Source array must not be null or undefined");
  }
}

export function mapArray<T, R>(
  source: readonly T[],
  mapper: (item: T, index: number) => R
): R[] {
  assertSource(source);

  const result: R[] = [];
  let index = 0;

  for (const item of source) {
    result.push(mapper(item, index));
    index++;
  }

  return result;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  assertSource(source);

  const result: T[] = [];
  let index = 0;

  for (const item of source) {
    if (predicate(item, index)) {
      result.push(item);
    }
    index++;
  }

  return result;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R
): R {
  assertSource(source);

  let accumulator = initial;
  let index = 0;

  for (const item of source) {
    accumulator = reducer(accumulator, item, index);
    index++;
  }

  return accumulator;
}

export function partition<T>(
  source: readonly T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  assertSource(source);

  const pass: T[] = [];
  const fail: T[] = [];

  for (const item of source) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }

  return [pass, fail];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  assertSource(source);

  const result = {} as Record<K, T[]>;

  for (const item of source) {
    const key = keySelector(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}
