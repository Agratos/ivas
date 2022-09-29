import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Checkbox, TextField, Button, Avatar,} from '@mui/material';
  
import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

import userAction from 'store/actions/user';

const UserVideoStreamInput = ({id, streamNumber}) => {
    const dispatch = useDispatch();
    const inputData = useSelector(({user}) => user.getVideoConfigInfo.List[streamNumber].input);

    const addressRef = useRef();
    const enableRef = useRef();
    const authIdRef = useRef();
    const authPwdRef = useRef();

    const [enable, setEneable] = useState(inputData.auth.enable);

    const handleEnable = (e) => {
        setEneable(e.target.checked);
    }

    const onApplyRTSP = () => {
        dispatch(userAction.setInputConfig({
            id,
            idx: streamNumber + 1,
            address: addressRef.current.value,
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
                        src="/static/images/avatar/security-camera.png"
                        sx={{
                            alignSelf: 'center',
                            width: 100,
                            height: 100,
                            mr: 3,
                            mb: 2,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="RTSP addr"
                        name="inRtspAddr"
                        defaultValue={inputData.address}
                        key={`inputData.address` + inputData.address + streamNumber}
                        inputRef={addressRef}
                        variant="outlined"
                        size="small"
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="inCheck"
                            defaultChecked={inputData.auth.enable}
                            key={`inputData.auth.enable` + inputData.auth.enable + streamNumber}
                            inputRef={enableRef}
                            onChange={handleEnable}
                            size="small"
                            sx={{ marginTop: '30px' }}
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '40px' }}
                        >
                            다이제스트 인증
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="ID"
                        name="inID"
                        defaultValue={inputData.auth.id}
                        key={'inputData.auth.id' + inputData.auth.id + streamNumber}
                        inputRef={authIdRef}
                        disabled={!enable}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}   
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="inPassword"
                        defaultValue={inputData.auth.password}
                        key={'inputData.auth.password' + inputData.auth.password + streamNumber}
                        inputRef={authPwdRef}
                        disabled={!enable}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <Button
                        onClick={onApplyRTSP}
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

export default React.memo(UserVideoStreamInput);