import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { IconButton, Stack, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import GridItem from 'components/layout/container/GridItem';
import BarChart from 'components/common/BarChart';

import adminAction from 'store/actions/admin';

const AdminBarChart = () => {
    const dispatch = useDispatch();
    const { resourceList } = useSelector(({ admin }) => ({
        resourceList: admin.resourceList,
    }));
    const [realTime, setRealTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    
    useEffect(() => {
        dispatch(adminAction.initializeForm('dashboard'));
        dispatch(adminAction.getResourceList());
    },[dispatch])

    /** TODO: 데이터 조회 추가 */
    const handleUpdate = () => {
        setRealTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        dispatch(adminAction.initializeForm('dashboard'));
        dispatch(adminAction.getResourceList());
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
            <BarChart data={resourceList} />
        </GridItem>
    )
}

export default AdminBarChart;