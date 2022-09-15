import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { Box, Divider, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import BarChart from 'components/chart/BarChart';

import adminAction from 'store/actions/admin';

const UserBarChart = () => {
    const dispatch = useDispatch();
    const { resourceList } = useSelector(({ user }) => ({
        resourceList: user.resourceList,
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

export default UserBarChart;