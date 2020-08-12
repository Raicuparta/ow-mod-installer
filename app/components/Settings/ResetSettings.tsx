import React, { useCallback } from 'react';
import { Button, ListItem, makeStyles } from '@material-ui/core';
import { SettingsBackupRestore as RestoreIcon } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';

import { settingsText } from '../../static-text';
import { useSettings } from '../../hooks';
import { getDefaultAppSettings } from '../../services';
import { defaultOwmlSettingsState } from '../../store';

const useStyles = makeStyles({
  root: {
    justifyContent: 'flex-end',
  },
});

const ResetSettings = () => {
  const styles = useStyles();
  const { setSettings, setOwmlSettings } = useSettings();
  const defaultOwmlSettings = useRecoilValue(defaultOwmlSettingsState);

  const handleResetClick = useCallback(() => {
    setSettings(getDefaultAppSettings());
    setOwmlSettings(defaultOwmlSettings);
  }, [setSettings, setOwmlSettings, defaultOwmlSettings]);

  return (
    <ListItem className={styles.root}>
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
