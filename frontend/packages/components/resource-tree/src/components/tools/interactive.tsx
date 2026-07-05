import { useEffect, useState } from 'react';

import { I18n } from '@coze-arch/i18n';
import { Tooltip } from '@coze-arch/coze-design';
import {
  usePlayground,
  EditorState,
} from '@flowgram-adapter/fixed-layout-editor';
import {
  GuidingPopover,
  InteractiveType,
  MousePadSelector,
  getPreferInteractiveType,
  // setPreferInteractiveType,
} from '@coze-common/mouse-pad-selector';

export enum EditorCursorState {
  GRAB = 'GRAB',
  SELECT = 'SELECT',
}

export const Interactive = () => {
  const playground = usePlayground();

  const [interactiveType, setInteractiveType] = useState<InteractiveType>(
    () => getPreferInteractiveType() as InteractiveType,
  );

  const [showInteractivePanel, setShowInteractivePanel] = useState(false);

  function handleUpdateMouseScrollDelta(
    delta: number | ((zoom: number) => number),
  ) {
    playground.config.updateConfig({
      mouseScrollDelta: delta,
    });
  }

  const mousePadTooltip = I18n.t(
    interactiveType === InteractiveType.Mouse
      ? 'workflow_mouse_friendly'
      : 'workflow_pad_friendly',
  );

  function handleUpdateInteractiveType(interType: InteractiveType) {
    if (interType === InteractiveType.Mouse) {
      // Mouse First Interactive Mode: Update Status & Set Small Hands
      playground.editorState.changeState(
        EditorState.STATE_MOUSE_FRIENDLY_SELECT.id,
      );
    } else if (interType === InteractiveType.Pad) {
      // Trackpad Priority Interaction Mode: Update Status & Settings Arrows
      playground.editorState.changeState(EditorState.STATE_SELECT.id);
    }
    setInteractiveType(interType);
    return;
  }

  useEffect(() => {
    handleUpdateMouseScrollDelta(zoom => zoom / 20);

    // Read interactive mode from cache, application takes effect
    const preferInteractiveType = getPreferInteractiveType();
    handleUpdateInteractiveType(preferInteractiveType as InteractiveType);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init
  }, []);

  return (
    <GuidingPopover>
      <Tooltip
        content={mousePadTooltip}
        style={{ display: showInteractivePanel ? 'none' : 'block' }}
      >
        <div className="workflow-toolbar-interactive">
          <MousePadSelector
            value={interactiveType}
            onChange={value => {
              setInteractiveType(value);
              // The current logic is to only read settings from the canvas.
              // setPreferInteractiveType(value);
              handleUpdateInteractiveType(value as unknown as InteractiveType);
            }}
            onPopupVisibleChange={setShowInteractivePanel}
            containerStyle={{
              border: 'none',
              height: '24px',
              width: '38px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2px',
              padding: '4px',
              paddingTop: '1px',
              borderRadius: 'var(--small, 6px)',
            }}
            iconStyle={{
              margin: '0',
              width: '16px',
              height: '16px',
            }}
            arrowStyle={{
              width: '12px',
              height: '12px',
              lineHeight: 0,
            }}
          />
        </div>
      </Tooltip>
    </GuidingPopover>
  );
};
