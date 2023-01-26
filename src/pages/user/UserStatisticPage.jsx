import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';

import UserStatistic from 'components/user/statistic/UserStatistic';

const UserStatisticPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="사용자" current="서비스 통계" />
            </GridItem>
            <UserStatistic />
        </GridContainer>
    )
}

export default UserStatisticPage;