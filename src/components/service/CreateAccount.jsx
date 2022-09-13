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

import ColorDialogTitle from 'components/modal/login/ColorDialogTitle';
import ColorDialogAction from 'components/modal/login/ColorDialogAction';

const CreateAccount = ({open, onClose}) => {
    const { chkdupInfo, chkdupError } = useSelector(({service}) => ({
        chkdupInfo: service.chkdupInfo,
        chkdupError: service.chkdupError
    }))
    const test = useSelector(({service}) => service);
    const dispatch = useDispatch();
    const idRef = useRef();
    const pwd1Ref = useRef();
    const pwd2Ref = useRef();

    const [validId, setValidId] = useState(serviceProperties.login.validation.info.id);
    const [validPwd, setValidPwd] = useState('');
    const [chkId, setCheckId] = useState(0);

    useEffect(() => {
        dispatch(serviceAction.clear());
        setValidId(serviceProperties.login.validation.info.id)
    },[open])

    const handleDupChk = () => {
        dispatch(serviceAction.chkdup({id: idRef.current.value}))
    }

    // 중복체크 응답
    useEffect(() => {
        chkdupInfo && setValidId(serviceProperties.login.validation.info.valid); 
    }, [chkdupInfo]);
    useEffect(() => {
        chkdupError && setValidId(serviceProperties.login.validation.info.unvalid);
    }, [chkdupError]);

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
                        //helperText={validPwd}
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
                                //value={form.stream}
                                //onChange={onChange}
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
                            {serviceProperties.service.types.map((type) => (
                                <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                    //checked={selectedCheckBox.type}
                                    //onChange={(e) => handleCheckChange(e, type)}
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
            //closeAction={handleConfirm}
            buttonTitle="서비스 신청"
        />
        </Dialog>
    )
}
export default CreateAccount;