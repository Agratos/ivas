import React, { useState, useEffect } from 'react';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import PathBox from 'components/common/PathBox';
import AdminApprovalTable from 'components/admin/approval/AdminApprovalTable';
import AdminApproval from 'components/admin/approval/AdminApproval';
import AlertSnackbar from 'components/common/AlertSnackbar';

const AdminServiceApprovalPage = () => {
    const [approvalData, setApprovalData] = useState({
        idx: 0,
        id: '',
        stream: 0,
        functions: []
    });

    const [alertSnackbar, setAlertSnackbar] = useState({
        open: false,
        duration: 500,
        severity: 'success',
        message: ''
    })

    return (
        <GridContainer justify="center" spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
                <PathBox upper="시스템 관리자" current="서비스 승인 현황" />
            </GridItem>
            <AdminApprovalTable 
                setApprovalData={setApprovalData}
                setAlertSnackbar={setAlertSnackbar}
                alertSnackbar={alertSnackbar}
            />
            <AdminApproval 
                idx={approvalData.idx}
                id={approvalData.id} 
                stream={approvalData.stream}
                functions={approvalData.functions}
                setAlertSnackbar={setAlertSnackbar}
                alertSnackbar={alertSnackbar}
            />
            <AlertSnackbar 
                open={alertSnackbar.open}
                onClose={() => setAlertSnackbar({
                    ...alertSnackbar,
                    open: false,
                })}
                duration={alertSnackbar.duration}
                severity={alertSnackbar.severity}
                message={alertSnackbar.message}
            />
        </GridContainer>
    )
}

export default AdminServiceApprovalPage;