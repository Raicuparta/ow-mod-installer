import React, { useCallback } from 'react';
import { Button, ListItem } from '@material-ui/core';
import { SettingsBackupRestore as RestoreIcon } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';

import { settingsText } from '../../helpers/static-text';
import { useSettings } from '../../hooks';
import { defaultAppSettings } from '../../services';
import { defaultOwmlSettingsState } from '../../store';

const ResetSettings = () => {
  const { setSettings, setOwmlSettings } = useSettings();
  const defaultOwmlSettings = useRecoilValue(defaultOwmlSettingsState);

  const handleResetClick = useCallback(() => {
    setSettings(defaultAppSettings);
    setOwmlSettings(defaultOwmlSettings);
  }, [setSettings, setOwmlSettings, defaultOwmlSettings]);

  return (
    <ListItem
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      <Button
        variant="contained"
        onClick={handleResetClick}
        startIcon={<RestoreIcon />}
      >
        {settingsText.resetToDefault}
      </Button>
    </ListItem>
  );
};

export default ResetSettings;
