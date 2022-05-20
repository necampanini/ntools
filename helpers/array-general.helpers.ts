/**
 * Helper function to mimic C#'s 'Enumerable.Range(x,y)'
 * Returns a plain array of number values from 0...range.
 *
 * Ex: rangeOf(4) => [0, 1, 2, 3]
 *
 * Update: added that must be a positive, non-zero integer
 */
export const rangeOf = (range: number): number[] => {
  if (range <= 0) throw Error("'range' must be a positive, non-zero integer")
  if(!Number.isInteger(range)) throw Error("'range' must be an integer")

  return [...Array(range).keys()];
}

/**
 * A way of grouping array filter results based on a predicate in a
 * non-mutable pattern.
 *
 * Ex: dev wants to keep all the values of an array, but move those
 * that pass a predicate to the front.
 * @param arr
 * @param predicate
 */
export const partition = <T>(arr: T[], predicate: (x: T) => boolean): [T[], T[]] => {
  const parts = [[], []] as [T[], T[]];
  for (const x of arr) parts[predicate(x) ? 0 : 1].push(x);
  return parts;
}

/**
 * Pass an array and a property to sort by.
 *
 * Currently, only works on non-nested object graphs
 * @param arr
 * @param prop
 * @param descending
 */
export const sortBy = <T, K extends keyof T>(arr: T[], prop: K, descending: boolean = false): T[] => {
  const [x, y] = descending ? [-1, 1] : [1, -1]
  return [...arr].sort((a, b) => (a[prop] > b[prop] ? x : y))
}

/**
 * For use with arrays of conditions with '.some' and '.every'
 *
 * example:
 *
 * const allConditionsMet = [
 *  1 == 1,
 *  obj.id == target.id,
 *  obj.price > == target.price
 * ].every(PredicatePasses)
 *
 * const atLeastOneConditionFails = [
 *  1 === 2,
 *  'ex' == 'ex'
 * ].some(PredicateFails)
 *
 * @param x
 * @constructor
 */
export const PredicatePasses = (x: boolean) => x;
export const PredicateFails = (x: boolean) => !x
