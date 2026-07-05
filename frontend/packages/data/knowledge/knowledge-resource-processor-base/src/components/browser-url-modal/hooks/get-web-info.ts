import { useRequest } from 'ahooks';
import { KnowledgeApi } from '@coze-arch/bot-api';

import { type ViewOnlinePageDetailProps } from '@/types';

/**
 * Convert the web page information returned by the API into view data
 */
const transformWebInfoToViewData = (webInfo: {
  id?: string;
  url?: string;
  title?: string;
  content?: string;
}): ViewOnlinePageDetailProps => ({
  id: webInfo?.id,
  url: webInfo?.url,
  title: webInfo?.title,
  content: webInfo?.content,
});

export const useGetWebInfo = (): {
  data: ViewOnlinePageDetailProps[];
  loading: boolean;
  runAsync: (webID: string) => Promise<ViewOnlinePageDetailProps[]>;
  mutate: (data: ViewOnlinePageDetailProps[]) => void;
} => {
  const { data, mutate, loading, runAsync } = useRequest(
    async (webID: string) => {
      const { data: responseData } = await KnowledgeApi.GetWebInfo({
        web_ids: [webID],
        include_content: true,
      });

      // If there is no data, return an empty array
      if (!responseData?.[webID]?.web_info) {
        return [] as ViewOnlinePageDetailProps[];
      }

      const webInfo = responseData[webID].web_info;
      const mainPageData = transformWebInfoToViewData(webInfo);
      const result = [mainPageData];

      // Processing subpage data
      if (webInfo?.subpages?.length) {
        const subpagesData = webInfo.subpages.map(transformWebInfoToViewData);
        result.push(...subpagesData);
      }

      return result;
    },
  );

  return {
    data: data || [],
    loading,
    runAsync,
    mutate,
  };
};
