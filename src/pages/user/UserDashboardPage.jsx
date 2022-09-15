import React from 'react';
import { Box, Divider, IconButton, Stack, Tabs, Tab, Typography } from '@mui/material';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import UserBarChart from 'components/user/UserBarChart';

import alarmList from 'assets/dummies/alarmList';


const UserDashboardPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="사용자" current="대시보드" />
            </GridItem>
            
        </GridContainer>
    )
}

export default UserDashboardPage;