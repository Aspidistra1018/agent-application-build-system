import path from 'path';
import fs from 'fs/promises';

import { OUTPUT_DIR } from './const';

// Function to copy directory
const copyDir = async (src: string, dest: string) => {
  // Read all files/folders in the directory
  const entries = await fs.readdir(src, { withFileTypes: true });

  // Create target directory
  await fs.mkdir(dest, { recursive: true });

  // Iterate through all files/folders
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // If it is a folder, copy it recursively.
      await copyDir(srcPath, destPath);
    } else {
      // If it is a file, copy it directly.
      await fs.copyFile(srcPath, destPath);
    }
  }
};

export const buildAssets = async () => {
  const source = path.resolve(
    path.dirname(require.resolve('pdfjs-dist/package.json')),
    './cmaps',
  );
  await copyDir(source, path.resolve(OUTPUT_DIR, './cmaps'));
};
