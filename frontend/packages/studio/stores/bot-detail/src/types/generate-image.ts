import {
  type TaskNotice,
  type PicTask,
  type GeneratePicPrompt,
} from '@coze-arch/idl/playground_api';

export enum GenerateType {
  Static = 'static',
  Gif = 'gif',
}
export enum DotStatus {
  Generating = 1,
  Success,
  Fail,
  Cancel,
  None,
}

export interface GenerateGifInfo {
  loading: boolean;
  dotStatus: DotStatus;
  text: string;
  image: PicTask;
}

export interface GenerateAvatarModal {
  visible: boolean;
  activeKey: GenerateType;
  selectedImage: PicTask;
  generatingTaskId?: string;
  gif: GenerateGifInfo;
  image: {
    loading: boolean;
    dotStatus: DotStatus;
    text: string;
    textCustomizable: boolean;
  };
}

export interface GenerateBackGroundModal {
  activeKey: GenerateType;
  selectedImage: PicTask;
  generatingTaskId?: string;
  gif: GenerateGifInfo;
  image: {
    loading: boolean;
    dotStatus: DotStatus;
    promptInfo: GeneratePicPrompt;
  };
}

// The state of generating images asynchronously
export interface GenerateImageState {
  // Candidate image list information
  imageList: PicTask[];
  // Generate image message information
  noticeList: TaskNotice[];
  // The status of generating pictures in the avatar pop-up window
  generateAvatarModal: GenerateAvatarModal;
  // The status of the generated image in the background cover pop-up window
  generateBackGroundModal: GenerateBackGroundModal;
}

export interface GenerateImageAction {
  updateImageList: (list: PicTask[]) => void;
  pushImageList: (image: PicTask) => void;
  // updateImageList: (update: (state: PicTask[]) => void) => void;
  updateNoticeList: (list: TaskNotice[]) => void;
  setGenerateAvatarModal: (state: GenerateAvatarModal) => void;
  resetGenerateAvatarModal: () => void;
  setGenerateAvatarModalByImmer: (
    update: (state: GenerateAvatarModal) => void,
  ) => void;
  setGenerateBackgroundModalByImmer: (
    update: (state: GenerateBackGroundModal) => void,
  ) => void;
  clearGenerateImageStore: () => void;
}
