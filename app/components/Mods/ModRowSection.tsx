import React from 'react';
import {
  TableBody,
  Table,
  TableContainer,
  Paper,
  Box,
} from '@material-ui/core';

import ModTableRow from './ModTableRow';
import ModTableHead from './ModTableHead';

type Props = {
  mods: Mod[];
  title: string;
  highlighted?: boolean;
};

const ModRowSection: React.FunctionComponent<Props> = ({
  mods,
  title,
  highlighted,
}) => {
  return mods.length > 0 ? (
    <Box
      sx={{
        flex: 0,
        marginTop: 3,
      }}
    >
      <TableContainer
        component={Paper}
        sx={
          highlighted
            ? {
                border: 3,
                borderColor: 'secondary.light',
              }
            : undefined
        }
      >
        <Table sx={{ tableLayout: 'fixed' }} size="small">
          <ModTableHead title={title} />
          <TableBody>
            {mods.map((mod: Mod) => (
              <ModTableRow mod={mod} key={mod.uniqueName} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <></>
  );
};

export default ModRowSection;
