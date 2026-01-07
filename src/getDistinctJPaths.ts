import type { GetJPathsOptions } from 'get-jpaths';
import { getJPaths } from 'get-jpaths';

/**
 * When given an array of objects, it returns the distinct JSON paths found in the objects.
 * For example if you have an array of objects like:
 * [{ a: { b: 'ab', c: 'cd' }, d: 4 }, { e: 5 }]
 * It will return:
 * ['a.b', 'a.c', 'd', 'e']
 * @param data - array of objects
 * @param options - options to get jpaths
 * @returns Array of distinct JSON paths
 */
export function getDistinctJPaths(
  data: unknown[],
  options: GetJPathsOptions = {},
): string[] {
  const jPathSet = new Set<string>();
  for (const item of data) {
    const jpaths = getJPaths(item, options);
    for (const jpath of jpaths) {
      jPathSet.add(jpath.jpath);
    }
  }
  return Array.from(jPathSet);
}
