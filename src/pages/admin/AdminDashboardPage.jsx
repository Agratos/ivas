import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import AdminBarChart from 'components/admin/dashboard/AdminBarChart';

const AdminDashboardPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="시스템 관리자" current="대시보드" />
            </GridItem>
            <AdminBarChart />
        </GridContainer>
    )
}

export default AdminDashboardPage;