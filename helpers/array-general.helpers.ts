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
