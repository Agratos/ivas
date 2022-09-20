import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
    Card, CardContent, Divider, TextField, Typography,
    Checkbox, FormControl, FormLabel, FormControlLabel, 
    FormGroup, Paper, Stack, Button, InputLabel, OutlinedInput,
    FormHelperText, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'

import GridItem from 'components/layout/container/GridItem';
import ConfirmModal from 'components/modal/ConfirmModal';
import AlertSnackbar from 'components/common/AlertSnackbar';

import { serviceProperties } from 'assets/properties/serviceProperties';
import userAction from 'store/actions/user';

const testDummy = {
    password: 'wo8146131!',
    streamCount: 0,
    function: [],
}

const UserServiceForm = () => {
    const { defaultId, defaultPassword } = useSelector(({user}) => ({
        defaultId: user.login.id,
        defaultPassword: user.login.password,
    }))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState(null);

    const [changePwdValidation, setChangePwdValidation] = useState(null);
    const [confirmPwdValidation, setConfirmPwdValidation] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const originPwdRef = useRef();
    const changePwdRef = useRef();
    const confirmPwdRef = useRef();
    const streamRef = useRef();
    const checkboxRef = useRef([]);

    /** 서비스 탈퇴 신청시 확인 모달을 띄우는 로직 */
    const handleModalClickOpen = () => { 
        const compare = compareOriginPassword()
        compare && setModalOpen(true);
    };
    const handleModalClose = () => { setModalOpen(false) };
    const handleAlertClose = () => { setAlertModal(false) };

    const onResign = () => {
        //dispatch(userAction.resign({id: defaultId}))

        handleModalClose()
        setAlertModal(true);
        setSeverity('success');
        setMessage(serviceProperties.service.success.alter)
        
        setTimeout(() => {
            dispatch(userAction.clear());
            navigate('/');
        }, 2000)
    }

    const onAlter = () => {
        const compare = compareOriginPassword();
        compare && alterValidation()
    }

    /** 기존 비밀 번호 유효성 검사 */
    const compareOriginPassword = () => {
        if(defaultPassword === originPwdRef.current.value){
            return true
        }else if(originPwdRef.current.value === ''){
            setAlertModal(true);
            setSeverity('error');
            setMessage(serviceProperties.service.error.info)
        }else{
            setAlertModal(true);
            setSeverity('error');
            setMessage(serviceProperties.service.error.oldpwd)
        }
        return false;
    }

    /** 새로운 비밀 번호 유효성 확인 */
    const hanldePasswordValidation = ({type, ref}) => {
        clearTimeout(ref.current.setTimeout);

        if(ref.current.value !== ''){
            ref.current.setTimeout = setTimeout(() => {
                switch(type){
                    case 'changePwd':
                        const resultPwd1 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(changePwdRef.current.value);
                        resultPwd1 !== changePwdValidation && setChangePwdValidation(resultPwd1);
                        break;
                    case 'confirmPwd':
                        const resultPwd2 = changePwdRef.current.value === confirmPwdRef.current.value
                        resultPwd2 !== confirmPwdValidation && setConfirmPwdValidation(resultPwd2);
                        break;
                }
            }, 500)
        }else if(ref.current.value === ''){
            console.log('여기 작동중');
            switch(type){
                case 'changePwd':
                    setChangePwdValidation(null);
                    break;
                case 'confirmPwd':
                    setConfirmPwdValidation(null);
            }
        }
    }

    /** 비밀 번호 눈 모양 버튼 다루는 로직 */
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /** 서비스 변경 신청 유효성 검사 */
    const alterValidation = () => {
        // const changePwdRef = useRef();
        // const confirmPwdRef = useRef();
        // const streamRef = useRef();
        // const checkboxRef = useRef([]);
        
        // 기존의 데이터와 비교해서 달라진것이 없다면 서비스 변경 신청 작동 x
        
        // changePwdValidation && !confirmPwdValidation && console.log('작성한 비밀 번호가 다르다'); 
        // testDummy.password === changePwdRef.current.value && console.log('변경한 비밀 번호가 같다');
        // testDummy.streamCount == streamRef.current.value && console.log('변경한 영상 스트림 갯수가 같다');
        // JSON.stringify(testDummy.function) === JSON.stringify(checkBox) && console.log('변경한 사용 기능이 같습니다.');
        const checkBox = [];

        const result = (
            !(testDummy.streamCount == streamRef.current.value) ||
            !(JSON.stringify(testDummy.function) === JSON.stringify(checkBox)) ||
            !((changePwdValidation === true && confirmPwdValidation === true) && 
                !(testDummy.password === changePwdRef.current.value))
        )

        console.log(result);
    }


    return (
        <Paper
            sx={{ width: '100%', m: 0, mt: 2, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <GridItem md={12} xs={12}>
                <Typography color="navy" fontWeight="bold" sx={{ pb: '10px' }}>
                    서비스 변경 신청 ID: [ {`${defaultId}`} ]
                </Typography>
            </GridItem>
            <Divider />
            <GridItem md={4} xs={12} sx={{ py: 3 }}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="기존 비밀번호"
                        inputRef={originPwdRef}
                        helperText={serviceProperties.service.error.info}
                        name="oldPassword"
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <FormControl 
                        fullWidth
                        size='small' 
                        variant="outlined"
                        required
                    >
                        <InputLabel htmlFor='display-name'>새 비밀번호</InputLabel>
                        <OutlinedInput
                            label='새 비밀번호'
                            variant="outlined"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='off'
                            inputRef={changePwdRef}
                            onChange={() => hanldePasswordValidation({type:'changePwd', ref:changePwdRef})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                              </InputAdornment>
                            }
                            style={
                                changePwdValidation === null ? {
                                    backgroundColor: 'white'
                                } : changePwdValidation ? {
                                    backgroundColor: '#00ff2243'
                                } : {
                                    backgroundColor: '#ff000043'
                                }
                            }
                        />
                        <FormHelperText>{serviceProperties.login.validation.info.password}</FormHelperText>
                    </FormControl>
                    <FormControl 
                        fullWidth
                        size='small' 
                        variant="outlined"
                        required
                        disabled={!changePwdValidation}
                    >
                        <InputLabel htmlFor='display-name'>
                            새 비밀번호  확인
                        </InputLabel>
                        <OutlinedInput
                            label='새 비밀번호  확인'
                            variant="outlined"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            inputRef={confirmPwdRef}
                            onChange={() => hanldePasswordValidation({type:'confirmPwd', ref:confirmPwdRef})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        disabled={!changePwdValidation}
                                        edge="end" 
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                              </InputAdornment>
                            }
                            style={
                                confirmPwdValidation === null ? {
                                    backgroundColor: 'white'
                                } : confirmPwdValidation ? {
                                    backgroundColor: '#00ff2243'
                                } : {
                                    backgroundColor: '#ff000043'
                                }
                            }
                        />
                        {/* <FormHelperText>{helperTextConfirmPwd2}</FormHelperText> */}
                    </FormControl>
                </Stack>
            </GridItem>
            <GridItem md={12} xs={12} sx={{ py: 1 }}>
                <Card elevation={5}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            요청 리소스 및 기능
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ pb: 1 }}
                        >
                            추후 수정 가능
                        </Typography>
                        <Divider />

                        <GridItem md={12} xs={12}>
                            <FormControl
                                required
                                sx={{ m: 1 }}
                                component="fieldset"
                                variant="standard"
                            >
                                <FormLabel component="legend" sx={{ py: 1 }}>
                                    분석대상 영상스트림 갯수
                                </FormLabel>
                                <TextField
                                    id="outlined-number"
                                    hiddenLabel
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="stream"
                                    inputRef={streamRef}
                                    defaultValue={0}
                                    size="small"
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem md={12} xs={12} sx={{ display: 'flex' }}>
                            <FormControl
                                required
                                sx={{ m: 1 }}
                                component="fieldset"
                                variant="standard"
                            >
                                <FormLabel component="legend" sx={{ py: 1 }}>
                                    사용 기능
                                </FormLabel>
                                <FormGroup aria-label="position" row>
                                    {serviceProperties.service.types.map((type, index) => (
                                        <FormControlLabel
                                            key={type}
                                            control={
                                                <Checkbox
                                                    inputRef={(e) => checkboxRef.current[index] = e}
                                                />
                                            }
                                            label={
                                                <Typography variant="h5">
                                                {serviceProperties.service[type]}
                                                </Typography>
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </GridItem>
                        <Divider />
                    </CardContent>
                </Card>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="center"
                    sx={{ pt: 3 }}
                >
                    <Button
                        onClick={() => handleModalClickOpen()}
                        variant="outlined" color="error" size="large"
                    >
                        서비스 탈퇴 신청
                    </Button>
                    <Button 
                        onClick={() => onAlter() }              
                        variant="contained" size="large"
                    >
                        서비스 변경 신청
                    </Button>
                </Stack>
            </GridItem>
            <ConfirmModalWrapper>
                <ConfirmModal 
                    text={'탈퇴 확인'} 
                    open={modalOpen} 
                    onClose={handleModalClose} 
                    closeAction={onResign}
                />
            </ConfirmModalWrapper>
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
const ConfirmModalWrapper = styled.div``;
const AlertSnackbarWrapper = styled.div``;

export default UserServiceForm;