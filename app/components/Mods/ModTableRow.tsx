import React from 'react';
import {
  makeStyles,
  TableCell,
  TableRow,
  Chip,
  Typography,
  Box,
} from '@material-ui/core';

import { useRecoilValue } from 'recoil';
import { modsText } from '../../helpers/static-text';
import { isOutdated, isInstalled, isBroken } from '../../services';
import ModActions from './ModActions';
import { missingDependencyIdsState } from '../../store';

type Props = {
  mod: Mod;
};

const useStyles = makeStyles((theme) => ({
  brokenRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.error.dark,
    },
    backgroundColor: theme.palette.error.dark,
  },
  missingDependencyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.dark,
    },
    backgroundColor: theme.palette.secondary.dark,
  },
  modAuthor: {
    color: theme.palette.text.disabled,
    display: 'inline-block',
  },
  tableCell: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: 0,
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      opacity: '#4b4b4b',
    },
  },
  versionChip: {
    width: '100%',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    '& span': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  modText: {
    display: 'block',
    marginTop: -5,
    marginBottom: -theme.spacing(0),
    wordWrap: 'break-word',
  },
  outdatedChip: {
    ...theme.typography.caption,
    textAlign: 'center',
    width: '100%',
    lineHeight: 0,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    marginTop: -theme.spacing(4),
    borderRadius: 16,
    background: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ModTableRow: React.FunctionComponent<Props> = ({ mod }) => {
  const styles = useStyles();
  const missingDependencyNames = useRecoilValue(missingDependencyIdsState(mod));
  const isModBroken = isBroken(mod);
  const isModOutdated = isOutdated(mod);

  const getVersionColor = () => {
    if (isModBroken) {
      return 'default';
    }
    if (isModOutdated) {
      return 'secondary';
    }
    if (isInstalled(mod)) {
      return 'primary';
    }
    return 'default';
  };

  const getVersion = () => {
    if (isInstalled(mod)) {
      return mod.localVersion;
    }
    if (mod.remoteVersion) {
      return mod.remoteVersion;
    }
    return modsText.versionNotAvailable;
  };

  const getClassName = () => {
    let className = styles.tableRow;
    if (isModBroken) {
      className += ` ${styles.brokenRow}`;
    } else if (missingDependencyNames.length > 0) {
      className += ` ${styles.missingDependencyRow}`;
    }
    return className;
  };

  const getModText = () => {
    if (isModBroken) {
      return modsText.modLoadError(mod.errors);
    }
    if (missingDependencyNames.length > 0) {
      return modsText.missingDependencyWarning(
        missingDependencyNames.join(', ')
      );
    }
    return mod.description;
  };

  return (
    <TableRow className={getClassName()} key={mod.uniqueName}>
      <TableCell className={styles.tableCell}>
        <Typography variant="subtitle1">
          <Box display="inline-block" mr={2}>
            {mod.name}
          </Box>
          <Typography className={styles.modAuthor} variant="caption">
            {' by '}
            {mod.author}
          </Typography>
          <Typography variant="caption" />
        </Typography>
        <Typography
          className={styles.modText}
          color="textSecondary"
          variant="caption"
        >
          {getModText()}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableCell} align="right">
        {mod.downloadCount || '-'}
      </TableCell>
      <TableCell className={styles.tableCell}>
        <Chip
          color={getVersionColor()}
          label={getVersion()}
          className={styles.versionChip}
        />
        {!isModBroken && isModOutdated && (
          <div className={styles.outdatedChip}>{modsText.outdated}</div>
        )}
      </TableCell>
      <TableCell className={styles.tableCell}>
        <ModActions mod={mod} />
      </TableCell>
    </TableRow>
  );
};

export default ModTableRow;
