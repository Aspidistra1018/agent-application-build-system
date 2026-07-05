import { execSync } from 'child_process';

/**
 * Get the current git branch name
 * @Returns the current branch name, or undefined if not in the git repository or an error occurs
 */
export function getCurrentBranch(): string | undefined {
  try {
    // Use git rev-parse to get the current branch name
    // --Abbrev-ref parameter returns branch name instead of commit hash
    // HEAD represents the current location
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim();

    // If in the detached HEAD state, return undefined
    if (branch === 'HEAD') {
      return undefined;
    }

    return branch;
  } catch (error) {
    // If there is an execution error (e.g. not in the git repository), return undefined.
    return '';
  }
}
