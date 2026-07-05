import { type ElementInlineStyle } from '../../lumino/virtualdom';
import { type RenderData, type ScrollableRenderData } from './tab-renderer';

export function createTabStyle(
  data: RenderData & ScrollableRenderData,
): ElementInlineStyle {
  const zIndex = `${data.zIndex}`;
  const { labelSize } = data;
  const { iconSize } = data;
  let height: string | undefined;
  let width: string | undefined;
  if (labelSize || iconSize) {
    const labelHeight = labelSize ? labelSize.height : 0;
    const iconHeight = iconSize ? iconSize.height : 0;
    let paddingTop = data.paddingTop || 0;
    if (labelHeight > 0 && iconHeight > 0) {
      paddingTop = paddingTop * 1.5;
    }
    const paddingBottom = data.paddingBottom || 0;
    height = `${labelHeight + iconHeight + paddingTop + paddingBottom}px`;
  }
  if (data.tabWidth) {
    width = `${data.tabWidth}px`;
  } else {
    width = '';
  }
  return { zIndex, height, minWidth: width, maxWidth: width };
}
