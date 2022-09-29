import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import { indigo } from '@mui/material/colors';

import UserVideoStreamInput from './UserVideoStreamInput';
import UserVideoStreamProccess from './UserVideoStreamProccess';
import UserVideoStreamOutput from './UserVideoStreamOutput';
import TabPanel from 'components/common/panel/TabPanel';

import userAction from 'store/actions/user';

const UserVideoStream = ({id}) => {
    const dispatch = useDispatch();
    const streamMaximum = useSelector(({user}) => user.getVideoConfigInfo.List);
    const [ streamNumber, setStreamNumber ] = useState(0);
    const [ value, setValue ] = useState(0);


    const handleStreamChange = (event, newValue) => {
        setStreamNumber(newValue);
        dispatch(userAction.getVideoConfig({id})); // 탭 변경시 데이터를 한번더 불러온다.
    };
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    const labelComponent = (number) => {
        return (
            <Typography color="palevioletred" fontWeight="bold" mt={5} ml={1} sx={{margin: 0}}>
                영상 스트림 # {number}
            </Typography>
        )
    }

    return (
        <Wrapper>
            {/* <Typography color="palevioletred" fontWeight="bold" mt={5} ml={1}>
                영상 스트림 # {streamNumber}
            </Typography> */}
            <Box sx={{ marginTop: '24px' }}>
                <Tabs
                    value={streamNumber}
                    onChange={handleStreamChange}
                    TabIndicatorProps={{style: {backgroundColor: "#99999921"}}}
                    sx={{ marginBottom: '-2px' }}
                >   
                    {streamMaximum.map((data ,index) => (
                        <StreamTab label={labelComponent(index + 1)} id={index} target={streamNumber} />
                    ))}
                </Tabs>
            </Box>
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
const StreamTab = styled(Tab)`
    padding-bottom: 6px;
    
    ${({ target, id }) => target === id && css`
        background-color: #99999921;
        border-top-right-radius: 24px;
    `};
`;

export default UserVideoStream;