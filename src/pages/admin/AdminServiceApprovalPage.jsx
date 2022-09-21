import React, { useState, useEffect } from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import AdminApprovalTable from 'components/admin/AdminApprovalTable';
import AdminApproval from 'components/admin/AdminApproval';

const AdminServiceApprovalPage = () => {
    const [approvalData, setApprovalData] = useState({
        id: '',
        stream: 0,
        functions: []
    });

    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="시스템 관리자" current="서비스 승인 현황" />
            </GridItem>
            <AdminApprovalTable setApprovalData={setApprovalData}/>
            <AdminApproval 
                id={approvalData.id} 
                stream={approvalData.stream}
                functions={approvalData.functions} 
            />
        </GridContainer>
    )
}

export default AdminServiceApprovalPage;