import { expect, test } from 'vitest';

import { getDistinctJPaths } from '../index.js';

import small from './data/small.json' with { type: 'json' };

test('small example', async () => {
  const result = getDistinctJPaths(small);

  expect(result).toStrictEqual(['e', 'a.b', 'a.c', 'a.d', '']);
});
