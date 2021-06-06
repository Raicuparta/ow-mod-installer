import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  ListItem,
  TextField,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';

import { settingsText } from '../../helpers/static-text';
import { debugConsole } from '../../helpers/console-log';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  tooltip?: string;
};

const TextInput: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  disabled,
  tooltip = '',
}) => {
  const [text, setText] = useState('');
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setText(event.target.value),
    []
  );
  const handleSaveClick = () => {
    onChange(text);
    setText(value);
  };

  useEffect(() => {
    debugConsole.log('useEffect: TextInput setText');
    setText(value);
  }, [value]);

  return (
    <ListItem>
      <Typography>{label}</Typography>
      <Tooltip title={tooltip} placement="bottom">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={text}
          onChange={handleChange}
          color="secondary"
          disabled={disabled}
          sx={{
            mx: 2,
            flex: 1,
          }}
        />
      </Tooltip>
      {value !== text && (
        <Button variant="contained" color="secondary" onClick={handleSaveClick}>
          {settingsText.textFieldSave}
        </Button>
      )}
    </ListItem>
  );
};

export default TextInput;
