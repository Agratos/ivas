import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { indigo } from '@mui/material/colors';
import PropTypes from 'prop-types';

import UserVideoStreamInput from './UserVideoStreamInput';
import UserVideoStreamProccess from './UserVideoStreamProccess';
import UserVideoStreamOutput from './UserVideoStreamOutput';

const UserVideoStream = ({streamNumber}) => {
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
                    <UserVideoStreamInput streamNumber={streamNumber}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserVideoStreamProccess />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UserVideoStreamOutput />
                </TabPanel>
            </Box>
        </Wrapper>
    )
}
const Wrapper = styled.div``;
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default UserVideoStream;