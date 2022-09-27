import React from 'react';

import { visuallyHidden } from '@mui/utils';
import { Box, TableCell, TableSortLabel,Typography } from '@mui/material';

const TableHeadCell = ({ headCell, orderBy, order , setOrder, setOrderBy }) => {
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

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

export default React.memo(TableHeadCell);