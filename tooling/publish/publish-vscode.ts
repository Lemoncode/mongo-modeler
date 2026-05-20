import { execSync, type ExecSyncOptions } from 'node:child_process';
import { copyFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, VSCODE_EXTENSION_PATHS } from './publish.constants';

const buildAndPublish = async (pkgRelativePath: string) => {
  const cwd = resolve(ROOT, pkgRelativePath);
  const opts: ExecSyncOptions = { stdio: 'inherit', cwd };
  const licenseDest = resolve(cwd, 'LICENSE');

  await copyFile(resolve(ROOT, 'LICENSE'), licenseDest);

  try {
    console.log(`\nBuilding ${pkgRelativePath}...`);
    execSync('node --run build', opts);
    execSync('vsce package --no-dependencies --out ./dist', opts);

    console.log(`Publishing ${pkgRelativePath}...`);
    execSync('vsce publish --packagePath ./dist/*.vsix', opts);
  } finally {
    await rm(licenseDest, { force: true });
  }
};

const main = async () => {
  for (const ext of VSCODE_EXTENSION_PATHS) {
    await buildAndPublish(ext);
  }
};

main();
