import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box, Stack, MenuItem, Select, Typography, Checkbox, TextField,
    Button, FormControl, FormControlLabel, FormGroup,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArchiveIcon from '@mui/icons-material/Archive';

import { cyan, indigo, yellow } from '@mui/material/colors';

import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

import { serviceProperties } from 'assets/properties/serviceProperties';
import userAction from 'store/actions/user';

const UserVideoStreamProccess = ({id, streamNumber}) => {
    const dispatch = useDispatch();
    const proccessData = useSelector(({user}) => user.getVideoConfigInfo.List[streamNumber - 1])

    const [restFullCheck, setRestFullCheck] = useState(proccessData.alarm.enable);
    const [overlayCheck, setOverlayCheck] = useState(proccessData.overlay.enable);

    console.log(proccessData)

    const handleRestFullCheck = () => { setRestFullCheck(!restFullCheck) }
    const handleOverlayCheck = () => { setOverlayCheck(!overlayCheck) }

    const onSnapShot = () => {
        dispatch(userAction.snapshot({id, idx: streamNumber}));
    }
    const onGetSnapShot = useCallback(() => {
        dispatch(userAction.getSnapshot({id, idx: streamNumber}));
    },[])
    // 영상 처리 설정 function 


    return(
        <GridContainer justifyContent="center">
            <GridItem lg={8} md={12} xs={12}>
                <Box
                    //width={`${width}px`}
                    //height={`${height}px`}
                    sx={{
                        //backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        my: 2,
                    }}
                >
                    <canvas
                        //ref={canvasRef}
                        //onMouseDown={startDrawing}
                        //onMouseUp={type === 0 ? finishLineDrawing : () => finishBoxDrawing(type)}
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
                    <Select id="type" value={1} /*onChange={handleChange}*/ sx={{ mt: 2 }}>
                        <MenuItem value={1}>탐지 영역 설정</MenuItem>
                        <MenuItem value={2}>ROI 설정</MenuItem>
                        <MenuItem value={0}>Line ROI 설정</MenuItem>
                    </Select>
                    <Button /*</Stack>onClick={handleAllReset}*/>모두 지우기</Button>
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
                            defaultChecked={proccessData.alarm.enable}
                            key={proccessData.alarm.enable + 'rest'}
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
                        defaultValue={proccessData.alarm.address}
                        key={proccessData.alarm.address + 'rest-textfield'}
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
                            defaultChecked={proccessData.alarm.alarm}
                            key={proccessData.alarm.alarm + 'alarm'}
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
                            defaultChecked={proccessData.alarm.noti}
                            key={proccessData.alarm.noti + 'noti'}
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
                            defaultChecked={proccessData.overlay.enable}
                            key={proccessData.overlay.enable + 'overlay'}
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
                                            defaultChecked={proccessData.overlay.functions[type]}
                                            key={proccessData.overlay.functions[type] + 'checkbox'}
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