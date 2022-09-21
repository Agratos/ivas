import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box, Table, TableBody, TableCell, TableContainer, TablePagination,
    TableRow, Typography, Paper, Button, Stack,IconButton,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import {
    getComparator, stableSort, emptyRows, handleChangeRowsPerPage, EnhancedTableHead
} from 'components/table/Table';
import GridItem from 'components/layout/container/GridItem';
import AlertSnackbar from 'components/common/AlertSnackbar';

import realTimeFormat from 'utils/realTimeFormat';
import adminAction from 'store/actions/admin';
import { serviceProperties } from 'assets/properties/serviceProperties';
import { headCells } from 'assets/properties/adminApprovalTableProperties';

const AdminApprovalTable = ({setApprovalData , setAlertSnackbar, alertSnackbar}) => {
    const dispatch = useDispatch();
    const { form, approvalList, userdelInfo, userdelError, approvalInfo, approvalError } = useSelector(({ admin }) => ({ // approvalList 추가함
      form: admin.approval,
      approvalList: admin.approvalList,
      approvalListError: admin.approvalListError,
      approvalInfo: admin.approvalInfo,
      approvalError: admin.approvalError,
      userdelInfo: admin.userdelInfo,
      userdelError: admin.userdelError,
    }));
    // 페이징
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('requested_at');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [realTime, setRealTime] = useState(realTimeFormat());

    const eptRows = emptyRows(page, rowsPerPage, approvalList.length);

    useEffect(() => {
        dispatch(adminAction.getApprovalList());
    },[])
    
    const handleUpdate = () => {
        setRealTime(realTimeFormat());
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleApprovalData = (id, functions, stream, idx) => {
        setApprovalData({
            idx,
            id,
            functions,
            stream,
        })
    };

    const onDelete = (idx) => {
        dispatch(adminAction.serviceUserDel({idx}));
        setAlertSnackbar({
            ...alertSnackbar,
            open: true,
            severity: 'success',
            message: serviceProperties.approval.delete
        })
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Typography variant="body2" pr={1}>
                        최종 조회 일시:
                    </Typography>
                    <Typography>{realTime}</Typography>
                    <IconButton onClick={handleUpdate}>
                        <UpdateIcon />
                    </IconButton>
                </Stack>
                <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
                    {/* <EnhancedTableToolbar title="전체 서비스 승인 현황" /> */}
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headCells={headCells}
                            />
                            <TableBody>
                            {stableSort(approvalList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({idx, id, status, stream, functions, permitted_at, requested_at }, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover key={idx}>
                                            <TableCell component="th" id={labelId} scope="row">
                                                {requested_at}
                                            </TableCell>
                                            <TableCell>{id}</TableCell>
                                            <TableCell padding="none">
                                                {status === 2 ? (
                                                    '거절'
                                                ) : status === 1 ? (
                                                    '승인'
                                                ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleApprovalData(
                                                            id,
                                                            functions,
                                                            stream,
                                                            idx,
                                                        )
                                                    }
                                                >
                                                    승인심사
                                                </Button>
                                                )}
                                            </TableCell>
                                            <TableCell padding="none">
                                                {status === 2 ? (
                                                    <Button 
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() =>
                                                            onDelete(idx,)                               
                                                        }
                                                    >
                                                        삭제
                                                    </Button>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>{permitted_at}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {eptRows > 0 && (
                                <TableRow style={{height: 53 * eptRows,}}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={approvalList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={(event) =>
                            handleChangeRowsPerPage(event, setRowsPerPage, setPage)
                        }
                    />
                </Paper>
            </Box>
        </GridItem>
    );
}

export default React.memo(AdminApprovalTable);