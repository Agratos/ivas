import React, { useState } from 'react';
import {   
    Box, Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Typography, Paper, Button
} from '@mui/material';
import {
    getComparator, stableSort, emptyRows, handleChangeRowsPerPage,
    EnhancedTableHead, EnhancedTableToolbar
} from './Table';

import { headCells } from 'assets/properties/alarmTableProperties';

const AlarmTable = ({ alarmList, handleAlarm }) => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('startDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const eptRows = emptyRows(page, rowsPerPage, alarmList.length);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', my: 2 }} elevation={10}>
                <EnhancedTableToolbar title="장애현황" />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(alarmList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={row.startDate}>
                                            <TableCell component="th" scope="row">
                                                {row.startDate}
                                            </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                {row.termination === 0 ? (
                                                    '자동종료'
                                                ) : row.termination === 1 ? (
                                                    '수동종료'
                                                ) : (
                                                    <Typography variant="h6" color="red">
                                                        현재발생중
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell padding="none">
                                                {row.termination === 2 ? (
                                                <Button
                                                    onClick={() => handleAlarm(row.id)}
                                                    variant="contained"
                                                >
                                                    종료
                                                </Button>
                                                ) : (
                                                '-'
                                                )}
                                            </TableCell>
                                            <TableCell>{row.endDate}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {eptRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * eptRows,
                                    }}
                                >
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={alarmList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={(event) =>
                        handleChangeRowsPerPage(event, setRowsPerPage, setPage)
                }
                />
            </Paper>
        </Box>
    );
};

export default AlarmTable;
