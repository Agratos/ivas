import React, { useState } from 'react';
import styled from 'styled-components';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import { indigo } from '@mui/material/colors';

import UserVideoStreamInput from './UserVideoStreamInput';
import UserVideoStreamProccess from './UserVideoStreamProccess';
import UserVideoStreamOutput from './UserVideoStreamOutput';
import TabPanel from 'components/common/panel/TabPanel';

const UserVideoStream = ({id ,streamNumber}) => {
    const [ value, setValue ] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Wrapper>
            <Typography color="palevioletred" fontWeight="bold" mt={5} ml={1}>
                영상 스트림 # {streamNumber}
            </Typography>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    border: `thick double ${indigo[50]}`,
                    borderRadius: '6px',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: 'whitesmoke',
                    }}
                    centered
                >
                    <Tab label="입력 영상" id={0} sx={{ fontWeight: 700 }} />
                    <Tab label="영상 처리" id={1} sx={{ fontWeight: 700 }} />
                    <Tab label="출력 영상" id={2} sx={{ fontWeight: 700 }} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <UserVideoStreamInput id={id} streamNumber={streamNumber}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserVideoStreamProccess id={id} streamNumber={streamNumber} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UserVideoStreamOutput id={id} streamNumber={streamNumber} />
                </TabPanel>
            </Box>
        </Wrapper>
    )
}
const Wrapper = styled.div``;

export default UserVideoStream;