import 'jest';
import { resolveNpmPackageName } from '../src/resolveNpmPackageName';

describe('resolveNpmPackageName', () => {
  it('resolves empty string as null', () => {
    expect(resolveNpmPackageName('')).toEqual(null);
  });

  it('resolves unscoped package without version', () => {
    expect(resolveNpmPackageName('react')).toEqual({
      signature: 'react',
      fullName: 'react',
      name: 'react',
      rawScope: undefined,
      scope: undefined,
      rawVersion: undefined,
      version: undefined
    });
  });

  it('resolves scoped package without version', () => {
    expect(resolveNpmPackageName('@types/react')).toEqual({
      signature: '@types/react',
      fullName: '@types/react',
      name: 'react',
      rawScope: '@types/',
      scope: 'types',
      rawVersion: undefined,
      version: undefined
    });
  });

  it('resolves unscoped package with exact version', () => {
    expect(resolveNpmPackageName('react@1.0.0')).toEqual({
      signature: 'react@1.0.0',
      fullName: 'react',
      name: 'react',
      rawScope: undefined,
      scope: undefined,
      rawVersion: '@1.0.0',
      version: '1.0.0'
    });
  });

  it('resolves unscoped package with tag', () => {
    expect(resolveNpmPackageName('react@latest')).toEqual({
      signature: 'react@latest',
      fullName: 'react',
      name: 'react',
      rawScope: undefined,
      scope: undefined,
      rawVersion: '@latest',
      version: 'latest'
    });
  });

  it('resolves scoped package with exact version', () => {
    expect(resolveNpmPackageName('@types/react@1.0.0')).toEqual({
      signature: '@types/react@1.0.0',
      fullName: '@types/react',
      name: 'react',
      rawScope: '@types/',
      scope: 'types',
      rawVersion: '@1.0.0',
      version: '1.0.0'
    });
  });

  it('resolves scoped package with tag', () => {
    expect(resolveNpmPackageName('@types/react@latest')).toEqual({
      signature: '@types/react@latest',
      fullName: '@types/react',
      name: 'react',
      rawScope: '@types/',
      scope: 'types',
      rawVersion: '@latest',
      version: 'latest'
    });
  });

  it('resolves package with strange chars', () => {
    expect(resolveNpmPackageName('re.a-ct')).toEqual({
      signature: 're.a-ct',
      fullName: 're.a-ct',
      name: 're.a-ct',
      rawScope: undefined,
      scope: undefined,
      rawVersion: undefined,
      version: undefined
    });
  });

  it('resolves package scope with strange chars', () => {
    expect(resolveNpmPackageName('@ty-pes/react')).toEqual({
      signature: '@ty-pes/react',
      fullName: '@ty-pes/react',
      name: 'react',
      rawScope: '@ty-pes/',
      scope: 'ty-pes',
      rawVersion: undefined,
      version: undefined
    });
  });
});
