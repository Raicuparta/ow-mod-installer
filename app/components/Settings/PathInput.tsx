import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { remote } from 'electron';
import {
  ListItem,
  TextField,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Save as SaveIcon, Folder as FolderIcon } from '@material-ui/icons';
import { settingsText } from '../../helpers/static-text';
import { debugConsole } from '../../helpers/console-log';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  tooltip?: string;
};

const FILE_NAME = 'OuterWilds.exe';

const PathInput: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  disabled,
  tooltip = '',
}) => {
  const [path, setPath] = useState('');
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setPath(event.target.value),
    []
  );
  const handleSaveClick = () => {
    onChange(path);
  };

  useEffect(() => {
    debugConsole.log('useEffect: PathInput set path');
    setPath(value);
  }, [value]);

  const handleFindClick = async () => {
    const openedValue = await remote.dialog.showOpenDialog({
      properties: ['openFile'],
      title: settingsText.pathFindTitle(FILE_NAME),
      defaultPath: `${value}\\${FILE_NAME}`,
      filters: [
        {
          name: FILE_NAME,
          extensions: ['exe'],
        },
      ],
    });

    const pathResult = openedValue.filePaths[0].replace(FILE_NAME, '');
    onChange(pathResult);
    setPath(pathResult);
  };

  return (
    <ListItem>
      <Typography>{label}</Typography>
      <Tooltip title={tooltip} placement="bottom">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={path}
          onChange={handleChange}
          color="secondary"
          disabled={disabled}
          sx={{
            mx: 2,
            flex: 1,
          }}
        />
      </Tooltip>
      {value !== path && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveClick}
          startIcon={<SaveIcon />}
        >
          {settingsText.textFieldSave}
        </Button>
      )}
      {value === path && (
        <Button
          variant="contained"
          onClick={handleFindClick}
          startIcon={<FolderIcon />}
        >
          {settingsText.pathFindButton}
        </Button>
      )}
    </ListItem>
  );
};

export default PathInput;
