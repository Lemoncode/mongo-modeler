import * as p from '@clack/prompts';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { filterByScript, getWorkspacePackages } from './lib/workspace';

const ROOT = resolve(import.meta.dirname, '../..');

const main = async () => {
  p.intro('Test Watch CLI');

  const packages = getWorkspacePackages();
  const testPackages = filterByScript(packages, 'test');

  if (testPackages.length === 0) {
    p.cancel('No packages with a `test` script found.');
    process.exit(0);
  }

  // Single package: skip prompt and auto-select
  const names: string[] =
    testPackages.length === 1
      ? [testPackages[0].name]
      : await (async () => {
          const result = await p.multiselect({
            message: 'Which packages to test in watch mode?',
            options: testPackages.map(pkg => ({
              value: pkg.name,
              label: pkg.name,
              hint: pkg.dir,
            })),
            required: true,
          });

          if (p.isCancel(result)) {
            p.cancel('Cancelled.');
            process.exit(0);
          }

          return result as string[];
        })();

  // Single package: spawn vitest directly for interactive stdin (keyboard shortcuts)
  if (names.length === 1) {
    const pkg = testPackages.find(tp => tp.name === names[0])!;
    const pkgDir = resolve(ROOT, pkg.dir);

    p.outro(`Running: vitest (interactive) in ${pkg.dir}`);

    const child = spawn('npx', ['vitest'], {
      cwd: pkgDir,
      stdio: 'inherit',
      shell: true,
    });

    child.on('exit', code => process.exit(code ?? 0));
    return;
  }

  // Multiple packages: use turbo (no interactive stdin, but parallel output)
  const filters = names.map(name => `--filter=${name}...`).join(' ');

  p.outro(`Running: turbo test:watch ${filters}`);

  const child = spawn('turbo', ['test:watch', ...filters.split(' ')], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', code => process.exit(code ?? 0));
};

main();
