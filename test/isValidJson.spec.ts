import 'jest';
import { isValidJson } from '../src/isValidJson';

describe('isValidJson', () => {
  it('returns false if got empty string and not indulgent', () => {
    expect(isValidJson('')).toEqual(false);
  });

  it('returns true if got empty string and indulgent', () => {
    expect(isValidJson('', true)).toEqual(true);
  });

  it('returns false if got invalid json', () => {
    expect(isValidJson('{"a: 1}')).toEqual(false);
  });

  it('returns true if got valid json', () => {
    expect(isValidJson('{"a": 1}')).toEqual(true);
  });
});
