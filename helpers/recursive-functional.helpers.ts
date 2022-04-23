/*
Note:

These are not essential to everyday code, but help enforce a functional-mindset.

Exercise caution when using these functions on large arrays of items;

 */

const concatArrays = <T>(a1: T[], a2: T[]): T[] => a1.concat(a2);
const lengthOf = <T>(array: T[] = []): number => array.length;
const headOf = <T>(array: T[]): T => array[0];
const tailOf = <T>(array: T[]): T[] => array.slice(1);

type PredicateFn<T> = (el: T) => boolean;

export const filter = <T>(predicate: PredicateFn<T>, array: T[]): T[] => {
  if (lengthOf(array) === 0) return [];

  const firstItem = headOf(array);
  const filtered = predicate(firstItem) ? [firstItem] : [];
  const rest = filter(predicate, tailOf(array));

  return concatArrays(filtered, rest);
};

type MapFn<T, U> = (el: T) => U;

export const map = <T, U>(fn: MapFn<T, U>, array: T[]): U[] => {
  if (lengthOf(array) === 0) return [];

  const mapped = fn(headOf(array));
  const rest = map(fn, tailOf(array));

  return concatArrays([mapped], rest);
};

type ReduceFn<T, U> = (result: T, element: U) => T;

export const reduce = <T, U>(
  fn: ReduceFn<T, U>,
  initialValue: T,
  array: U[]
): T => {
  if (lengthOf(array) === 0) return initialValue;

  const newValue = fn(initialValue, headOf(array));

  return reduce(fn, newValue, tailOf(array));
};
