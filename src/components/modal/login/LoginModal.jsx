import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, DialogContent, Grid, TextField, Typography, Divider } from '@mui/material';
import { serviceProperties } from 'assets/properties/serviceProperties';
import { dialogProperties } from 'assets/properties/dialogProperties';
import userAction from 'store/actions/user';
import adminAction from 'store/actions/admin';
import validationSnackbar from 'utils/validationSnackbar';

import ColorDialogAction from 'components/modal/ColorDialogAction';
import ColorDialogTitle from 'components/modal/ColorDialogTitle';
import CommonSnackbar from 'components/common/CommonSnackbar';

const LoginModal = ({open, onClose, target}) => {
    const dispatch = useDispatch();
    const { userLoginInfo, userLoginError } = useSelector(({user}) => ({
        userLoginInfo: user.loginInfo,
        userLoginError: user.loginError
    }))
    const { adminLoginInfo, adminLoginError } = useSelector(({admin}) => ({
        adminLoginInfo: admin.loginInfo,
        adminLoginError: admin.loginError
    }))
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [duration, setDuration] = useState(500);
    const [flag, setFlag] = useState(false);

    const idRef = useRef();
    const pwdRef = useRef();

    /** 로그인 페이지시 alert 초기화 */
    useEffect(() => {  
        setAlertOpen(false)
    },[open])

    const handleSnackbar = useCallback((target, result) => {
        validationSnackbar({
            type: 'login',
            target,
            result,
            setSeverity, 
            setMessage, 
            setFlag, 
            setDuration, 
            handleAlertOpen
        })
    },[])

    useEffect(() => {
        userLoginInfo && handleSnackbar('user','success')
    },[userLoginInfo, handleSnackbar])
    useEffect(() => {
        adminLoginInfo && handleSnackbar('admin','success')
    },[adminLoginInfo, handleSnackbar])
    useEffect(() => {
        userLoginError && handleSnackbar('user','error')
    },[userLoginError, handleSnackbar])
    useEffect(() => {
        adminLoginError && handleSnackbar('admin','error')
    },[adminLoginError, handleSnackbar])

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
        // if (flag) navigate(`/${target}/dashboard`); // 페이지 이동
    };


    const onLogin = () => {
        const id = idRef.current.value;
        const password = pwdRef.current.value;

        target === 'user'
        ?   dispatch(userAction.login({id, password}))
        :   dispatch(adminAction.login({id, password}))
    };
    /** 뒷 배경 클릭시 모달 종료 막기 */
    const handleClose = (event, reason) => {
        if (reason === 'backdropClick') {
            return false;
        }
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {handleClose(event,reason)}}
            maxWidth="xs"
        >
            <ColorDialogTitle
                gradientColor1={dialogProperties[`${target}`].color1}
                gradientColor2={dialogProperties[`${target}`].color2}
                title={dialogProperties[`${target}`].title}
            />
            <DialogContent>
                <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="아이디"
                        name="id"
                        inputRef={idRef}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="비밀번호"
                        name="password"
                        inputRef={pwdRef}
                        variant="outlined"
                        type="password"
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Typography variant="body2" color="text.red">
                        {serviceProperties.login.info.default}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {serviceProperties.login.info[`${target}`]}
                    </Typography>
                </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <ColorDialogAction
                gradientColor1={dialogProperties[`${target}`].color1}
                gradientColor2={dialogProperties[`${target}`].color2}
                closeEvent={onClose}
                closeAction={onLogin}
                buttonTitle=""
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

export default LoginModal;