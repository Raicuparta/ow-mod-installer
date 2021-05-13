import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';
import { coerce } from 'semver';

import { modsText } from '../helpers/static-text';
import { isEnabled } from './mod-manager';
import { manifestPartialToFull } from './manifest';
import { debugConsole } from '../helpers/console-log';

function getOwmlSync(owmlPath: string) {
  const owmlManifestPath = `${owmlPath}/OWML.Manifest.json`;
  const owmlManifest: Manifest = fs.existsSync(owmlManifestPath)
    ? fs.readJSONSync(owmlManifestPath)
    : null;
  const owml: Mod = {
    name: owmlManifest?.name ?? 'OWML',
    author: owmlManifest?.author ?? 'Alek',
    uniqueName: owmlManifest?.uniqueName ?? 'Alek.OWML',
    modPath: owmlPath,
    localVersion: owmlManifest
      ? owmlManifest?.version ?? '< 0.3.43'
      : undefined,
    isEnabled: true,
    isRequired: true,
    errors: [],
    dependencies: [],
    description: owmlManifest?.description,
  };
  return owml;
}

export function getLocalMods(owmlPath: string) {
  if (!owmlPath) {
    return [];
  }

  const manifestPaths = globby.sync(`**/manifest.json`, {
    cwd: `${owmlPath}/Mods`,
    absolute: true,
  });

  const localMods: Mod[] = [getOwmlSync(owmlPath)];

  manifestPaths.forEach((manifestPath) => {
    const { manifest, missingAttributes } = manifestPartialToFull(
      fs.readJsonSync(manifestPath)
    );

    const modWithSameId = localMods.find(
      (localMod) => localMod.uniqueName === manifest.uniqueName
    );
    if (modWithSameId) {
      modWithSameId.errors.push(
        modsText.duplicateModError(manifest.uniqueName)
      );
      return;
    }

    const mod: Mod = {
      name: manifest.name,
      author: manifest.author,
      uniqueName: manifest.uniqueName,
      localVersion: coerce(manifest.version)?.version ?? manifest.version,
      modPath: path.dirname(manifestPath),
      errors: [],
      dependencies: manifest.dependencies ?? [],
      requireVR: manifest.requireVR,
      description: manifest.description,
      warning: manifest.warning,
    };

    if (missingAttributes.length > 0) {
      mod.errors.push(
        modsText.missingManifestAttributesError(manifestPath, missingAttributes)
      );
    }

    try {
      mod.isEnabled = isEnabled(mod);
    } catch (error) {
      mod.isEnabled = true;
      debugConsole.error(error);
    }

    localMods.push(mod);
  });

  return [...localMods].filter((mod) => mod);
}
