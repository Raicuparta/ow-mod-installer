import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from '@material-ui/core';
import { ClearAll as ClearAllIcon } from '@material-ui/icons';

import { logsText } from '../../helpers/static-text';
import { LogLine } from '../../types';
import { useSettings } from '../../hooks';
import FilterInput from '../FilterInput';
import ModNameSelect from './ModNameSelect';
import PageContainer from '../PageContainer';
import { useRecoilState } from 'recoil';
import { logLinesState } from '../../store';
import { debugConsole } from '../../helpers/console-log';

const logColorMap = {
  Error: 'error.light',
  Quit: 'error.light',
  Warning: 'warning.light',
  Success: 'success.light',
  Info: 'info.light',
  Fatal: 'error.light',
  Message: undefined,
} as const;

const LogCell = TableCell;

const OwmlLog: React.FunctionComponent = () => {
  const [logLines, setLogLines] = useRecoilState(logLinesState);
  const {
    settings: { logLinesLimit },
  } = useSettings();

  const [paginatedLines, setPaginatedLines] = useState<LogLine[]>([]);
  const [selectedModName, setSelectedModName] = useState<string>('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPreviousPageVisible = useRef(false);
  const isNextPageVisible = page > 0;
  const isPaginated = useRef(false);
  const hasHiddenLines = useRef(false);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    debugConsole.log('useEffect: LogsPage scroll reset');
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, [paginatedLines]);

  useEffect(() => {
    debugConsole.log('useEffect: LogsPage filter');
    const lowerCaseFilter = filter.toLowerCase();
    const isFilteringByName = filter !== '';
    const isFilteringByMod = selectedModName !== '';

    let filteredLines: LogLine[] = [];
    if (isFilteringByName || isFilteringByMod) {
      filteredLines = logLines.filter((line) => {
        const isFromSelectedMod =
          !isFilteringByMod || line.modName === selectedModName;
        const isMatchWithFilter =
          !isFilteringByName ||
          line.text.toLowerCase().includes(lowerCaseFilter);
        return isMatchWithFilter && isFromSelectedMod;
      });
    } else {
      filteredLines = logLines;
    }

    let lines: LogLine[] = [];
    if (filteredLines.length <= logLinesLimit) {
      lines = filteredLines;
    }

    const end = filteredLines.length - page * logLinesLimit;
    const start = end > logLinesLimit ? end - logLinesLimit : 0;
    lines = filteredLines.slice(start, end);

    isPreviousPageVisible.current =
      page < Math.floor((filteredLines.length - 1) / logLinesLimit);
    isPaginated.current = filteredLines.length !== lines.length;
    hasHiddenLines.current = logLines.length !== lines.length;

    setPaginatedLines(lines);
  }, [filter, logLines, selectedModName, page, logLinesLimit]);

  useEffect(() => {
    debugConsole.log('useEffect: LogsPage pagination reset');
    setPage(0);
  }, [filter, selectedModName]);

  function handlePreviousPageClick() {
    setPage((prevPage) => prevPage + 1);
  }
  logColorMap
  function handleNextPageClick() {
    setPage((prevPage) => prevPage - 1);
  }

  function handleClearClick() {
    setLogLines([]);
  }

  return (
    <PageContainer maxWidth={false}>
      <TableContainer
        component={Paper}
        ref={containerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          background: 'grey.900',
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <LogCell sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
                <FilterInput
                  onChange={setFilter}
                  value={filter}
                  label={logsText.filterLogsLabel}
                />
                {logLines.length > 1 && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {hasHiddenLines.current &&
                      logsText.showingLines(paginatedLines.length)}
                    {logsText.entries(logLines.length)}
                    {isPaginated.current && logsText.page(page + 1)}
                  </Typography>
                )}
                <Tooltip title={logsText.clearLogs}>
                  <IconButton size="small" onClick={handleClearClick}>
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              </LogCell>
              <LogCell sx={{
                width: '150px', 
                backgroundColor: 'transparent',
              }}>
                <ModNameSelect
                  value={selectedModName}
                  onChange={setSelectedModName}
                  logLines={logLines}
                />
              </LogCell>
              <LogCell sx={{
                width: '1px',
                backgroundColor: 'transparent',
              }}>
                #
              </LogCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isPreviousPageVisible.current && (
              <TableRow>
                <LogCell colSpan={3}>
                  <Button
                    onClick={handlePreviousPageClick}
                    fullWidth
                    variant="outlined"
                  >
                    {logsText.showPrevious(logLinesLimit)}
                  </Button>
                </LogCell>
              </TableRow>
            )}
            {paginatedLines.map((line: LogLine) => (
              <React.Fragment key={line.id}>
                <TableRow>
                  <LogCell sx={{
                    color: logColorMap[line.type],
                  }}>{line.text}</LogCell>
                  <LogCell sx={{
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {line.modName}
                  </LogCell>
                  <LogCell>{line.count > 1 ? line.count : ''}</LogCell>
                </TableRow>
              </React.Fragment>
            ))}
            {isNextPageVisible && (
              <TableRow>
                <LogCell colSpan={3}>
                  <Button
                    onClick={handleNextPageClick}
                    fullWidth
                    variant="outlined"
                  >
                    {logsText.showNext(logLinesLimit)}
                  </Button>
                </LogCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default OwmlLog;
