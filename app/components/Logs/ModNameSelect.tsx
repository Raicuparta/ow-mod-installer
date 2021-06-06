import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { uniq } from 'lodash';

import { logsText } from '../../helpers/static-text';
import { LogLine } from '../../types';
import { debugConsole } from '../../helpers/console-log';

type Props = {
  value: string;
  onChange: (value: string) => void;
  logLines: LogLine[];
};

const ModNameSelect: React.FunctionComponent<Props> = ({
  value,
  onChange,
  logLines,
}) => {
  const [modNames, setModNames] = useState<string[]>([]);

  useEffect(() => {
    debugConsole.log('useEffect: ModNameSelect set mod names');
    setModNames(uniq(logLines.map((line) => line.modName)));
  }, [logLines]);

  const handleModNameChange = ({
    target,
  }: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    onChange(target.value as string);
  };

  return (
    <Select
      variant="outlined"
      size="small"
      value={value}
      onChange={handleModNameChange}
      displayEmpty
      sx={{
        maxWidth: 150,
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <MenuItem value={''}>{logsText.allMods}</MenuItem>
      {modNames.map((modName) => (
        <MenuItem value={modName} key={modName}>
          {modName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ModNameSelect;
