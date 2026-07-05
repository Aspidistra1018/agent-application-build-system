import { VCSCanvasType } from '@coze-workflow/base/api';
import { I18n } from '@coze-arch/i18n';
import { IconCozCheckMarkCircleFillPalette } from '@coze-arch/coze-design/icons';
import { Tag } from '@coze-arch/coze-design';

import { useGlobalState } from '../../../hooks';

/*
  Distinguish between single-player mode and collaborative mode.
  Single-player mode: as long as it has been published, it shows that it has been published;
  Collaboration Mode: Display current status, draft | submit | publish
*/
export const PublishStatus = () => {
  const { info, config } = useGlobalState();
  const { vcsData } = info;
  const { autoSaveTime } = config;
  const { type } = vcsData || {};
  const { operator } = info.operationInfo || {};

  const renderIcon = () => {
    if (type === VCSCanvasType.Submit) {
      return (
        <IconCozCheckMarkCircleFillPalette className="coz-fg-color-blue" />
      );
    }
    if (type === VCSCanvasType.Publish) {
      return (
        <IconCozCheckMarkCircleFillPalette className="coz-fg-hglt-green" />
      );
    }
    return null;
  };

  const renderText = () => {
    if (type === VCSCanvasType.Draft) {
      return I18n.t('workflow_publish_multibranch_auto_saved', {
        time: autoSaveTime,
      });
    }
    if (type === VCSCanvasType.Submit) {
      return I18n.t('workflow_publish_multibranch_submitted', {
        name: operator?.name || '',
        time: autoSaveTime,
      });
    }
    if (type === VCSCanvasType.Publish) {
      return I18n.t('workflow_publish_multibranch_published', {
        name: operator?.name || '',
        time: autoSaveTime,
      });
    }
  };

  return (
    <Tag size="mini" color="primary" prefixIcon={renderIcon()}>
      {renderText()}
    </Tag>
  );
};
