import React from 'react';
import { Box, CssBaseline } from '@material-ui/core';
import { useRecoilValue } from 'recoil';

import TopBar from './TopBar/TopBar';
import { tabList } from './TopBar/AppTabs';
import { selectedTabState } from '../store';
import LoadingSuspense from './LoadingSuspense';

const MainView = () => {
  const selectedTab = useRecoilValue(selectedTabState);

  return (
    <CssBaseline>
      <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <TopBar />
        {tabList.map(
          (tab) =>
            tabList[selectedTab].name === tab.name && (
              <LoadingSuspense key={tab.name}>
                <tab.component />
              </LoadingSuspense>
            )
        )}
      </Box>
    </CssBaseline>
  );
};

export default MainView;
