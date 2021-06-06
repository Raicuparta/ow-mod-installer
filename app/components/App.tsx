import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { darkScrollbar, GlobalStyles } from '@material-ui/core';
import { green, red, orange } from '@material-ui/core/colors';
import { RecoilRoot } from 'recoil';

import MainView from './MainView';
import {
  SettingsSubscription,
  LocalModsSubscription,
  LogsSubscription,
  RemoteModsSubscription,
} from '../subscriptions';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[700],
    },
    secondary: {
      main: orange[700],
    },
    error: {
      main: red[500],
      dark: '#7e1e1e',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
        wrapper: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: 100,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1em',
        },
      },
    },
  },
});

const App = () => (
  <RecoilRoot>
    <SettingsSubscription />
    <LocalModsSubscription />
    <RemoteModsSubscription />
    <LogsSubscription />
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: darkScrollbar() }} />
      <MainView />
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
