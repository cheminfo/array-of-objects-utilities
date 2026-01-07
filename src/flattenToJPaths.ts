import type { GetJPathsOptions } from 'get-jpaths';
import { getJPathsAsObject } from 'get-jpaths';

/**
 * When given an array of objects, it flattens each object to its JSON paths representation.
 * For example if you have an array of objects like:
 * [{ a: { b: 'ab', c: 'cd' }, d: 4 }, { e: 5 }]
 * It will return:
 * [{ 'a.b': 'ab', 'a.c': 'cd', 'd': 4 }, { 'e': 5 }]
 * Numerous options allows to select jPaths and modify values.
 * @param data - Array of objects to flatten
 * @param options - Options to customize the flattening process based on the get-jpaths library
 * @returns Array of flattened objects
 */
export function flattenToJPaths(
  data: unknown[],
  options: GetJPathsOptions = {},
): Array<Record<string, string | number | boolean>> {
  const results = [];
  for (const item of data) {
    results.push(getJPathsAsObject(item, options));
  }
  return results;
}
