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

const UserVideoStreamProccess = ({id, streamNumber}) => {
    const dispatch = useDispatch();
    const childCompoentRef = useRef();

    const getSnapshotInfo = useSelector(({user}) => user.getSnapshotInfo);
    const getVideoConfigInfo = useSelector(({user}) => user.getVideoConfigInfo.List[streamNumber - 1])

    const [image, setImage] = useState('/static/images/background.jpg')
    const [restFullCheck, setRestFullCheck] = useState(getVideoConfigInfo.alarm.enable);
    const [overlayCheck, setOverlayCheck] = useState(getVideoConfigInfo.overlay.enable);

    const [type, setType] = useState(1);
    const [areaPosition, setAreaPosition] = useState([]);

    /** 사진 크기 설정 */
    const width = 840;
    const height = 470;

    
    useEffect(() => {
        onGetSnapShot(); // 스냅샷 가져오기 
    },[])
    useEffect(() => {
        if(getSnapshotInfo){
            const blob = new Blob( [ getSnapshotInfo ] );
            const url = URL.createObjectURL( blob );

            setImage(url);
        }
    },[getSnapshotInfo])

    const handleRestFullCheck = () => { setRestFullCheck(!restFullCheck) }
    const handleOverlayCheck = () => { setOverlayCheck(!overlayCheck) }
    const handleChange = (e) => { setType(e.target.value) }
    const handleReset = () => {
        setAreaPosition([]);
        childCompoentRef.current.clearArea();
    }

    const onSnapShot = () => {
        dispatch(userAction.snapshot({id, idx: streamNumber}));
    }
    const onGetSnapShot = useCallback(() => {
        console.log(id, streamNumber);
        dispatch(userAction.getSnapshot({id, idx: streamNumber}));
    },[])

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
                    {/* 다른 component로 분리 예정 */}
                    <UserVideoCanvas 
                        ref={childCompoentRef}
                        width={width} 
                        height={height} 
                        type={type} 
                        setAreaPosition={setAreaPosition}
                        areaPosition={areaPosition}
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
                    <Select id="type" defaultValue={1} onChange={handleChange} sx={{ mt: 2 }}>
                        <MenuItem value={1}>탐지 영역 설정</MenuItem>
                        <MenuItem value={2}>ROI 설정</MenuItem>
                        <MenuItem value={3}>Line ROI 설정</MenuItem>
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
                            key={getVideoConfigInfo.alarm.enable + 'rest'}
                            onChange={handleRestFullCheck}
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
                        key={getVideoConfigInfo.alarm.address + 'rest-textfield'}
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
                            key={getVideoConfigInfo.alarm.alarm + 'alarm'}
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
                            key={getVideoConfigInfo.alarm.noti + 'noti'}
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
                            key={getVideoConfigInfo.overlay.enable + 'overlay'}
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
                            {serviceProperties.user.video.types.map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            defaultChecked={getVideoConfigInfo.overlay.functions[type]}
                                            key={getVideoConfigInfo.overlay.functions[type] + 'checkbox'}
                                            name={`over_${type}`}
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
                        //onClick={() => onApplyControl(streamNum, isDraw, ptData)}
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