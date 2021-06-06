import React from 'react';
import { TableCell, TableRow, Chip, Typography, Box } from '@material-ui/core';

import { useRecoilValue } from 'recoil';
import { modsText } from '../../helpers/static-text';
import { isOutdated, isInstalled, isBroken } from '../../services';
import ModActions from './ModActions';
import { missingDependencyIdsState } from '../../store';

type Props = {
  mod: Mod;
};

const tableCellStyle = {
  py: 1,
  borderBottom: 0,
};

const ModTableRow: React.FunctionComponent<Props> = ({ mod }) => {
  const missingDependencyNames = useRecoilValue(missingDependencyIdsState(mod));
  const isModBroken = isBroken(mod);
  const isModOutdated = isOutdated(mod);
  const isModMissingDependencies = missingDependencyNames.length > 0;

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

  const getModText = () => {
    if (isModBroken) {
      return modsText.modLoadError(mod.errors);
    }
    if (isModMissingDependencies) {
      return modsText.missingDependencyWarning(
        missingDependencyNames.join(', ')
      );
    }
    return mod.description;
  };

  // TODO: repeated sx cleanup

  return (
    <TableRow
      sx={{
        ...(!isModBroken && !isModMissingDependencies
          ? {
              '&:nth-of-type(odd)': {
                backgroundColor: '#252525',
              },
            }
          : null),
        ...(isModBroken
          ? {
              backgroundColor: 'error.dark',
            }
          : null),
        ...(isModMissingDependencies
          ? {
              backgroundColor: 'secondary.dark',
            }
          : null),
      }}
      key={mod.uniqueName}
    >
      <TableCell sx={tableCellStyle}>
        <Typography variant="subtitle1">
          <Box display="inline-block" mr={2}>
            {mod.name}
          </Box>
          <Typography
            sx={{
              color: 'text.disabled',
              display: 'inline-block',
            }}
            variant="caption"
          >
            {' by '}
            {mod.author}
          </Typography>
          <Typography variant="caption" />
        </Typography>
        <Typography
          sx={{
            display: 'block',
            mt: -0.5,
            mb: 0,
            wordWrap: 'break-word',
          }}
          color="textSecondary"
          variant="caption"
        >
          {getModText()}
        </Typography>
      </TableCell>
      <TableCell sx={tableCellStyle} align="right">
        {mod.downloadCount || '-'}
      </TableCell>
      <TableCell sx={tableCellStyle}>
        <Chip
          color={getVersionColor()}
          label={getVersion()}
          sx={{
            width: '100%',
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            '& span': {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        />
        {!isModBroken && isModOutdated && (
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
              lineHeight: 0,
              paddingTop: 4,
              paddingBottom: 2,
              marginTop: -4,
              borderRadius: 4,
              backgroundColor: 'secondary.main',
              fontWeight: 'fontWeightBold',
              fontSize: 12,
            }}
          >
            {modsText.outdated}
          </Box>
        )}
      </TableCell>
      <TableCell sx={tableCellStyle}>
        <ModActions mod={mod} />
      </TableCell>
    </TableRow>
  );
};

export default ModTableRow;
