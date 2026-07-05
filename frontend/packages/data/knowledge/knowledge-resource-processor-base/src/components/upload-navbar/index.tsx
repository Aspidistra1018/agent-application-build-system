import classNames from 'classnames';
import { getKnowledgeIDEQuery } from '@coze-data/knowledge-common-services';
import {
  useDataNavigate,
  useKnowledgeParams,
} from '@coze-data/knowledge-stores';
import { IconCozArrowLeft } from '@coze-arch/coze-design/icons';
import { IconButton, Typography } from '@coze-arch/coze-design';

interface UploadActionNavbarProps {
  title: string;
}

// Upload page navigation bar
export const UploadActionNavbar = ({ title }: UploadActionNavbarProps) => {
  const params = useKnowledgeParams();
  const resourceNavigate = useDataNavigate();

  // TODO: Scene layer maintenance of hzf biz differentiation
  const fromProject = params.biz === 'project';
  const handleBack = () => {
    const query = getKnowledgeIDEQuery() as Record<string, string>;
    resourceNavigate.toResource?.('knowledge', params.datasetID, query);
  };

  return (
    <div
      className={classNames(
        'flex items-center justify-between shrink-0 h-[56px] coz-fg-primary',
        fromProject ? 'px-[12px]' : '',
      )}
    >
      <div className="flex items-center">
        <IconButton
          color="secondary"
          icon={<IconCozArrowLeft className="text-[16px]" />}
          iconPosition="left"
          className="!p-[8px]"
          onClick={handleBack}
        ></IconButton>
        <Typography.Text fontSize="16px" weight={500} className="ml-[8px]">
          {title}
        </Typography.Text>
      </div>
    </div>
  );
};
