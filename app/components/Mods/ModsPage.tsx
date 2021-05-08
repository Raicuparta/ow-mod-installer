import React from 'react';
import { Typography, Card, Container } from '@material-ui/core';
import { useRecoilValue } from 'recoil';

import { modsText } from '../../static-text';
import ModRowSection from './ModRowSection';
import PageContainer from '../PageContainer';
import {
  installedModList,
  requiredModList,
  notInstalledModList,
} from '../../store';
import ModsToolbar from './ModsToolbar';

const ModsPage: React.FunctionComponent = () => {
  const installedMods = useRecoilValue(installedModList);
  const notInstalledMods = useRecoilValue(notInstalledModList);
  const requiredMods = useRecoilValue(requiredModList);

  const isEmpty =
    requiredMods.length + installedMods.length + notInstalledMods.length === 0;

  return (
    <PageContainer maxWidth={false}>
      <Container maxWidth="md">
        <ModsToolbar />
        <ModRowSection
          title={modsText.modSections.required}
          mods={requiredMods}
          highlighted
        />
        {isEmpty && (
          <Card>
            <Typography variant="h6" align="center">
              {modsText.emptyModList}
            </Typography>
          </Card>
        )}
        <ModRowSection
          title={modsText.modSections.installed}
          mods={installedMods}
        />
        <ModRowSection
          title={modsText.modSections.notInstalled}
          mods={notInstalledMods}
        />
      </Container>
    </PageContainer>
  );
};

export default ModsPage;
