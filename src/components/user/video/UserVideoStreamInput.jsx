import React from 'react';
import { Stack, Typography, Checkbox, TextField, Button, Avatar,} from '@mui/material';
  
import GridContainer from 'components/layout/container/GridContainer';
import GridItem from 'components/layout/container/GridItem';

const UserVideoStreamInput = () => {
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
                        src="/static/images/avatar/security-camera.png"
                        sx={{
                            alignSelf: 'center',
                            width: 100,
                            height: 100,
                            mr: 3,
                            mb: 2,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="RTSP addr"
                        name="inRtspAddr"
                        //value={configData.input.address}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                    />
                    <Stack direction={{ xs: 'row', sm: 'row' }}>
                        <Checkbox
                            name="inCheck"
                            //checked={configData.input.auth.enable}
                            //onChange={(e) => handleChange(e)}
                            size="small"
                            sx={{ marginTop: '30px' }}
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ marginTop: '40px' }}
                        >
                            다이제스트 인증
                        </Typography>
                    </Stack>
            
                    <TextField
                        fullWidth
                        label="ID"
                        name="inID"
                        //value={configData.input.auth.id}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                        //disabled={!checked}
                    />
    
                    <TextField
                        fullWidth
                        label="Password"
                        name="inPassword"
                        //value={configData.input.auth.password}
                        //onChange={(e) => handleChange(e)}
                        variant="outlined"
                        size="small"
                        //disabled={!checked}
                        type="password"
                    />
                    <Button
                        //onClick={() => onApplyRTSP(streamNum)}
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

export default React.memo(UserVideoStreamInput);