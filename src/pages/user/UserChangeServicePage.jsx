import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import UserServiceForm from 'components/user/service/UserServiceForm';

const UserChangeServicePage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="사용자" current="서비스 변경 신청" />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <UserServiceForm />
            </GridItem>
        </GridContainer>
    )
}

export default UserChangeServicePage;