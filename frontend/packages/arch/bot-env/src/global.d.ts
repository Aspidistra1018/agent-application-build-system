// copy from @byted/uploader
type TUploaderRegion =
  | 'cn-north-1'
  | 'us-east-1'
  | 'ap-singapore-1'
  | 'us-east-red'
  | 'boe'
  | 'boei18n'
  | 'US-TTP'
  | 'gcp';

interface Window {
  gfdatav1?: {
    // deployment area
    region?: string;
    // SCM version
    ver?: number | string;
    // Current environment, the value is boe or prod
    env?: 'boe' | 'prod';
    // Environmental identification, such as prod or ppe_ *
    envName?: string;
    // The current small traffic channel ID, 0 represents full traffic
    canary?: 0;
    extra?: {
      /**
       * @Description The goofy team does not recommend relying on this field. If you can't use it, don't use it.
       * 1 means small traffic.
       * 3 means grey release
       * Null means full traffic
       */
      canaryType?: 1 | 3 | null;
    };
  };
}
