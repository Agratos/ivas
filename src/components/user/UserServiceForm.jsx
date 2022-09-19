import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    Card,
    CardContent,
    Divider,
    TextField,
    Typography,
    Checkbox,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Paper,
    Stack,
    Button,
} from '@mui/material';

import GridItem from 'components/layout/container/GridItem';
import ConfirmModal from 'components/modal/ConfirmModal';
import AlertSnackbar from 'components/common/AlertSnackbar';

import { serviceProperties } from 'assets/properties/serviceProperties';
import userAction from 'store/actions/user';

const UserServiceForm = () => {
    const { defaultId, defaultPassword } = useSelector(({user}) => ({
        defaultId: user.login.id,
        defaultPassword: user.login.password,
    }))
    const dispatch = useDispatch();

    //snackbar
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const [ modalOpen, setModalOpen] = useState(false);
    const handleModalClickOpen = () => { 
        if(defaultPassword === originPwdRef.current.value){
            setModalOpen(true);
        }else{

        }
    };
    const handleModalClose = () => { setModalOpen(false); };

    const originPwdRef = useRef();
    const changePwdRef = useRef();
    const confirmPwdRef = useRef();
    const streamRef = useRef();
    const checkboxRef = useRef([]);

    const onResign = () => {
        dispatch(userAction.resign(defaultId))
    }

    const onSubmit = () => {

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
                        helperText={serviceProperties.service.validation.info}
                        name="oldPassword"
                        ref={originPwdRef}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <TextField
                        fullWidth
                        required
                        label="새 비밀번호"
                        helperText={serviceProperties.login.validation.info.password}
                        name="password"
                        ref={changePwdRef}
                        variant="outlined"
                        size="small"
                        type="password" 
                    />
                    <TextField
                        fullWidth
                        required
                        label="새 비밀번호 확인"
                        name="confirmPassword"
                        ref={confirmPwdRef}
                        variant="outlined"
                        size="small"
                        type="password"
                    />
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
                        //onClick={() => onAlter(loginId) }              
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
                    open={alertOpen}
                    //onClose={handleAlertClose}
                    duration={1000}
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