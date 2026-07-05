import classNames from 'classnames';
import { Image } from '@coze-arch/coze-design';

import EmptyImage from '../../../assets/image-empty.png';

import './index.less';

export interface SingleImageContentUIProps {
  thumbUrl: string;
  originalUrl: string;
  onClick?: (originUrl: string) => void;
  className?: string;
}

export const SingleImageContentUI: React.FC<SingleImageContentUIProps> = ({
  thumbUrl,
  originalUrl,
  onClick,
  className,
}) => (
  <div
    className={classNames(className, 'chat-uikit-single-image-content')}
    onClick={() => onClick?.(originalUrl)}
  >
    <Image
      src={thumbUrl || EmptyImage}
      className="chat-uikit-single-image-content__image"
      /**
       * The preview function that comes with the semi Image component is not used here. There are side effects in the incoming onImageClick callback that will pull the preview component
       */
      preview={false}
    />
  </div>
);

SingleImageContentUI.displayName = 'SingleImageContentUI';
