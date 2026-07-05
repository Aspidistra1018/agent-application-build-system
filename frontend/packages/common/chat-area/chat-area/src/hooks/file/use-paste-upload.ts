import { type ClipboardEvent } from 'react';

import { nanoid } from 'nanoid';

import { getFileListByPaste } from '../../utils/upload';
import { usePreference } from '../../context/preference';
import { useValidateFileList } from './use-validate-file-list';
import { useCreateFileAndUpload } from './use-upload';

export const usePasteUpload = () => {
  const uploadFile = useCreateFileAndUpload();
  const { fileLimit, enablePasteUpload } = usePreference();
  const validateFileList = useValidateFileList();

  return (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (!enablePasteUpload) {
      return;
    }

    const fileList = getFileListByPaste(e);

    // If the number of pasted files is empty, return
    if (!fileList.length) {
      return;
    }

    // Block default paste behavior
    e.preventDefault();

    const verifiedFileList = validateFileList({ fileLimit, fileList });

    // file validation
    if (!verifiedFileList.length) {
      return;
    }

    verifiedFileList.forEach(file => {
      uploadFile(nanoid(), file);
    });
  };
};
