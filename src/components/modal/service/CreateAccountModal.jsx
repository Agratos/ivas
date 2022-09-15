import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog, DialogContent, Card, CardContent, Divider,
    Grid, TextField, Typography, Checkbox, 
    FormControl, FormLabel, FormControlLabel, FormGroup, Button,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { serviceProperties } from 'assets/properties/serviceProperties';
import serviceAction from 'store/actions/service';
import validationPassword from 'utils/validationPassword';
import validationSnackbar from 'utils/validationSnackbar';

import ColorDialogTitle from 'components/modal/ColorDialogTitle';
import ColorDialogAction from 'components/modal/ColorDialogAction';
import CommonSnackbar from 'components/common/CommonSnackbar';

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
    const [validId, setValidId] = useState('');
    const [validPwd, setValidPwd] = useState('');
    const [chkId, setCheckId] = useState(false);

    // alert창 변수 선언
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [duration, setDuration] = useState(500);
    const [flag, setFlag] = useState(false);

    /** 초기화 부분 */
    useEffect(() => {
        dispatch(serviceAction.clear());
        setValidId(serviceProperties.login.validation.info.id)
    },[open, dispatch])

    /** 아이디 중복 체크 응답 */
    useEffect(() => {
        if(chkdupInfo){
            setValidId(serviceProperties.login.validation.info.valid);
            setCheckId(true);
        }else{
            setValidId(serviceProperties.login.validation.info.unvalid);
            setCheckId(false);
        }
    }, [chkdupInfo]);

    /** 아이디 중복 체크 */
    const handleDupChk = () => { 
        dispatch(serviceAction.chkdup({id: idRef.current.value}))
    }

    /** 전송 유효성 검사 추가 중 */
    const onSubmit = () => {
        setValidPwd(validationPassword(pwd1Ref.current.value, pwd2Ref.current.value))

        let checkBox = [];
        checkboxRef.current.map((box, index) => (
            box.checked && checkBox.push(index + 1)
        ))

        if(chkId && validPwd === ''){
            dispatch(serviceAction.register({
                id: idRef.current.value,
                password: pwd1Ref.current.value,
                confirmPassword: pwd2Ref.current.value,
                stream: streamRef.current.value,
                functions: checkBox
            }))
            handleSnackbar('service', 'success')
        }else{
            handleSnackbar('service', 'error')
        }
    }
 
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
            setFlag, 
            setDuration, 
            handleAlertOpen
        })
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
                    <TextField
                        fullWidth
                        required
                        helperText={validId}
                        label="아이디"
                        name="id"
                        inputRef={idRef}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item md={2} xs={2}>
                    <Button 
                        variant="contained" 
                        sx={{ mt: '2px' }}
                        onClick={() => handleDupChk() }
                    >
                        중복확인
                    </Button>
                </Grid>
                <Grid item md={6} xs={12} />
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        required
                        helperText={serviceProperties.login.validation.info.password}
                        label="비밀번호"
                        name="password"
                        inputRef={pwd1Ref}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        required
                        helperText={validPwd}
                        label="비밀번호 확인"
                        name="confirmPassword"
                        inputRef={pwd2Ref}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
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
                                InputLabelProps={{
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
        <CommonSnackbar
            open={alertOpen}
            onClose={handleAlertClose}
            duration={duration}
            severity={severity}
            message={message}
        />
        </Dialog>
    )
}
export default CreateAccountModal;