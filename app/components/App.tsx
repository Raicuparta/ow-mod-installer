import {
  createMuiTheme,
  ThemeProvider,
  // The typings for this package haven't been updated yet,
  // So we need to ignore typescript and eslint rules to
  // import experimental stuff.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  unstable_createMuiStrictModeTheme as unstableCreateMuiStrictModeTheme,
} from '@material-ui/core/styles';
import { green, orange, grey } from '@material-ui/core/colors';
import { RecoilRoot } from 'recoil';

import React from 'react';
import MainView from './MainView';
import {
  SettingsSubscription,
  LocalModsSubscription,
  LogsSubscription,
  RemoteModsSubscription,
} from '../subscriptions';

// Compatibility with React concurrent mode.
const createMuiStrictTheme = unstableCreateMuiStrictModeTheme as typeof createMuiTheme;

const theme = createMuiStrictTheme({
  palette: {
    type: 'dark',
    primary: {
      main: green[700],
    },
    secondary: {
      main: orange[800],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowY: 'hidden',
        },
        '*::-webkit-scrollbar': {
          width: '1em',
          cursor: 'pointer',
        },
        '*::-webkit-scrollbar-track': {
          background: grey[800],
          borderRadius: 0,
        },
        '*::-webkit-scrollbar-thumb': {
          background: grey[700],
          border: `2px solid ${grey[800]}`,
          borderRadius: 0,
          '&:hover': {
            background: grey[600],
          },
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
      <MainView />
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
