import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import UserVideoMain from 'components/user/video/UserVideoMain';

const UserVideoSettingPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="서비스 사용자" current="영상 설정" />
            </GridItem>
            <UserVideoMain />
        </GridContainer>
    )
}

export default UserVideoSettingPage;