import { spawn } from 'child_process';
import { remote } from 'electron';

import { globalText, settingsText } from '../helpers/static-text';

const EXE_FILE = 'OWML.Launcher.exe';

let quitTimeout: NodeJS.Timeout;

function waitAndQuit() {
  if (quitTimeout) {
    return;
  }
  quitTimeout = setTimeout(remote.app.quit, 1000);
}

export async function runOwml(
  {
    closeOnPlay,
    logToSocket,
    openVRParameter,
    disableParameterWarning,
    owmlPath,
  }: Settings,
  port: number,
  disableParameterWarningCallback: () => void
) {
  const owmlParams = [];
  const gameParamNames = [];
  if (!closeOnPlay && logToSocket) {
    owmlParams.push(`-consolePort ${port}`);
  }
  if (openVRParameter) {
    owmlParams.push(`-vrmode openvr`);
    gameParamNames.push(settingsText.openVRParameter.label);
  }

  if (!disableParameterWarning && gameParamNames.length > 0) {
    const { response, checkboxChecked } = await remote.dialog.showMessageBox({
      type: 'warning',
      title: remote.app.name,
      message: settingsText.steamParamsWarning.message,
      detail: settingsText.steamParamsWarning.detail(gameParamNames),
      checkboxLabel: globalText.dialog.dontShowAgain,
      buttons: [globalText.dialog.ok, globalText.dialog.cancel],
    });

    if (response === 1) {
      return;
    }

    if (checkboxChecked) {
      disableParameterWarningCallback();
    }
  }

  spawn(EXE_FILE, owmlParams, {
    shell: true,
    cwd: owmlPath,
    detached: true,
  });

  if (closeOnPlay) {
    waitAndQuit();
  }
}
