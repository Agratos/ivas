import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Checkbox, TextField, Button, Avatar,} from '@mui/material';
  
import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

import userAction from 'store/actions/user';

const UserVideoStreamOutput = ({id, streamNumber}) => {
    const dispatch = useDispatch();
    const outputData = useSelector(({user}) => user.getVideoConfigInfo.List[streamNumber - 1].output);

    const addressRef = useRef();
    const enableRef = useRef();
    const authIdRef = useRef();
    const authPwdRef = useRef();
    const rtcRef = useRef();

    const [enable, setEneable] = useState(outputData.rtsp.auth.enable)

    const handleEnable = (e) => {
        setEneable(e.target.checked);
    }

    /** RTSP 서버와 Web RTC 설정이 없다..? API도 이상하게 되어 있음 */
    const onApplyWebRTC = () => {
        dispatch(userAction.setOutputConfig({
            id,
            idx: streamNumber,
            //address: addressRef.current.value,
            auth: {
                enable: enableRef.current.checked,
                id: authIdRef.current.value,
                password: authPwdRef.current.value
            }
        }))
    }


    return (
        <GridContainer justifyContent="center">
            <GridItem md={4} xs={12}>
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Avatar
                        variant="square"
                        alt="video"
                        src="/static/images/avatar/editing.png"
                        sx={{
                            alignSelf: 'center',
                            width: 100,
                            height: 100,
                            mr: 3,
                            mb: 2,
                        }}
                    />
        
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '10px' }}
                        >
                            RTSP 서버
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="RTSP addr"
                        name="outRtspAddr"
                        defaultValue={outputData.rtsp.address}
                        key={outputData.rtsp.address + 'outRtspAddr'}
                        inputRef={addressRef}
                        variant="outlined"
                        size="small"
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="checkOut"
                            defaultChecked={outputData.rtsp.auth.enable}
                            key={outputData.rtsp.auth.enable + 'enable'}
                            inputRef={enableRef}
                            onChange={handleEnable}
                            size="small"
                            sx={{ marginTop: '10px' }}
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '20px' }}
                        >
                            다이제스트 인증
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="ID"
                        name="outID"
                        defaultValue={outputData.rtsp.auth.id}
                        key={outputData.rtsp.auth.id + 'outID'}
                        inputRef={authIdRef}
                        disabled={!enable}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="outPassword"
                        defaultValue={outputData.rtsp.auth.password}
                        key={outputData.rtsp.auth.password + 'outPassword'}
                        inputRef={authPwdRef}
                        disabled={!enable}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '40px' }}
                        >
                            Web RTC
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="Web RTC"
                        name="outRtcAddr"
                        defaultValue={outputData.webrtc}
                        key={outputData.webrtc + 'outRtcAddr'}
                        inputRef={rtcRef}
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        onClick={onApplyWebRTC}
                        variant="contained" 
                        sx={{ mt: 4, alignSelf: 'center' }}
                    >
                        적용
                    </Button>
                </Stack>
            </GridItem>
        </GridContainer>
      );
}

export default React.memo(UserVideoStreamOutput);