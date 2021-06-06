import React from 'react';
import { Paper, Toolbar, Button } from '@material-ui/core';
import { Folder as FolderIcon } from '@material-ui/icons';
import { useRecoilState, useRecoilValue } from 'recoil';

import { modsText } from '../../helpers/static-text';
import FilterInput from '../FilterInput';
import { modFilterState, settingsState } from '../../store';
import { openDirectory } from '../../services';

const ModsToolbar: React.FunctionComponent = () => {
  const [filter, setFilter] = useRecoilState(modFilterState);
  const { owmlPath } = useRecoilValue(settingsState);
  return (
    <Paper>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <FilterInput
          value={filter}
          onChange={setFilter}
          label={modsText.toolbar.findModsLabel}
        />
        <Button
          startIcon={<FolderIcon />}
          onClick={() => openDirectory(`${owmlPath}/Mods`)}
          variant="outlined"
        >
          {modsText.toolbar.modsDirectory}
        </Button>
      </Toolbar>
    </Paper>
  );
};

export default ModsToolbar;
