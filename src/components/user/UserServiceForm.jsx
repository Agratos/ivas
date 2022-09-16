import React from 'react';
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

import { serviceProperties } from 'assets/properties/serviceProperties';

const UserServiceForm = () => {
    return (
        <Paper
            sx={{ width: '100%', m: 2, mt: 4, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <GridItem md={12} xs={12}>
                <Typography color="navy" fontWeight="bold" sx={{ pb: '10px' }}>
                    {/* 서비스 변경 신청 ID: [ {loginId} ] */}
                    서비스 변경 신청 ID: [ {'테스트중'} ]
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
                        //value={form.oldPassword}
                        //onChange={onChange}
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
                        //value={form.password}
                        //onChange={onChange}
                        variant="outlined"
                        size="small"
                        type="password" 
                    />
                    <TextField
                        fullWidth
                        required
                        label="새 비밀번호 확인"
                        name="confirmPassword"
                        //value={form.confirmPassword}
                        //onChange={onChange}
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
                                    name="count"
                                    //value={form.count}
                                    //onChange={onChange}
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
                        //onClick={() => onResign(loginId)}
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
        </Paper>
    )
}

export default UserServiceForm;