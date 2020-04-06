import { hot } from 'react-hot-loader/root';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import modList from '../mod-list.json';
import Mod from './Mod';
import ModList from './ModList';
import Typography from '@material-ui/core/Typography';

const App = () => (
  <div>
    <ModList />
    <TableContainer>
      <Table>
        <TableHead>
        <TableRow>
            <TableCell>
              <Typography variant="h5">Available Mods:</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { modList.map(repo => (
            <TableRow>
              <TableCell>
                <Mod
                  key={repo}
                  repo={repo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default hot(App);
