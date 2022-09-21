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
import AlertSnackbar from 'components/common/AlertSnackbar';

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

    const idRef = useRef();
    const pwdRef = useRef();

    /** 로그인 페이지시 alert 초기화 */
    useEffect(() => {  
        setAlertOpen(false)
    },[open])

    useEffect(() => {
        userLoginError && handleSnackbar('user','error')
    },[userLoginError])
    useEffect(() => {
        adminLoginError && handleSnackbar('admin','error')
    },[adminLoginError])

    const handleSnackbar = useCallback((target, result) => {
        validationSnackbar({
            type: 'login',
            target,
            result,
            setSeverity, 
            setMessage, 
            handleAlertOpen
        })
    },[])

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const onLogin = () => {
        const id = idRef.current.value;
        const password = pwdRef.current.value;

        if(id === ''){
            idRef.current.focus();
            handleAlertOpen();
            setSeverity('error');
            setMessage('아이디를 입력해주세요');
            return null;
        }else if(password === ''){
            pwdRef.current.focus();
            handleAlertOpen();
            setSeverity('error');
            setMessage('비밀번호를 입력해주세요');
            return null;
        }

        if(target === 'user'){
            dispatch(userAction.setUser({id, password}))
            dispatch(userAction.login({id, password}))
        }else{
            dispatch(adminAction.login({id, password}))
            dispatch(adminAction.setAdmin({id, password}))
        }     

    };

    /** 뒷 배경 클릭시 모달 종료 막기 */
    const handleClose = (event, reason) => {
        if (reason === 'backdropClick') {
            return false;
        }
        onClose();
    }

    /** 사용자 복사 붙여넣기 막기 */
    const preventCopyPast = (e) => {
        e.preventDefault();
        return false;
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {handleClose(event,reason)}}
            onCopy={preventCopyPast}
            onPaste={preventCopyPast}
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

export default LoginModal;