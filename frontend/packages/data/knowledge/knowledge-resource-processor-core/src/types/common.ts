import {
  type UpdateType,
  type DocumentStatus,
  type Int64,
  type WebStatus,
  type DocumentProgress,
} from '@coze-arch/bot-api/knowledge';

import type { FileNodeType, EntityStatus, UploadStatus } from '../constants';

interface CommonUnitItem {
  key?: string;
  percent: number | undefined;
  status: UploadStatus | WebStatus | EntityStatus;
  type: string; // Unit type, url, doc, pdf, etc
  uri: string; // The relative path of the file on tos url | web_url
  url: string; // Absolute URL of the file
  name: string; // unit name｜webpage title
  validateMessage?: string;
  // External incoming dynamic errorMessage
  dynamicErrorMessage?: string;
}

interface DocUnitItem {
  size?: string; // file size
  docId?: string; // Document ID, used when updating content
  fileInstance?: File | undefined;
  uid?: string;
}
interface URLUnitItem {
  updateInterval?: number; // URL usage, update frequency
  subpagesCount?: number;
  updateType?: UpdateType;
  webID?: string;
  statusDescript?: string;
  manualCrawlingConfig?: {
    response: {
      title: string;
      url: string;
      recordType: 'text' | 'list';
      result: {
        key: string;
        name: string;
        data: string | string[];
        xPath: string;
        type: 'text' | 'image' | 'link';

        /**
         * FIXME: The data structure cannot be modified for compatibility, so the following three parameters will be included in the depth acquisition
         */
        parentKey?: string;
        titles?: string[];
        urls?: string[];
      }[];
    };
    /**
     * If it is a deep capture document, there is a value corresponding to the key of the parent document column.
     */
    fromParentUnitColumnKey?: string;
  };
  manualCrawlingTableContent?: Record<string, string>[];
}

/**
 * Three-way data connector task
 */
interface EntityUnitItem {
  file_name?: string;
  file_id?: string;
  entity_id?: string;
  tos_url?: string;
  error_msg?: string;
  file_node_type?: FileNodeType;
  has_children_nodes?: boolean;
  error_code?: Int64;
  file_size?: string;
  instance_id?: string;
  tos_key?: string;
}

// There is a problem with the implementation of TODO UnitItem, which needs to be optimized.
/** Except for UnitItem, nothing else is used externally, so it will not be exported for the time being.*/
export type UnitItem = CommonUnitItem &
  DocUnitItem &
  URLUnitItem &
  EntityUnitItem;

export interface ProgressItem extends DocumentProgress {
  documentId: string | undefined;
  progress: number;
  uri: string;
  name: string;
  status: DocumentStatus;
  statusDesc: string;
  remainingTime: number;
}
