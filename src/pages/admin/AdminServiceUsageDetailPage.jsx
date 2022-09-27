import React from 'react';
import { useParams } from 'react-router';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import AdminServiceUsageDetail from 'components/admin/usage/AdminServiceUsageDetail';

const AdminServiceUsageDetailPage = () => {
    const { id } = useParams();
    const detailId = `개별 상세 사용 현황 ID: [ ${id} ]`;
    
    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox 
                    upper={`시스템 관리자`} 
                    current={`서비스 사용 현황`} 
                    currentLink="/admin/usage"
                    detail={detailId}/>
            </GridItem>
            <AdminServiceUsageDetail />
        </GridContainer>
    )
}

export default AdminServiceUsageDetailPage;