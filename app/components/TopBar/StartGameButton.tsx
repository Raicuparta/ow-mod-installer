import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { PlayArrow as PlayIcon } from '@material-ui/icons';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { globalText } from '../../static-text';
import { runOwml, writeSettings } from '../../services';
import {
  requiredModNamesState,
  isLogServerRunningState,
  logServerPortState,
  settingsState,
  selectedTabState,
} from '../../store';

const StartGameButton: React.FunctionComponent = () => {
  const requiredModNames = useRecoilValue(requiredModNamesState);
  const isLogServerRunning = useRecoilValue(isLogServerRunningState);
  const logServerPort = useRecoilValue(logServerPortState);
  const settings = useRecoilValue(settingsState);
  const setSelectedTab = useSetRecoilState(selectedTabState);

  function setDisableParameterWarnings() {
    writeSettings({ ...settings, disableParameterWarning: true });
    if (settings.logToSocket) {
      setSelectedTab(1);
    }
  }

  function handleStartGameClick() {
    runOwml(settings, logServerPort, setDisableParameterWarnings);
  }

  const isMissingRequiredMod = requiredModNames.length > 0;
  const isStartDisabled = isMissingRequiredMod || isLogServerRunning;

  function getStartGameTooltip() {
    if (isMissingRequiredMod) {
      return globalText.missingRequiredMod(requiredModNames);
    }
    if (isLogServerRunning) {
      return globalText.gameRunning;
    }
    return '';
  }

  return (
    <Tooltip title={getStartGameTooltip()}>
      <span>
        <Button
          onClick={handleStartGameClick}
          size="large"
          variant="contained"
          color="primary"
          disabled={isStartDisabled}
          startIcon={<PlayIcon />}
        >
          {globalText.startGame}
        </Button>
      </span>
    </Tooltip>
  );
};

export default StartGameButton;
