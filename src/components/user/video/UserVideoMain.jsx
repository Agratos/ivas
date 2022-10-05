import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Paper, Stack, Divider, Typography } from '@mui/material';

import GridItem from 'components/layout/container/GridItem';
import UserVideoAlarm from './UserVideoAlarm';
import UserVideoStream from './UserVideoStream';
import AlertSnackbar from 'components/common/AlertSnackbar';

import userAction from 'store/actions/user';
import { serviceProperties } from 'assets/properties/serviceProperties';

const UserVideoMain = () => {
    const dispatch = useDispatch();
    const id = useSelector(({user}) => user.login.id);
    const data = useSelector(({user}) => user.getVideoConfigInfo);

    const [alertModal, setAlertModal] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        dispatch(userAction.getVideoConfig({id})); // 데이터 호출
    },[])

    const handleAlertOpen = ({severity, message=null}) => {
        console.log('test');
        switch(severity){
            case 'success':
                setAlertModal(true);
                setSeverity('success');
                setMessage(message ? message : serviceProperties.user.rtsp.success);
                break;
            case 'error':
                setAlertModal(true);
                setSeverity('error');
                setMessage(message ? message : serviceProperties.user.rtsp.error);
        }
    }
    const handleAlertClose = () => { setAlertModal(false) };

    return (
        <Paper
            sx={{ width: '100%', m: 2, mt: 4, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <GridItem md={12} xs={12}>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 600 }}
                    >
                        승인된 영상 스트림 갯수 :
                    </Typography>
                    <Typography color="royalblue" fontWeight="bold" ml={1} mr={3}>
                        {data && data.List.length}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" color="gray">
                        ※ 변경하시려면 서비스 변경 신청을 이용하십시오.
                    </Typography>
                </Stack>
            </GridItem>
            <Divider />
            {/* 시스템 알람이 다른 Stream으로 설정 할 경우 변경 예정 */}
            {data !== null &&
                // data.List.map((index) => (
                //     <StreamWrapper key={`stream${index}`}>
                //         <GridItem md={12} xs={12}>
                //             <UserVideoAlarm id={id} />
                //         </GridItem>
                //         <GridItem md={12} xs={12}>
                //             <UserVideoStream id={id} streamNumber={index + 1} />
                //         </GridItem>
                //     </StreamWrapper>
                // ))

                <StreamWrapper>
                    <GridItem md={12} xs={12}>
                        <UserVideoAlarm id={id} handleAlertOpen={handleAlertOpen} />
                    </GridItem>
                    <GridItem md={12} xs={12}>
                        <UserVideoStream id={id} handleAlertOpen={handleAlertOpen} />
                    </GridItem>
                </StreamWrapper>
            }
            <AlertSnackbarWrapper>
                <AlertSnackbar
                    open={alertModal}
                    onClose={handleAlertClose}
                    duration={2000}
                    severity={severity}
                    message={message}
                />
            </AlertSnackbarWrapper>
        </Paper>
    )
}
const StreamWrapper = styled.div``;
const AlertSnackbarWrapper = styled.div``;

export default UserVideoMain;