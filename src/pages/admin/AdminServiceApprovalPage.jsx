import React from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';

const AdminServiceApprovalPage = () => {
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="시스템 관리자" current="서비스 승인 현황" />
            </GridItem>
        </GridContainer>
    )
}

export default AdminServiceApprovalPage;