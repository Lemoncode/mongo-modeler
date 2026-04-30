import * as p from '@clack/prompts';
import { spawn } from 'node:child_process';
import { filterByScript, getWorkspacePackages } from './lib/workspace';

const main = async () => {
  p.intro('Dev CLI');

  const packages = getWorkspacePackages();
  const devPackages = filterByScript(packages, 'dev');

  if (devPackages.length === 0) {
    p.cancel('No packages with a `dev` script found.');
    process.exit(0);
  }

  // Single package: skip prompt and auto-select
  const selected: string[] =
    devPackages.length === 1
      ? [devPackages[0].name]
      : await (async () => {
          const result = await p.multiselect({
            message: 'Which packages to run in dev mode?',
            options: devPackages.map(pkg => ({
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

  const filters = selected.map(name => `--filter=${name}...`).join(' ');

  p.outro(`Running: turbo dev check-types:watch ${filters}`);

  const child = spawn(
    'turbo',
    ['dev', 'check-types:watch', ...filters.split(' ')],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    }
  );

  child.on('exit', code => process.exit(code ?? 0));
};

main();
