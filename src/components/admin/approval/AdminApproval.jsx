import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    Typography, Checkbox, Button, Card, CardContent, Divider, FormControl,
    FormLabel, FormControlLabel, FormGroup, TextField, Stack,
  } from '@mui/material';

import GridItem from 'components/layout/container/GridItem';

import adminAction from 'store/actions/admin';
import { serviceProperties } from 'assets/properties/serviceProperties';

const AdminApproval = ({idx , id, stream, functions, setAlertSnackbar, alertSnackbar}) => {
    const dispatch = useDispatch();
    const refuseReasonRef = useRef();

    const handleCheckbox = (type) => {
        let checked = false;
        if (functions.length === 0) {
            
            return <Checkbox checked={false} disabled />;
        } else {
            functions.forEach((data) => {
                data === type && (checked = true);
            });
        
            return <Checkbox checked={checked} disabled />;
        }
    };

    console.log(id);
    
    const onRefuse = () => {
        const reason = refuseReasonRef.current.value;
        const permit = 2;
        
        if(reason === ''){
            setAlertSnackbar({
                ...alertSnackbar,
                open: true,
                duration: 1500,
                severity: 'error',
                message: serviceProperties.approval.refuse.validation
            })

            return null;
        }

        dispatch(adminAction.serviceApproval({id, idx, permit, reason}));
        setAlertSnackbar({
            ...alertSnackbar,
            open: true,
            duration: 1500,
            severity: 'success',
            message: serviceProperties.approval.refuse.success
        })
    }

    // 아무 데이터도 없을시 버튼 클릭 비활성화 추가 필요
    const onConfirm = () => {
        const reason = refuseReasonRef.current.value;
        const permit = 1;

        dispatch(adminAction.serviceApproval({id, idx, permit, reason}));
        setAlertSnackbar({
            ...alertSnackbar,
            open: true,
            duration: 1500,
            severity: 'success',
            message: serviceProperties.approval.success
        })
    }; 

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card elevation={10}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 600 }}
                    >
                        서비스 승인 심사
                    </Typography>
                    <Stack
                        direction={{ xs: 'row', sm: 'row' }}
                        spacing={1}
                        sx={{ pb: 1 }}
                    >
                        <Typography>ID:</Typography>
                        <Typography color="royalblue" fontWeight="bold">
                            {id}
                        </Typography>
                    </Stack>
                    <Divider />
                    <GridItem md={12} xs={12} sx={{ display: 'flex' }}>
                        <FormControl
                            sx={{ m: 2 }}
                            component="fieldset"
                            variant="standard"
                        >
                            <FormLabel component="legend">* 요청 기능</FormLabel>
                            <FormGroup aria-label="position" row>
                                {serviceProperties.service.types.map((type) => (
                                    <FormControlLabel
                                        key={type}
                                        control={handleCheckbox(type)}
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
                    <GridItem md={12} xs={12} sx={{ display: 'flex' }}>
                        <FormControl
                            sx={{ m: 2 }}
                            component="fieldset"
                            variant="standard"
                        >
                            <FormLabel component="legend">* 필요 리소스</FormLabel>
                            <Stack direction={{ xs: 'row', sm: 'row' }}>
                                <Typography>영상 스트림</Typography>
                                <Typography color="royalblue" fontWeight="bold" ml={1} mr={1}>
                                    {stream}
                                </Typography>
                                <Typography>개 요청</Typography>
                            </Stack>
                            <FormGroup aria-label="position" row={false}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stream >= 1 && stream < 4 && true}
                                            disabled
                                        />
                                    }
                                    label={
                                        <Typography variant="h5">
                                            {serviceProperties.service.requestedStream['1~3']}
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stream >= 4 && stream < 7 && true}
                                            disabled
                                        />
                                    }
                                    label={
                                        <Typography variant="h5">
                                            {serviceProperties.service.requestedStream['4~6']}
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stream >= 7 && stream < 10 && true}
                                            disabled
                                        />
                                    }
                                    label={
                                        <Typography variant="h5">
                                            {serviceProperties.service.requestedStream['7~9']}
                                        </Typography>
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem md={12} xs={12} lg={12}>
                        <TextField
                            fullWidth
                            label="거절 시 사유"
                            name="reason"
                            inputRef={refuseReasonRef}
                            variant="outlined"
                            sx={{ pb: 3 }}
                        />
                    </GridItem>
                    <Divider />
                    {id !== '' && (
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="center"
                            sx={{ pt: 2 }}
                        >
                            <Button
                                onClick={onRefuse}
                                variant="contained"
                                color="error"
                                size="large"
                            >
                                거절
                            </Button>
                            <Button
                                onClick={onConfirm}
                                variant="contained"
                                color="success"
                                size="large"
                            >
                                승인
                            </Button>
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </GridItem>
    )
}

export default React.memo(AdminApproval);