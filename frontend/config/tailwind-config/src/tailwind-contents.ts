import path from 'path';

import {
  lookupSubPackages,
  getPackageLocation,
  getPackageJson,
} from '@coze-arch/monorepo-kits';

export const getTailwindContents = (projectRoot: string) => {
  if (!projectRoot) {
    throw new Error('projectRoot is required');
  }
  const contents = [path.resolve(__dirname, '../src/**/*.{tsx,ts}')];

  const subPackages = lookupSubPackages(projectRoot);
  const packageLocations = subPackages
    .filter(p => {
      const packageJson = getPackageJson(p);
      const deps = [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ];
      return deps.includes('react');
    })
    .map(getPackageLocation);
  contents.push(
    ...packageLocations
      .filter(r => !!r)
      .map(location => path.resolve(location, 'src/**/*.{ts,tsx}')),
  );

  // Compatible with coze-design internal tailwind style
  contents.push('./node_modules/@coze-arch/coze-design/**/*.{js,jsx}');

  return contents;
};
