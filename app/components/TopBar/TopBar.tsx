import React from 'react';
import { Toolbar, Container, Box } from '@material-ui/core';

import StartGameButton from './StartGameButton';
import AppTabs from './AppTabs';
import LoadingSuspense from '../LoadingSuspense';

const TopBar: React.FunctionComponent = () => (
  <Box
    sx={{
      // overflowY: 'scroll',
      '&::-webkit-scrollbar-track': {
        background: 'grey.900',
        borderRadius: 0,
      },
    }}
    component="div"
  >
    <Toolbar
      sx={{
        padding: 0,
        backgroundColor: 'grey.900',
      }}
      className="styles.toolbar"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        maxWidth="md"
        className="styles.container"
      >
        <AppTabs />
        <LoadingSuspense>
          <StartGameButton />
        </LoadingSuspense>
      </Container>
    </Toolbar>
  </Box>
);

export default TopBar;
