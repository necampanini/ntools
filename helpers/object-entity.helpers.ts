import { reduce } from './recursive-functional.helpers';

export const isAnObject = (val: any): boolean => {
  const isObject = typeof val === 'object';
  const isNotArray = !Array.isArray(val);
  const isNotNull = val !== null;

  return isObject && isNotArray && isNotNull;
};

export const isArray = (val: any): boolean => {
  const isNotNull = val !== null;
  const isArray = Array.isArray(val);

  return isNotNull && isArray;
};

export const keysFrom = <T, K extends keyof T>(obj: T): K[] =>
  Object.keys(obj) as K[];

export const createOmittedFrom = <T, K extends keyof T, R>(
  source: T,
  omitted: K[],
  target: R
): R => {
  const reduceFn = (result: R, key: K) =>
    omitted.indexOf(key) !== -1
      ? result
      : {
          ...result,
          [key]: source[key],
        };

  return reduce(reduceFn, target, keysFrom(source));
};

export const createPickedFrom = <T, K extends keyof T, R>(
  source: T,
  picked: K[],
  target: R
): R => {
  const reduceFn = (result: R, key: K) =>
    picked.indexOf(key) === -1
      ? {
          ...result,
          [key]: source[key],
        }
      : result;

  return reduce(reduceFn, target, keysFrom(source));
};
