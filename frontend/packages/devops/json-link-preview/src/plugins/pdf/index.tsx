//  At present, the size information of the file cannot be obtained. If the file is too large, the browser card PDF does not need to be registered for the time being, and then it will be released.
import { JsonPreviewBasePlugin } from '../base';
import OverlayAPI from '../../common/overlay';
import PdfPreviewContent from './preview';

export class PdfPreview extends JsonPreviewBasePlugin {
  name = 'pdf';
  match = (contentType: string) => contentType === 'pdf';
  override priority = 0;
  render = (link: string, extraInfo?: Record<string, string>) => {
    OverlayAPI.show({
      content: onclose => (
        <PdfPreviewContent src={link} extraInfo={extraInfo} onClose={onclose} />
      ),
    });
    return <></>;
  };
}
