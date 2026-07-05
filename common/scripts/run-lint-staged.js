/**
 * Runs lint-staged with a shell that exists on the current platform.
 * Windows machines without WSL do not have /bin/bash, so we try to locate
 * bash.exe from Git for Windows (or any other bash) automatically.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const LintStagedConfig = path.join(
  __dirname,
  '..',
  'autoinstallers',
  'rush-lint-staged',
  '.lintstagedrc.js',
);
const LintStagedBin = path.join(
  __dirname,
  '..',
  'autoinstallers',
  'rush-lint-staged',
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'lint-staged.cmd' : 'lint-staged',
);

function resolveShell() {
  if (process.env.LINT_STAGED_SHELL) {
    return process.env.LINT_STAGED_SHELL;
  }

  if (process.platform === 'win32') {
    const probe = spawnSync('where', ['bash.exe'], { encoding: 'utf8' });
    if (probe.status === 0) {
      const candidate = probe.stdout
        .split(/\r?\n/)
        .map(line => line.trim())
        .find(Boolean);
      if (candidate) {
        return candidate;
      }
    }
    throw new Error(
      'Unable to locate bash.exe on PATH. Install Git for Windows or set LINT_STAGED_SHELL to a valid shell executable.',
    );
  }

  return '/bin/bash';
}

function run() {
  const shellPath = resolveShell();
  const args = ['--config', LintStagedConfig, '--shell', shellPath, '--concurrent', '8'];
  const result = spawnSync(LintStagedBin, args, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  if (result.error) {
    console.error('[lint-staged] failed to start:', result.error.message);
    process.exit(result.status ?? 1);
  }

  process.exit(result.status ?? 0);
}

run();
