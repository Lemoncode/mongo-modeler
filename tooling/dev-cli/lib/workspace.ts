import { existsSync, globSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

interface WorkspacePackage {
  name: string;
  dir: string;
  scripts: Record<string, string>;
}

const ROOT = resolve(import.meta.dirname, '../../..');

export const getWorkspacePackages = (): WorkspacePackage[] => {
  const rootPkg = JSON.parse(
    readFileSync(resolve(ROOT, 'package.json'), 'utf-8')
  );

  const patterns: string[] = rootPkg.workspaces ?? [];
  const dirs = patterns.flatMap(pattern => globSync(pattern, { cwd: ROOT }));

  return dirs
    .map(dir => {
      const pkgPath = resolve(ROOT, dir, 'package.json');
      if (!existsSync(pkgPath)) return null;
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      return {
        name: pkg.name ?? basename(dir),
        dir,
        scripts: pkg.scripts ?? {},
      };
    })
    .filter((pkg): pkg is WorkspacePackage => pkg !== null);
};

export const filterByScript = (
  packages: WorkspacePackage[],
  scriptName: string
): WorkspacePackage[] => packages.filter(pkg => scriptName in pkg.scripts);
