import { I18n } from '@coze-arch/i18n';
import { Avatar, Tag } from '@coze-arch/coze-design';
import { type Model } from '@coze-arch/bot-api/developer_api';

/** Minimalist ModelOption for Button Display or Select Selected Bar */
export function ModelOptionThumb({ model }: { model: Model }) {
  return (
    <div className="px-[4px] flex items-center gap-[4px]">
      <Avatar
        shape="square"
        size="extra-extra-small"
        src={model.model_icon}
        className="rounded-[4px] border border-solid coz-stroke-primary"
      />
      <span className="text-[14px] leading-[20px] coz-fg-primary">
        {model.name}
      </span>
      {model.model_status_details?.is_upcoming_deprecated ? (
        <Tag size="mini" color="yellow">
          {I18n.t('model_list_willDeprecated')}
        </Tag>
      ) : null}
    </div>
  );
}
