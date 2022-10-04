import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box, Stack, MenuItem, Select, Typography, Checkbox, TextField,
    Button, FormControl, FormControlLabel, FormGroup,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArchiveIcon from '@mui/icons-material/Archive';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';
import UserVideoCanvas from './UserVideoCanvas';

import { serviceProperties } from 'assets/properties/serviceProperties';
import { userVideoProperties } from 'assets/properties/userVideoProperties';
import userAction from 'store/actions/user';

const UserVideoStreamProccess = ({id, streamNumber, handleAlertOpen}) => {
    const dispatch = useDispatch();
    const childCompoentRef = useRef();
    const alarmRef = useRef([]);
    const overlayRef = useRef([]);

    const snapshotInfo = useSelector(({user}) => user.snapshotInfo);
    const snapshotError = useSelector(({user}) => user.snapshotError);
    const getSnapshotInfo = useSelector(({user}) => user.getSnapshotInfo);
    const getSnapshotError = useSelector(({user}) => user.getSnapshotError);
    const getVideoConfigInfo = useSelector(({user}) => user.getVideoConfigInfo.List[streamNumber])
    const getVideoConfigError = useSelector(({user}) => user.getVideoConfigError);

    const [image, setImage] = useState('/static/images/background.jpg')
    const [restFullCheck, setRestFullCheck] = useState(getVideoConfigInfo.alarm.enable);
    const [overlayCheck, setOverlayCheck] = useState(getVideoConfigInfo.overlay.enable);

    const [type, setType] = useState('detect');

    /** 사진 크기 설정 */
    const width = 840;
    const height = 470;

    useEffect(() => { // 첫 로딩시 초기화
        onGetSnapShot(); // 스냅샷 가져오기
        childCompoentRef.current.loadPosition(getVideoConfigInfo.proc) // 데이터 불러서 저장
    },[])
    useEffect(() => {
        snapshotInfo && handleAlertOpen({
            severity: 'success',
            message: '스냅샷 촬영하기 성공했습니다.'
        })
    },[snapshotInfo])
    useEffect(() => {
        getSnapshotError && handleAlertOpen({
            severity: 'error',
            message: '스냅샷 촬영하기 실패했습니다.'
        })
    },[snapshotError])
    useEffect(() => {
        if(getSnapshotInfo){
            const blob = new Blob( [ getSnapshotInfo ] );
            const url = URL.createObjectURL( blob );

            setImage(url);
        }
        handleAlertOpen({
            severity:'success',
            message: '스냅샷 불러오기 성공했습니다'
        });
    },[getSnapshotInfo])
    useEffect(() => {
        getSnapshotError && handleAlertOpen({
            severity: 'error',
            message: '스냅샷 불러오기 실패했습니다.'
        })
    },[getSnapshotError])
    useEffect(() => { // 데이터 변경후 setState 다시 설정
        setRestFullCheck(getVideoConfigInfo.alarm.enable);
        setOverlayCheck(getVideoConfigInfo.overlay.enable);
        childCompoentRef.current.loadPosition(getVideoConfigInfo.proc) // 데이터 불러서 저장
    },[getVideoConfigInfo])
    useEffect(() => {
        getVideoConfigError && handleAlertOpen({
            severity: 'error',
        })
    },[getVideoConfigError])

    const handleRestFullCheck = () => { setRestFullCheck(!restFullCheck) }
    const handleOverlayCheck = () => { setOverlayCheck(!overlayCheck) }
    const handleChange = (e) => { setType(e.target.value) }
    const handleReset = () => {
        childCompoentRef.current.clearArea('all');
    }

    const onSnapShot = () => {
        dispatch(userAction.snapshot({id, idx: streamNumber + 1}));
    }
    const onGetSnapShot = useCallback(() => {
        dispatch(userAction.getSnapshot({id, idx: streamNumber + 1})); 
    },[])

    const onSendData = () => {
        const positionData = childCompoentRef.current.sendPosition();
        let overlayFunction = [];
        overlayRef.current.map((data,index) => {
            data.checked && overlayFunction.push(index + 1);
        })

        dispatch(userAction.setControlConfig({
            id,
            idx: streamNumber + 1,
            detect: positionData[0],
            roi: positionData[1],
            line: positionData[2],
            alarm: {
                enable: alarmRef.current[0].checked,
                address: alarmRef.current[1].value,
                alarm: alarmRef.current[2].checked,
                noti: alarmRef.current[3].checked
            },
            overlay: {
                enable: overlayCheck,
                functions: overlayFunction
            }
        }))
        handleAlertOpen({severity:'success'});
    }

    return(
        <GridContainer justifyContent="center">
            <GridItem lg={8} md={12} xs={12}>
                <Box
                    width={`${width}px`}
                    height={`${height}px`}
                    sx={{
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        my: 2,
                        marginTop: '32px'
                    }}
                >
                    <UserVideoCanvas 
                        ref={childCompoentRef}
                        width={width} 
                        height={height} 
                        type={type} 
                    />
                </Box>
            </GridItem>
            <GridItem lg={4} md={12} xs={12}>
                <div>
                    <Button
                        onClick={onSnapShot}          
                        variant="contained"
                        startIcon={<AddAPhotoIcon />}
                        sx={{ mt: 4, alignSelf: 'center' }}           
                    >
                        스냅샷 촬영하기
                    </Button>
                    {`\u00a0\u00a0`}
                    <Button
                        onClick={onGetSnapShot}          
                        variant="contained" 
                        startIcon={<ArchiveIcon />}
                        sx={{ mt: 4, alignSelf: 'center' }}
                    >
                        스냅샷 가져오기
                    </Button>        
                </div>         
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Select id="type" defaultValue={'detect'} onChange={handleChange} sx={{ mt: 2 }}>
                        <MenuItem value={'detect'}>탐지 영역 설정</MenuItem>
                        <MenuItem value={'roi'}>ROI 설정</MenuItem>
                        <MenuItem value={'line'}>Line ROI 설정</MenuItem>
                    </Select>
                    <Button onClick={handleReset}>모두 지우기</Button>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="gray"
                        mt={1}
                    >
                        ※ 스냅샷 촬영 및 가져오기를 한 후, 왼쪽 영상 사진에 영역을 지정해주세요.
                    </Typography>
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="rest"
                            defaultChecked={getVideoConfigInfo.alarm.enable}
                            key={getVideoConfigInfo.alarm.enable + 'rest' + streamNumber}
                            onChange={handleRestFullCheck}
                            inputRef={(e) => alarmRef.current[0] = e}
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
                            RestFul API 발송
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="Addr"
                        name="ctlRestAddr"
                        defaultValue={getVideoConfigInfo.alarm.address}
                        key={getVideoConfigInfo.alarm.address + 'rest-textfield' + streamNumber}
                        inputRef={(e) => alarmRef.current[1] = e}
                        disabled={!restFullCheck}
                        variant="outlined"
                        size="small"
                    />
                    <Stack
                        direction={{ xs: 'row', sm: 'row' }}
                        sx={{ alignSelf: 'center' }}
                    >
                        <Checkbox
                            name="alarm"
                            defaultChecked={getVideoConfigInfo.alarm.alarm}
                            key={getVideoConfigInfo.alarm.alarm + 'alarm' + streamNumber}
                            inputRef={(e) => alarmRef.current[2] = e}
                            disabled={!restFullCheck}
                            size="small"
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ marginTop: '10px', mr: 2 }}
                        >
                            Alarm
                        </Typography>
                        <Checkbox
                            name="noti"
                            defaultChecked={getVideoConfigInfo.alarm.noti}
                            key={getVideoConfigInfo.alarm.noti + 'noti' + streamNumber}
                            inputRef={(e) => alarmRef.current[3] = e}
                            disabled={!restFullCheck}
                            size="small"
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ marginTop: '10px' }}
                        >
                            Noti
                        </Typography>
                    </Stack>
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="overlay"
                            defaultChecked={getVideoConfigInfo.overlay.enable}
                            key={getVideoConfigInfo.overlay.enable + 'overlay' + streamNumber}
                            onChange={handleOverlayCheck}
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
                            영상 오버레이
                        </Typography>
                    </Stack>
                    <FormControl
                        required
                        sx={{ ml: 2 }}
                        component="fieldset"
                        variant="standard"
                    >
                        <FormGroup aria-label="position" row>
                            {serviceProperties.user.video.types.map((type,index) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            name={`over_${type}`}
                                            defaultChecked={getVideoConfigInfo.overlay.functions[type]}
                                            key={getVideoConfigInfo.overlay.functions[type] + 'checkbox' + streamNumber}
                                            inputRef={(e) => overlayRef.current[index] = e}
                                            size="small"
                                            disabled={!overlayCheck}
                                        />
                                    }
                                    label={
                                        <Typography variant="h5">
                                            {serviceProperties.user.video[type]}
                                        </Typography>
                                    }
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                    <Button
                        onClick={onSendData}
                        variant="contained" 
                        sx={{ mt: 4, alignSelf: 'center' }}
                    >
                        적용
                    </Button>
                </Stack>
            </GridItem>
        </GridContainer>
    )
}

export default React.memo(UserVideoStreamProccess);