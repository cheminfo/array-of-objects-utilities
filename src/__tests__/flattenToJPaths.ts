import { expect, test } from 'vitest';

import { flattenToJPaths } from '../index.ts';

import data from './data/small.json' with { type: 'json' };

test('flattenToJPaths', async () => {
  const options = {
    modifiers: {
      'a.b': (value: unknown) =>
        typeof value === 'string' ? value.toUpperCase() : value,
    },
  };

  const results = flattenToJPaths(data, options);

  expect(results).toStrictEqual([
    { e: 5 },
    { 'a.b': 'AB', 'a.c': 'cd' },
    { 'a.b': 'C', 'a.d': 4 },
    { '': 2 },
  ]);
});
