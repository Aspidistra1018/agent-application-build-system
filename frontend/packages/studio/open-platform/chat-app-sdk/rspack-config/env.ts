import {
  IS_RELEASE_VERSION,
  IS_DEV_MODE,
  NODE_ENV,
  REGION,
  IS_BOE,
  getEnvConfig,
  IS_OVERSEA,
  IS_OPEN_SOURCE,
} from './base';

export const openSdkDefineEnvs = {
  IS_BOE,
  IS_DEV_MODE,
  REGION: JSON.stringify(REGION),
  IS_RELEASE_VERSION,
  IS_OVERSEA,
  FEATURE_ENABLE_TEA_UG: false,
  IS_PROD: !IS_BOE,
  IS_OPEN_SOURCE,
};

const getUnPkgDirName = () => {
  if (IS_BOE) {
    return 'inhouse/boe';
  }

  let name = '';

  if (IS_RELEASE_VERSION) {
    switch (REGION) {
      case 'sg':
      case 'va':
        name = 'oversea';
        break;
      case 'cn':
        name = 'cn';
        break;
      default:
        name = '';
    }

    return `libs/${name}`;
  }

  return `inhouse/${REGION}`;
};
export const openSdkUnPkgDirName = getUnPkgDirName();

const slardarVaPath = '/maliva';
const slardarSgPath = '/sg';
export const openSdkSlardarRegion = getEnvConfig({
  cn: {
    boe: '',
    inhouse: '',
    release: '',
  },
  sg: {
    inhouse: slardarSgPath,
    release: slardarSgPath,
  },
  va: {
    release: slardarVaPath,
  },
});

console.debug(
  'open-sdk',
  NODE_ENV,
  '\nopenSdkDefineEnvs:',
  openSdkDefineEnvs,
  '\nopenSdkSlardarRegion:',
  openSdkSlardarRegion,
);
