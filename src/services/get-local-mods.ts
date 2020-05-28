import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import config from '../config.json';
import { isEnabled, manifestPartialToFull } from '.';

async function getOwml() {
  const owmlManifestPath = `${config.owmlPath}/OWML.Manifest.json`;
  const owmlManifest: Manifest = fs.existsSync(owmlManifestPath)
    ? await fs.readJSON(owmlManifestPath)
    : null;
  const owml: Mod = {
    name: owmlManifest?.name ?? 'OWML',
    author: owmlManifest?.author ?? 'Alek',
    uniqueName: owmlManifest?.uniqueName ?? 'Alek.OWML',
    modPath: config.owmlPath,
    localVersion: owmlManifest
      ? owmlManifest?.version ?? '< 0.3.43'
      : undefined,
    isEnabled: true,
    isRequired: true,
    errors: [],
  };
  return owml;
}

export async function getLocalMods() {
  const manifestPaths = await glob(`${config.owmlPath}/Mods/**/manifest.json`);

  return Promise.allSettled([
    ...manifestPaths.map<Promise<Mod>>(async (manifestPath) => {
      const { manifest, missingAttributes } = manifestPartialToFull(
        await fs.readJson(manifestPath),
      );

      const mod: Mod = {
        name: manifest.name,
        author: manifest.author,
        uniqueName: manifest.uniqueName,
        localVersion: manifest.version,
        modPath: path.dirname(manifestPath),
        errors: [],
      };

      if (missingAttributes.length > 0) {
        mod.errors.push(
          `Manifest ${manifestPath} missing attributes "${missingAttributes.join(
            '", "',
          )}"`,
        );
      }

      try {
        mod.isEnabled = isEnabled(mod);
      } catch (error) {
        mod.errors.push(error);
      } finally {
        return mod;
      }
    }),
    getOwml(),
  ]);
}
