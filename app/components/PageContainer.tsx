import { Container, experimentalStyled } from '@material-ui/core';

// TODO what's going on with the typing here
const PageContainer = experimentalStyled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  flex: 1,
  overflow: 'hidden scroll',
  display: 'flex',
  flexDirection: 'column',
})) as typeof Container;

export default PageContainer;
