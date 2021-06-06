import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { ListItem, Typography, Slider, Tooltip } from '@material-ui/core';
import { debugConsole } from '../../helpers/console-log';

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  tooltip?: string;
};

const SliderInput: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  disabled,
  tooltip = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const handleChangeCommitted = useCallback(
    (_: unknown, changeValue: number | number[]) =>
      onChange(typeof changeValue === 'number' ? changeValue : changeValue[0]),
    [onChange]
  );

  const handleChange = useCallback(
    (_: unknown, changeValue: number | number[]) =>
      setDisplayValue(
        typeof changeValue === 'number' ? changeValue : changeValue[0]
      ),
    []
  );

  useEffect(() => {
    debugConsole.log('useEffect: SliderInput setDisplayValue');
    setDisplayValue(value);
  }, [value]);

  return (
    <ListItem>
      <Typography>{label}</Typography>
      <Tooltip title={tooltip} placement="bottom">
        <Slider
          sx={{
            mr: 2,
            mb: 2,
            ml: 4,
            flex: 1,
          }}
          disabled={disabled}
          value={displayValue}
          onChangeCommitted={handleChangeCommitted}
          onChange={handleChange}
          step={10}
          min={10}
          max={200}
          valueLabelDisplay="auto"
          color="secondary"
          marks={[
            { value: 10, label: '10' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: 150, label: '150' },
            { value: 200, label: '200' },
          ]}
        />
      </Tooltip>
    </ListItem>
  );
};

export default SliderInput;
