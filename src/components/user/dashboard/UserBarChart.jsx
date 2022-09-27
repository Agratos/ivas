import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { IconButton, Stack, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import GridItem from 'components/layout/container/GridItem';
import BarChart from 'components/common/BarChart';

import userAction from 'store/actions/user';

const UserBarChart = () => {
    const dispatch = useDispatch();
    const { resourceList } = useSelector(({ user }) => ({
        resourceList: user.resourceList,
    }));
    const [realTime, setRealTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    
    useEffect(() => {
        dispatch(userAction.initializeForm('dashboard'));
        dispatch(userAction.getResourceList());
    },[dispatch])

    /** TODO: 데이터 조회 추가 */
    const handleUpdate = () => {
        setRealTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        dispatch(userAction.initializeForm('dashboard'));
        dispatch(userAction.getResourceList());
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