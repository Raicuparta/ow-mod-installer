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
import { green, grey, red } from '@material-ui/core/colors';
import { RecoilRoot } from 'recoil';

import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
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
      main: '#bb7900',
      dark: '#885b18',
      light: '#ffd53c',
    },
    error: {
      main: red[500],
      dark: '#7e1e1e',
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
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
      },
    },
  },
});

const PROTOCOL_SCHEME = 'outerwildsmod';
const PROTOCOL_PREFIX = `${PROTOCOL_SCHEME}://`;

const App = () => {
  const [repo, setRepo] = useState<string>();
  useEffect(() => {
    remote.app.on('second-instance', (e, argv) => {
      if (process.platform !== 'darwin') {
        // Find the arg that is our custom protocol url and store it
        const protocolArg = argv.find((arg) => arg.startsWith(PROTOCOL_PREFIX));

        if (!protocolArg) {
          console.error(`No protocol arg for ${PROTOCOL_PREFIX}`);
          return;
        }
        setRepo(protocolArg.slice(PROTOCOL_PREFIX.length));
      }

      const mainWindow = remote.getCurrentWindow();

      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }, []);
  return (
    <RecoilRoot>
      <SettingsSubscription />
      <LocalModsSubscription />
      <RemoteModsSubscription />
      <LogsSubscription />
      <ThemeProvider theme={theme}>
        {/* <MainView /> */}
        <p>
          What is the repo?
          {repo}
        </p>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
