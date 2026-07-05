import { type IPlugin } from '@coze-arch/idl2ts-generator';

export interface ApiConfig {
  // IDL entrance
  entries: Record<string, string>;
  // IDL root directory
  idlRoot: string;
  // service alias
  // Custom API method
  commonCodePath: string;
  // API Product Catalog
  output: string;
  // Warehouse information settings
  repository?: {
    // Warehouse address
    url: string;
    // Clone to local location
    dest: string;
  };
  // plugin
  plugins?: IPlugin[];
  // aggregate exported filename
  aggregationExport?: string;
  // Format file
  formatter: (name: string, content: string) => string;
  idlFetchConfig?: {
    source: string;
    branch?: string;
    commit?: string;
    rootDir?: string;
  };
}

export interface ApiTypeConfig extends ApiConfig {
  // Methods that require filtering
  filters: Record<string, string[]>;
}
