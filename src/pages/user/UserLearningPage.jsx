import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';

import UserLearning from 'components/user/learning/UserLearning';

const UserLearningPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="사용자" current="데이터 학습" />
            </GridItem>
            <UserLearning />
        </GridContainer>
    )
}

export default UserLearningPage;