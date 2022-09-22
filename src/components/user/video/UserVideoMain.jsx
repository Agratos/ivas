import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Stack, Divider, Typography } from '@mui/material';

import GridItem from 'components/layout/container/GridItem';
import UserVideoAlarm from './UserVideoAlarm';
import UserVideoStream from './UserVideoStream';

import userAction from 'store/actions/user';

const UserVideoMain = () => {
    const dispacth = useDispatch();
    const id = useSelector(({user}) => user.login.id)

    useEffect(() => {
        dispacth(userAction.getVideoConfig({id})); // 데이터 호출
    },[])

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
                        {/* {count} */}1
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" color="gray">
                        ※ 변경하시려면 서비스 변경 신청을 이용하십시오.
                    </Typography>
                </Stack>
            </GridItem>
            <Divider />
            {/* stream 갯수가 늘어나면 map으로 변경 예정 */}
            <GridItem md={12} xs={12}>
                <UserVideoAlarm id={id} />
            </GridItem>
            <GridItem md={12} xs={12}>
                <UserVideoStream streamNumber={1} />
            </GridItem>
        </Paper>
    )
}

export default UserVideoMain;