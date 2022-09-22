import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Divider, Typography, Checkbox, TextField, Button, Card, CardContent,} from '@mui/material';

import userAction from 'store/actions/user';

const UserVideoAlarm = ({ id }) => {
    const dispatch = useDispatch();
    const [alarmData, setAlarmData] = useState(useSelector(({user}) => user.getVideoConfigInfo.sys_alarm));

    useEffect(() => {
        console.log(alarmData);
    },[alarmData])

    const onApplyAlarm = () => {
        dispatch(userAction.setAlarmConfig({
            id,
            enable: true,
            address: 'agratos'
        }))
    }

    return(
        <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                    color="palevioletred"
                >
                    시스템 알람
                </Typography>
                <Divider />
                <Stack direction={{ xs: 'row', sm: 'row' }} sx={{ pt: 2 }}>
                    <Checkbox
                        name='alarmCheck'
                        defaultChecked={alarmData.enable}
                        //onChange={(e) => onChange(e, 'video')} 
                        size="small"
                    />
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ pt: '10px', fontWeight: 400 }}
                    >
                        RestFul API 발송
                    </Typography>
                    <TextField
                        label="Addr"
                        name="almRestAddr"
                        //value={alarmData.address}
                        //onChange={(e) => onChange(e, 'video')}
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2, width: '30%' }}
                    />
                    <Button
                        onClick={() => onApplyAlarm()}
                        variant="contained" 
                        sx={{ alignSelf: 'center', ml: 1 }}
                    >
                        적용
                    </Button>          
                </Stack>
            </CardContent>
        </Card>
    )
}

export default React.memo(UserVideoAlarm);