export const fullPackageName = /^((@([^@]+)\/)?([^@]+))(@(.*))?$/;

export type PackageSignature = {
  signature?: string;
  fullName?: string;
  rawScope?: string;
  scope?: string;
  name?: string;
  rawVersion?: string;
  version?: string;
};

export const resolveNpmPackageName = (sign: string): PackageSignature => {
  if (!fullPackageName.test(sign)) {
    return null;
  } else {
    const [ signature, fullName, rawScope, scope, name, rawVersion, version ] = fullPackageName.exec(sign);
    return { signature, fullName, rawScope, scope, name, rawVersion, version };
  }
};
