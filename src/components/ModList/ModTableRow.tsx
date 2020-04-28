import React from 'react';
import {
  makeStyles,
  TableCell,
  TableRow,
  Chip,
  CircularProgress,
  PropTypes as MaterialProps,
} from '@material-ui/core';

import { isOutdated, isInstalled } from '../../services';
import ModActions from './ModActions';

type Props = {
  mod: Mod;
};

const useStyles = makeStyles({
  requiredRow: {
    opacity: 0.75,
    background: '#252525',
  },
});

const ModTableRow: React.FunctionComponent<Props> = ({ mod }) => {
  const classes = useStyles();

  const getVersionColor = (): MaterialProps.Color => {
    if (isOutdated(mod)) {
      return 'secondary';
    } else if (isInstalled(mod)) {
      return 'primary';
    } else {
      return 'default';
    }
  };

  const getVersion = () => {
    if (isInstalled(mod)) {
      return mod.localVersion;
    } else if (mod.remoteVersion) {
      return mod.remoteVersion;
    } else {
      return 'Not Available';
    }
  };

  return (
    <TableRow
      className={mod.isRequired ? classes.requiredRow : undefined}
      key={mod.uniqueName}
    >
      <TableCell>{mod.name}</TableCell>
      <TableCell>{mod.author}</TableCell>
      <TableCell align="right">{mod.downloadCount}</TableCell>
      <TableCell>
        {mod.isLoading && <CircularProgress size={27} color="inherit" />}
        {!mod.isLoading && (
          <Chip color={getVersionColor()} label={getVersion()} />
        )}
      </TableCell>
      <TableCell padding="none">
        <ModActions mod={mod} />
      </TableCell>
    </TableRow>
  );
};

export default ModTableRow;
