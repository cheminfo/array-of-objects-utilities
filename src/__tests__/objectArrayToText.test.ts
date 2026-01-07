import { Molecule } from 'openchemlib';
import { expect, test } from 'vitest';

import { flattenToJPaths, objectArrayToText } from '../index.ts';

import full from './data/full.json' with { type: 'json' };
import small from './data/small.json' with { type: 'json' };

test('small example', async () => {
  const flattened = flattenToJPaths(small, {
    modifiers: {
      'a.b': (value) =>
        typeof value === 'string' ? value.toUpperCase() : value,
    },
  });

  const text = objectArrayToText(flattened, {
    delimiter: ';',
    headerMapping: { '': 'root', 'a.b': 'AB field' },
  });

  expect(text).toBe(`e;AB field;a.c;a.d;root
5;;;;
;AB;cd;;
;C;;4;
;;;;2
`);
});

test('full example', async () => {
  const result = flattenToJPaths(full, {
    excludeJPathRegexps: [/^mfInfo.atoms/, /^link/],
    modifiers: {
      'data.noStereoOCL': (value) => {
        if (typeof value !== 'object' || value === null) return '';
        if (!('idCode' in value) || !('coordinates' in value)) return '';
        const molecule = Molecule.fromIDCode(
          value.idCode as string,
          value.coordinates as string,
        );
        return molecule.toIsomericSmiles();
      },
      'data.bioassay': (value) =>
        Array.isArray(value) ? value.join(', ') : value,
      'data.against': (value) =>
        Array.isArray(value) ? value.join(', ') : value,
      'data.mesh': (value) => (Array.isArray(value) ? value.join(', ') : value),
      'data.taxonomy': (value) =>
        Array.isArray(value) ? value.join(', ') : value,
    },
  });

  expect(result).toMatchSnapshot();
});
