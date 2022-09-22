import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import UserBarChart from 'components/user/dashboard/UserBarChart';
import UserAlartTable from 'components/user/dashboard/UserAlartTable';

const UserDashboardPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="사용자" current="대시보드" />
            </GridItem>
            <UserBarChart />
            <UserAlartTable />
        </GridContainer>
    )
}

export default UserDashboardPage;