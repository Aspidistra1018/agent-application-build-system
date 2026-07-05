import { type MouseEvent } from 'react';

export interface FavoriteCommParams {
  topicId?: string;
  productId?: string;
  entityType?: number;
  isFavorite?: boolean;
  useButton?: boolean;
  entityId?: string;
  onClickBefore?: (
    action: 'cancel' | 'add',
    event?: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => boolean | Promise<boolean>;
  onChange?: (num) => void; // When the collection status really changes, call back
}

export interface FavoriteIconBtnProps extends FavoriteCommParams {
  onFavoriteStateChange?: (isFavorite: boolean) => void; // When the display state of the favorite icon changes, call back
  isVisible: boolean;
  onReportTea?: (action: 'cancel' | 'add') => void;
  unCollectedIconCls?: string;
  isMobile?: boolean;
  isForbiddenClick?: boolean;
  className?: string;
}
