import React, { useState, useCallback, useEffect, useRef } from 'react';

import { I18n } from '@coze-arch/i18n';
import { Modal } from '@coze-arch/coze-design';
import {
  useIDEService,
  WindowService,
  ViewService,
  ModalService,
  ModalType,
  type CustomTitleType,
} from '@coze-project-ide/framework';

import styles from './styles.module.less';

export const CloseConfirmModal = () => {
  const modalService = useIDEService<ModalService>(ModalService);
  const windowService = useIDEService<WindowService>(WindowService);
  const viewService = useIDEService<ViewService>(ViewService);

  const currentTitlesRef = useRef<CustomTitleType[]>();

  const [visible, setVisible] = useState(false);
  const handleOk = useCallback(() => {
    (currentTitlesRef.current || []).forEach(title => {
      title?.owner?.close();
    });
    setVisible(false);
  }, []);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    // Dispose listening in the browser dimension
    const chromeDispose = windowService.onBeforeUnload(e => {
      // route judgment
      const titles = viewService.getOpenTitles();
      const hasUnsaved = titles.some(title => title.saving);

      // When there are unsaved items, they need to be blocked
      if (hasUnsaved) {
        // Open the pop-up window that prevents closing before each browser is closed.
        // Compatible with the behavior of different browsers
        e.preventDefault();
        e.stopPropagation();
        e.returnValue = '';
        return '';
      }
    });
    // Dispose monitoring of the resource dimension
    const resourceDisposable = modalService.onModalVisibleChange(opt => {
      const { type, options, visible: vis = true } = opt;
      if (type === ModalType.CLOSE_CONFIRM) {
        setVisible(Boolean(vis));
        currentTitlesRef.current = options;
      }
    });
    return () => {
      chromeDispose.dispose();
      resourceDisposable.dispose();
    };
  }, []);
  return (
    <Modal
      visible={visible}
      type="dialog"
      title={I18n.t('project_ide_unsaved_changes')}
      okText={I18n.t('project_ide_quit')}
      okButtonColor="red"
      cancelText={I18n.t('project_ide_cancel')}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <div className={styles.content}>
        {I18n.t('project_ide_unsaved_describe')}
      </div>
    </Modal>
  );
};
