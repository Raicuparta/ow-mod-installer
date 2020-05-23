import { spawn } from 'child_process';
import { remote } from 'electron';

import { downloadFile, unzipFile } from '../services';

// TODO separator
const BAT_FILE = '"install-update.bat"';
const updateUrl =
  'https://github.com/Raicuparta/ow-mod-manager/releases/download/0.0.3/OWModManager.zip';
const zipPath = 'OWModManager.zip';
const unzipPath = 'update';

type RemoteMod = {
  downloadUrl: string;
  downloadCount: number;
  manifest: Manifest;
  repo: string;
};

export function installSelfUpdate() {
  const ls = spawn('cmd.exe', ['/c', BAT_FILE], {
    detached: true,
    shell: true,
    cwd: unzipPath,
  });

  remote.app.exit();

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });
}

export async function downloadSelfUpdate() {
  // TODO handle progress
  await downloadFile(updateUrl, zipPath, () => {});
  await unzipFile(zipPath, unzipPath, () => {});
}