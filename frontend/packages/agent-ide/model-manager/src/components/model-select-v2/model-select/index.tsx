import { useState } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { isBoolean } from 'lodash-es';
import { useMount } from 'ahooks';
import { I18n } from '@coze-arch/i18n';
import { Modal } from '@coze-arch/coze-design';
import {
  usePremiumStore,
  usePremiumType,
} from '@coze-studio/premium-store-adapter';
import {
  useBenefitAvailable,
  usePremiumManageModal,
  PremiumPaywallScene,
} from '@coze-studio/premium-components-adapter';

import { ModelSelectUI, type ModelSelectUIProps } from '../model-select-ui';

export interface ModelSelectProps extends ModelSelectUIProps {
  /**
   * Whether to allow selection of advanced models/new models, otherwise built-in pop-up blocking
   * When not passing or setting to auto, the built-in component determines whether the user is a paying user (domestic professional version, overseas premium)
   * @default auto
   */
  canSelectSuperiorModel?: boolean | 'auto';
}

/**
 * This component has more paid interception functions than ModelSelectUI
 */
export function ModelSelect({
  onModelChange,
  canSelectSuperiorModel: canSelectSuperiorModelProps,
  modalSlot,
  modelListExtraHeaderSlot,
  ...restProps
}: ModelSelectProps) {
  const { fetchPremiumPlan, fetchPremiumPlans } = usePremiumStore(
    useShallow(s => ({
      fetchPremiumPlans: s.fetchPremiumPlans,
      fetchPremiumPlan: s.fetchPremiumPlan,
    })),
  );
  // Domestic: Whether to allow the use of new models/advanced models
  const isBenefitAvailable = useBenefitAvailable({
    scene: PremiumPaywallScene.NewModel,
  });

  /** Is it premium overseas? */
  const { isFree } = usePremiumType();

  const canSelectSuperiorModel = isBoolean(canSelectSuperiorModelProps)
    ? canSelectSuperiorModelProps
    : IS_OVERSEA
    ? !isFree
    : isBenefitAvailable;
  const [upgradeModalState, setUpgradeModalState] = useState<{
    type?: 'new' | 'advance';
    visible: boolean;
  }>({ visible: false });

  const { node: premiumManageModal, open: openPremiumModal } =
    usePremiumManageModal();

  useMount(() => {
    if (IS_OVERSEA) {
      fetchPremiumPlans().then(fetchPremiumPlan);
    }
  });

  return (
    <ModelSelectUI
      modelListExtraHeaderSlot={modelListExtraHeaderSlot}
      onModelChange={m => {
        const isFreeModel =
          !m.model_status_details?.is_new_model &&
          !m.model_status_details?.is_advanced_model;
        if (canSelectSuperiorModel || isFreeModel) {
          return onModelChange(m);
        }

        setUpgradeModalState({
          visible: true,
          type: m.model_status_details?.is_new_model ? 'new' : 'advance',
        });
        return false;
      }}
      modalSlot={
        <>
          <Modal
            // The default z-index of the Popover component elastic layer used by ModelSelect is 1030.
            zIndex={1031}
            visible={upgradeModalState.visible}
            title={
              upgradeModalState.type === 'new'
                ? I18n.t('model_list_upgrade_to_pro_version')
                : I18n.t('model_list_upgrade_to_pro_version_advancedModel')
            }
            cancelText={I18n.t('Cancel')}
            okText={I18n.t('model_list_upgrade_button')}
            onOk={() => {
              if (IS_CN_REGION) {
                openPremiumModal();
                // This is done to prevent the modal content from jumping during the closed animation
                setUpgradeModalState(s => ({ ...s, visible: false }));
              } else {
                window.open('/premium', '_blank');
              }
              setUpgradeModalState(s => ({ ...s, visible: false }));
            }}
            onCancel={() =>
              setUpgradeModalState(s => ({ ...s, visible: false }))
            }
          >
            {upgradeModalState.type === 'new'
              ? I18n.t('model_list_ensure_service_quality')
              : I18n.t('model_list_upgrade_to_pro_advanced_tips')}
          </Modal>
          {modalSlot}
          {premiumManageModal}
        </>
      }
      {...restProps}
    />
  );
}
