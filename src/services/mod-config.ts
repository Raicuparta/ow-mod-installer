import fs from 'fs-extra';

function getDefaultConfigPath(mod: Mod) {
  return `${mod.modPath}/default-config.json`;
}

function getConfigPath(mod: Mod) {
  return `${mod.modPath}/config.json`;
}

function isDefaultConfigExisting(mod: Mod) {
  return fs.existsSync(getDefaultConfigPath(mod));
}

function isConfigExisting(mod: Mod) {
  return fs.existsSync(getConfigPath(mod));
}

function getDefaultConfig(mod: Mod): ModConfig {
  if (isDefaultConfigExisting(mod)) {
    const defaultConfig: ModConfig = fs.readJSONSync(getDefaultConfigPath(mod));
    defaultConfig.enabled = true;
    return defaultConfig;
  }
  return {
    enabled: true,
  };
}

export function saveConfig(mod: Mod, config: ModConfig) {
  fs.writeJSONSync(getConfigPath(mod), config);
}

export function getConfig(mod: Mod): ModConfig {
  try {
    if (!isConfigExisting(mod)) {
      const defaultConfig = getDefaultConfig(mod);
      saveConfig(mod, defaultConfig);
    }
    return fs.readJSONSync(getConfigPath(mod));
  } catch (error) {
    console.error(
      'Not able to get mod config for',
      mod.uniqueName,
      '. Error:',
      error,
    );
    return { enabled: false };
  }
}
