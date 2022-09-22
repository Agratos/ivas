import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog, DialogContent, Card, CardContent, Divider,
    Grid, TextField, Typography, Checkbox, 
    FormControl, FormLabel, FormControlLabel, FormGroup, Button,
    OutlinedInput, InputAdornment, InputLabel, IconButton,
    FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { deepPurple } from '@mui/material/colors';
import { serviceProperties } from 'assets/properties/serviceProperties';
import serviceAction from 'store/actions/service';
import validationSnackbar from 'utils/validationSnackbar';

import ColorDialogTitle from 'components/modal/ColorDialogTitle';
import ColorDialogAction from 'components/modal/ColorDialogAction';
import AlertSnackbar from 'components/common/AlertSnackbar';

const CreateAccountModal = ({open, onClose}) => {
    const { chkdupInfo, chkdupError } = useSelector(({service}) => ({
        chkdupInfo: service.chkdupInfo,
        chkdupError: service.chkdupError
    }))
    const dispatch = useDispatch();
    const idRef = useRef();
    const pwd1Ref = useRef();
    const pwd2Ref = useRef();
    const streamRef = useRef();
    const checkboxRef = useRef([]);

    // 유효성 검증 변수 선언
    const [helperTextConfirmPwd2, setHelperTextConfirmPwd2] = useState('');
    const [validPwd1, setValidPwd1] = useState(null);
    const [validPwd2, setValidPwd2] = useState(null);
    const [helperTextId, setHelperTextId] = useState('');
    const [validId, setValidId] = useState(null);

    // alert창 변수 선언
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const [showPassword, setShowPassword] = useState(false);

    /** 초기화 부분 */
    useEffect(() => {
        dispatch(serviceAction.clear());
        setHelperTextId(serviceProperties.login.validation.info.id);
        setValidId(null);
        setValidPwd1(null);
        setValidPwd2(null);
    },[open])

    /** 아이디 유효성 응답 처리 */
    useEffect(() => {
        if(chkdupInfo){
            setHelperTextId(serviceProperties.login.validation.info.valid);
            setValidId(true);
        }else if(chkdupError){
            setHelperTextId(serviceProperties.login.validation.info.unvalid);
            setValidId(false)
        }
    },[chkdupInfo, chkdupError])

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = (event, reason) => {
        setAlertOpen(false);
    };

    const handleSnackbar = (target, result) => {
        validationSnackbar({
            type: 'register',
            target,
            result,
            setSeverity, 
            setMessage, 
            handleAlertOpen
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const preventCopyPast = (e) => {
        e.preventDefault();
        return false;
    }

    /** 아이디 유효성 검사 */
    const handleIdValidation = () => { 
        if(idRef.current.value.length > 3){
            dispatch(serviceAction.chkdup({id: idRef.current.value}))
        }else{
            setHelperTextId('아이디는 4글자 이상 이어야 합니다.');
            setValidId(false);
        }  
    }

    /** 비밀번호 유효성 검사 */
    const hanldePasswordValidation = ({type, ref}) => {
        clearTimeout(ref.current.setTimeout);
        if(ref.current.value !== ''){
            ref.current.setTimeout = setTimeout(() => {
                switch(type){
                    case 'pwd1':
                        const resultPwd1 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(pwd1Ref.current.value);
                        resultPwd1 !== validPwd1 && setValidPwd1(resultPwd1);
                        break;
                    case 'pwd2':
                        const resultPwd2 = pwd1Ref.current.value === pwd2Ref.current.value
                        resultPwd2 !== validPwd2 && setValidPwd2(resultPwd2);
                        break;
                }
            }, 500)
        }else{
            switch(type){
                case 'pwd1':
                    setValidPwd1(null)
                    break;
                case 'pwd2':
                    setValidPwd2(null)
                    break;
            }
        }
    }

    /** 전송 유효성 검사 추가 중 */
    const onSubmit = () => {
        if(validId && validPwd1 && validPwd2){
            let checkBox = [];
            checkboxRef.current.map((box, index) => (
                box.checked && checkBox.push(index + 1)
            )) 
    
            dispatch(serviceAction.register({
                id: idRef.current.value,
                password: pwd1Ref.current.value,
                confirmPassword: pwd2Ref.current.value,
                stream: streamRef.current.value,
                functions: checkBox
            }))
            handleSnackbar('service', 'success');
            setTimeout(() => {
                onClose();
            }, 1000)
        }else if(!validId){
            idRef.current.focus();
        }else if(!validPwd1){
            pwd1Ref.current.focus();
        }else if(!validPwd2){
            pwd2Ref.current.focus();
        }
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick') {
                    return false;
                }
                onClose();
            }}
            onCopy={preventCopyPast}
            onPaste={preventCopyPast}
            maxWidth="md"
        >
        <ColorDialogTitle
            gradientColor1={deepPurple[600]}
            gradientColor2={deepPurple[100]}
            title="IVAS 서비스 신청"
        />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <Typography variant="body2" color="text.secondary">
                        {serviceProperties.service.info}
                    </Typography>
                    <Typography variant="body2" color="text.red" sx={{ pb: '15px' }}>
                        {serviceProperties.service.subInfo}
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item md={4} xs={9}>
                    <FormControl 
                        fullWidth
                        size='small' 
                        variant="outlined"
                        required
                        //style={{width: '90%'}}
                    >
                        <InputLabel htmlFor='display-name'>아이디</InputLabel>
                        <OutlinedInput
                            label='아이디'
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            inputRef={idRef}
                            style={
                                validId === null ? {} : validId ? {
                                    backgroundColor: '#00ff2243'
                                } : {
                                    backgroundColor: '#ff000043'
                                }
                            }
                        />
                        <FormHelperText>{helperTextId}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item md={2} xs={2}>
                    <Button 
                        variant="contained" 
                        sx={{ mt: '2px' }}
                        onClick={() => handleIdValidation() }
                    >
                        중복확인
                    </Button>
                </Grid>
                <Grid item md={6} xs={12} />
                <Grid item md={6} xs={12}>
                    <FormControl 
                        fullWidth
                        size='small' 
                        variant="outlined"
                        required
                    >
                        <InputLabel htmlFor='display-name'>비밀번호</InputLabel>
                        <OutlinedInput
                            label='비밀번호'
                            variant="outlined"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='off'
                            inputRef={pwd1Ref}
                            onChange={() => hanldePasswordValidation({type:'pwd1', ref:pwd1Ref})}
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
                                validPwd1 === null ? {
                                    backgroundColor: 'white'
                                } : validPwd1 ? {
                                    backgroundColor: '#00ff2243'
                                } : {
                                    backgroundColor: '#ff000043'
                                }
                            }
                        />
                        <FormHelperText>{serviceProperties.login.validation.info.password}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                    <FormControl 
                        fullWidth
                        size='small' 
                        variant="outlined"
                        disabled={!validPwd1}
                        required
                    >
                        <InputLabel htmlFor='display-name'>
                            비밀번호 확인
                        </InputLabel>
                        <OutlinedInput
                            label='비밀번호  확인  '
                            variant="outlined"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            inputRef={pwd2Ref}
                            onChange={() => hanldePasswordValidation({type:'pwd2', ref:pwd2Ref})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        disabled={!validPwd1}
                                        edge="end" 
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                              </InputAdornment>
                            }
                            style={
                                validPwd2 === null ? {
                                    backgroundColor: 'white'
                                } : validPwd2 ? {
                                    backgroundColor: '#00ff2243'
                                } : {
                                    backgroundColor: '#ff000043'
                                }
                            }
                        />
                        <FormHelperText>{helperTextConfirmPwd2}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                <Card elevation={3}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        요청 리소스 및 기능
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: '10px' }}
                    >
                        추후 수정 가능
                    </Typography>
                    <Divider />

                    <Grid container>
                        <Grid item md={12} xs={12}>
                        <FormControl
                            required
                            sx={{ m: 2 }}
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
                                InputProps={{ inputProps: { min: 0, max: 9} }}                                    InputLabelProps={{
                                    shrink: true,
                                }}
                                name="stream"
                                inputRef={streamRef}
                                defaultValue={0}
                                size="small"
                            />
                        </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12} sx={{ display: 'flex' }}>
                            <FormControl
                                required
                                sx={{ m: 2 }}
                                component="fieldset"
                                variant="standard"
                            >
                                <FormLabel component="legend">사용 기능</FormLabel>
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
                        </Grid>
                    </Grid>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </DialogContent>
        <ColorDialogAction
            gradientColor1={deepPurple[600]}
            gradientColor2={deepPurple[100]}
            closeEvent={onClose}
            closeAction={onSubmit}
            buttonTitle="서비스 신청"
        />
        <AlertSnackbar
            open={alertOpen}
            onClose={handleAlertClose}
            duration={1000}
            severity={severity}
            message={message}
        />
        </Dialog>
    )
}

export default CreateAccountModal;