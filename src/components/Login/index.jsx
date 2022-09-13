import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogContent, Grid, TextField, Typography, Divider } from '@mui/material';
import { pink, blue } from '@mui/material/colors';
import { serviceProperties } from 'assets/properties/serviceProperties';
import { initializeForm, login } from 'store/actions/user';

import ColorDialogAction from 'components/modal/login/ColorDialogAction';
import ColorDialogTitle from 'components/modal/login/ColorDialogTitle';

const Login = ({open, onClose, target}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dialogProperties = {
        admin: {
            color1: blue[800],
            color2: blue[100],
            title: '시스템 관리자 로그인'
        },
        user: {
            color1: pink[600],
            color2: pink[100],
            title: "서비스 사용자 로그인"
        }
    }
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [duration, setDuration] = useState(500);
    const [flag, setFlag] = useState(false);

    const idRef = useRef();
    const passwordRef = useRef();

    const loginInfo = useSelector(({user}) => user.loginInfo);

    useEffect(() => {
        dispatch(initializeForm('login'))
    },[dispatch])

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = (event, reason) => {
        setAlertOpen(false);
        if (flag) navigate(`/${target}/dashboard`); // 페이지 이동
    };

    const onLogin = () => {
        const id = idRef.current.value;
        const password = passwordRef.current.value;

        if(target === 'user'){
            dispatch(login({id, password}));

        }else{
            console.log('여기는 시스템 관리자 로그인 로직');
        }
    };

    const handleClose = (event, reason) => {
        // 뒷배경 클릭시 모달 종료 막기
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
                        inputRef={passwordRef}
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
        </Dialog>
    )
}

export default Login;