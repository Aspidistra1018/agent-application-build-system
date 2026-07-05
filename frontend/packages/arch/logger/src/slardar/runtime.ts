import { reporter } from '../reporter';

export const getSlardarInstance = () => reporter.slardarInstance;

// Set coze's uid information asynchronously
export const setUserInfoContext = (userInfo: DataItem.UserInfo) => {
  const slardarInstance = getSlardarInstance();
  if (slardarInstance) {
    slardarInstance?.('context.set', 'coze_uid', userInfo?.user_id_str);
  }
};
