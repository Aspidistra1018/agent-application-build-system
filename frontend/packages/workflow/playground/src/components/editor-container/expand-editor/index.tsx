import type { FC } from 'react';

import classNames from 'classnames';
import { I18n } from '@coze-arch/i18n';
import { IconCozSideCollapse } from '@coze-arch/coze-design/icons';
import { IconButton, Tooltip } from '@coze-arch/coze-design';
import { IconInfo } from '@coze-arch/bot-icons';

import styles from './index.module.less';

interface ExpandEditorContainerProps {
  id: string;
  onClose?: () => void;
  editorTitle?: React.ReactNode;
  editorTooltip?: string;
  actions?: React.ReactNode[];
  closeButton?: React.ReactNode;
  closeIconClassName?: string;
  editorContent?: React.ReactNode;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

/**
 * pop-up editor container
 * @param editorTitle popup title
 * @param editorTooltip pop-up description
 * @param actions title toolbar
 * @param closeButton Custom close button
 * @param closeIconClassName Close button style
 * @param editorContent pop-up editor area
 * @param containerClassName Container style
 * @param headerClassName title style
 * @param contentClassName editor area style
 */
export const ExpandEditorContainer: FC<ExpandEditorContainerProps> = props => {
  const {
    id,
    onClose,
    closeButton,
    editorTitle,
    editorTooltip,
    actions,
    editorContent,
    containerClassName,
    headerClassName,
    contentClassName,
    closeIconClassName,
  } = props;

  return (
    <div key={id} className={classNames(styles.container, containerClassName)}>
      <div className={classNames(headerClassName, styles.header)}>
        <span className={styles.leftSide}>
          {editorTitle}
          {editorTooltip ? (
            <span>
              <Tooltip
                className={styles.tip}
                position="bottom"
                content={editorTooltip}
              >
                <IconInfo className={styles.info} />
              </Tooltip>
            </span>
          ) : null}
        </span>
        <span className={styles.rightSide}>
          {actions?.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
          {closeButton ?? (
            <Tooltip content={I18n.t('node_http_json_collapse')}>
              <span>
                <IconButton
                  icon={
                    <IconCozSideCollapse
                      fontSize={18}
                      className={classNames(
                        closeIconClassName,
                        styles.iconLight,
                      )}
                    />
                  }
                  size="small"
                  color="secondary"
                  aria-label="close"
                  onClick={() => onClose?.()}
                />
              </span>
            </Tooltip>
          )}
        </span>
      </div>
      <div className={classNames(contentClassName, styles.content)}>
        {editorContent}
      </div>
    </div>
  );
};
