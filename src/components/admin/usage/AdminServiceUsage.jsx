import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

import {
    Box,Table,TableHead,TableBody,TableCell,TableContainer,TablePagination,TableRow,
    TableSortLabel,Typography,Paper,Button,IconButton,Stack,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import { makeStyles } from '@mui/styles';
import { visuallyHidden } from '@mui/utils';
import { indigo } from '@mui/material/colors';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

import { getComparator, stableSort, emptyRows, handleChangeRowsPerPage } from 'components/table/Table';
import realTimeFormat from 'utils/realTimeFormat';
import usageList from 'assets/dummies/usageList';
import { headCells, styles } from 'assets/properties/usageTableProperties';

const AdminServiceUsage = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [realTime, setRealTime] = useState(realTimeFormat);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const eptRows = emptyRows(page, rowsPerPage, usageList.length);

    const handleUpdate = () => {
        // TODO: 대시보드 데이터 업데이트
        setRealTime(realTimeFormat);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const TableHeadCell = ({ headCell }) => {
        return (
            <TableCell
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{
                    borderRight: headCell.seperation === true && '1px solid',
                    borderRightColor: headCell.seperation === true && 'white',
                }}
            >
                {headCell.label === 'ID' ? (
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        <Typography variant="h6" color="white" align="left">
                            {headCell.label}
                        </Typography>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                    </TableSortLabel>
                ) : (
                    <Typography variant="h6" color="white" align="center">
                        {headCell.label}
                    </Typography>
                )}
          </TableCell>
        );
    };

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center">
                <Typography variant="body2" pr={1}>
                    최종 업데이트 일시:
                </Typography>
                <Typography>{realTime}</Typography>
                <IconButton onClick={handleUpdate}>
                    <UpdateIcon />
                </IconButton>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow sx={{ background: `${indigo[400]}` }}>
                                    <TableCell className={classes.borderHeadCell} />
                                    <TableCell className={classes.borderHeadCell}>
                                        <TableTypography color="white" title="제어 모듈" />
                                    </TableCell>
                                    <TableCell className={classes.borderHeadCell} colSpan={3}>
                                        <TableTypography color="white" title="영상 분석 모듈" />
                                    </TableCell>
                                    <TableCell align="center" />
                                </TableRow>
                                <TableRow sx={{ background: `${indigo[700]}` }}>
                                    {headCells.map((headCell) => (
                                        <TableHeadCell key={headCell.id} headCell={headCell} />
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stableSort(usageList, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => { 
                                        return (
                                            <TableRow hover key={row.id}>
                                                <TableCell className={classes.borderCell} width="15%">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell className={classes.borderCell} width="18%">
                                                    <StatusCell status={row.cmState} />
                                                </TableCell>
                                                <TableCell>
                                                    <StatusCell status={row.vaState1} />
                                                </TableCell>
                                                <TableCell>
                                                    <StatusCell status={row.vaState2} />
                                                </TableCell>
                                                <TableCell className={classes.borderCell}>
                                                    <StatusCell status={row.vaState3} />
                                                </TableCell>
                                                <TableCell padding="none" align="center" width="15%">
                                                    <Button
                                                        variant="outlined"
                                                        //onClick={() =>navigate(`/admin/usage/detail/${row.id}`)}
                                                    >
                                                        개별 상세
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                })}
                                {eptRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * eptRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={usageList.length}
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
    )
}

const TableTypography = ({ color, title }) => {
    return (
      <Typography color={color} variant="h6" align="center" fontWeight="bold">
        {title}
      </Typography>
    );
};
  
const StatusCell = ({ status }) => {
    if (status === 0) {
        return <TableTypography color="green" title="양호" />;
    } else if (status === 1) {
        return <TableTypography color="red" title="불량" />;
    } else {
        return <Typography align="center">-</Typography>;
    }
};

export default AdminServiceUsage;