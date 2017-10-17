import 'jest';
import { flatten } from '../src/flatten';

describe('flatten', () => {
  it('works with empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('works properly', () => {
    expect(flatten([ [ 10, 20 ], [ 30, 40 ] ])).toEqual([ 10, 20, 30, 40 ]);
  });
});
