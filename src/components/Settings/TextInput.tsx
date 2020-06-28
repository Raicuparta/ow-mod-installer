import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  ListItem,
  TextField,
  makeStyles,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  tooltip?: string;
};

const useStyles = makeStyles(({ spacing }) => ({
  textField: {
    margin: `${spacing(1)}px ${spacing(2)}px`,
    width: `calc(100% - ${2 * spacing(2)}px)`,
    flex: 1,
  },
}));

const TextInput: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  disabled,
  tooltip = '',
}) => {
  const styles = useStyles();
  const [text, setText] = useState('');
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setText(event.target.value),
    [],
  );
  const handleSaveClick = () => {
    onChange(text);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Tooltip title={tooltip} placement="left">
      <ListItem>
        <Typography>{label}</Typography>
        <TextField
          className={styles.textField}
          fullWidth
          value={text}
          onChange={handleChange}
          color="secondary"
          disabled={disabled}
        />
        {value !== text && <Button onClick={handleSaveClick}>Save</Button>}
      </ListItem>
    </Tooltip>
  );
};

export default TextInput;
