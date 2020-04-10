import React from 'react';
import {
  createStyles, lighten, makeStyles, Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';

import {
  isInstalled, isOutdated, install, uninstall, update,
} from '../../services/mod-manager';

interface Props {
  selectedMod?: Mod;
}

const useToolbarStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = (props: Props) => {
  const classes = useToolbarStyles();
  const { selectedMod: selected } = props;

  const isModInstalled = selected !== undefined && isInstalled(selected);

  return (
    <Toolbar className={`${classes.root} ${selected !== undefined ? classes.highlight : ''}`}>
      {selected !== undefined ? (
        <ButtonGroup
          variant="outlined"
          color="primary"
        >
          {isModInstalled && (
          <Button onClick={() => uninstall(selected)}>
            Uninstall
          </Button>
          )}
          {!isModInstalled && (
          <Button onClick={() => install(selected)}>
            Install
          </Button>
          )}
          {isOutdated(selected) && (
          <Button onClick={() => update(selected)}>
            Update
          </Button>
          )}
        </ButtonGroup>
      ) : (
        <Button
          fullWidth
          color="primary"
          variant="contained"
        >
          Update all
        </Button>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
