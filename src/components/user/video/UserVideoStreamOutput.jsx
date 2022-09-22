import React from 'react';
import { Stack, Typography, Checkbox, TextField, Button, Avatar,} from '@mui/material';
  
import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

const UserVideoStreamOutput = () => {
    return (
        <GridContainer justifyContent="center">
            <GridItem md={4} xs={12}>
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Avatar
                        variant="square"
                        alt="video"
                        src="/static/images/avatar/editing.png"
                        sx={{
                            alignSelf: 'center',
                            width: 100,
                            height: 100,
                            mr: 3,
                            mb: 2,
                        }}
                    />
        
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '10px' }}
                        >
                            RTSP 서버
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="RTSP addr"
                        name="outRtspAddr"
                        //value={configData.output.rtsp.address}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        //disabled={!checked.rtsp}
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="checkOut"
                            //checked={configData.output.rtsp.auth.enable}
                            //onChange={(e) => handleChange(e)} 
                            size="small"
                            sx={{ marginTop: '10px' }}
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '20px' }}
                        >
                            다이제스트 인증
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="ID"
                        name="outID"
                        //value={configData.output.rtsp.auth.id}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                        //disabled={!checked.digest}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="outPassword"
                        //value={configData.output.rtsp.auth.password}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        //disabled={!checked.digest}
                        type="password"
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '40px' }}
                        >
                            Web RTC
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        label="Web RTC"
                        name="outRtcAddr"
                        //value={configData.output.webrtc}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        //disabled={!checked.rtc}
                    />
                    <Button
                        //onClick={() => onApplyWebRTC(streamNum)}
                        variant="contained" 
                        sx={{ mt: 4, alignSelf: 'center' }}
                    >
                        적용
                    </Button>
                </Stack>
            </GridItem>
        </GridContainer>
      );
}

export default React.memo(UserVideoStreamOutput);