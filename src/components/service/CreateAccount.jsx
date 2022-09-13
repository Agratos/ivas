import React from 'react';
import {
    Dialog, DialogContent, Card, CardContent, Divider,
    Grid, TextField, Typography, Checkbox, 
    FormControl, FormLabel, FormControlLabel, FormGroup, Button,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { serviceProperties } from 'assets/properties/serviceProperties';
import ColorDialogTitle from 'components/modal/login/ColorDialogTitle';
import ColorDialogAction from 'components/modal/login/ColorDialogAction';

const CreateAccount = ({open, onClose}) => {
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
                        //helperText={validId}
                        label="아이디"
                        name="id"
                        //value={form.id}
                        //onChange={onChange}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item md={2} xs={2}>
                    <Button 
                        variant="contained" 
                        sx={{ mt: '2px' }}
                        // onClick={() =>
                        //   handleDupChk(
                        //     form.id,
                        //   )                               
                        // }
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
                        //value={form.password}
                        //onChange={onChange}
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
                        //value={form.confirmPassword}
                        //onChange={onChange}
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