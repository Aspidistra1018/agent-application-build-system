import { type StateCreator } from 'zustand';

export interface UserInfoSlice {
  userInfo: string;
  iniUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<
  UserInfoSlice,
  [],
  [],
  UserInfoSlice
> = set => ({
  userInfo: '',
  iniUserInfo: () => {
    // TODO: User information related methods
  },
});
