# array-of-objects-utilities

[![NPM version](https://img.shields.io/npm/v/array-of-objects-utilities.svg)](https://www.npmjs.com/package/array-of-objects-utilities)
[![npm download](https://img.shields.io/npm/dm/array-of-objects-utilities.svg)](https://www.npmjs.com/package/array-of-objects-utilities)
[![test coverage](https://img.shields.io/codecov/c/github/cheminfo/array-of-objects-utilities.svg)](https://codecov.io/gh/cheminfo/array-of-objects-utilities)
[![license](https://img.shields.io/npm/l/array-of-objects-utilities.svg)](https://github.com/cheminfo/array-of-objects-utilities/blob/main/LICENSE)

Utilities to reduce depths of objects and convert to text.

## Installation

```console
npm install array-of-objects-utilities
```

## Usage

```js
import { flattenToJPaths, objectArrayToText } from 'array-of-objects-utilities';

const data = [
  {
    e: 5,
  },
  {
    a: {
      b: 'aB',
      c: 'cd',
    },
  },
  {
    a: {
      b: 'c',
      d: 4,
    },
  },
  2,
];

const flattened = flattenToJPaths(data, {
  modifiers: {
    'a.b': (value) => (typeof value === 'string' ? value.toUpperCase() : value),
  },
});

const text = objectArrayToText(flattened, {
  delimiter: ';',
  headerMapping: { '': 'root', 'a.b': 'AB field' },
});

console.log(text);
/*
e;AB field;a.c;a.d;root
5;;;;
;aB;cd;;
;c;;4;
;;;;2
*/
```

## License

[MIT](./LICENSE)
