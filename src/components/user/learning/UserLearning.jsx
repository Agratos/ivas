import React from 'react';
import styled, { css } from 'styled-components';

import { Paper, Stack, Typography } from '@mui/material';

import GridItem from 'components/layout/container/GridItem';
import AlertSnackbar from 'components/common/AlertSnackbar';

import UserLearningCard from './UserLearningCard';

const UserLearning = () => {
    const data = Array.from({length: 5}, (v,i) => i + 1); 

    return (
        <Paper
            sx={{ width: '100%', m: 2, mt: 4, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <LearningHeader>
                <Stack 
                    direction={{ xs: 'column', sm: 'column', md: 'row' }} 
                    style={{justifyContent:'space-between', padding: '0 16px'}}
                >
                    <TitleWrapper>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            sx={{ fontWeight: 600 }}
                            style={{margin:'auto', fontSize:'26px'}}
                        >
                            Title
                        </Typography>
                        <Typography color="royalblue" fontWeight="bold" ml={1} mr={3}>
                            <TitleInput />
                        </Typography>
                    </TitleWrapper>
                    <Typography gutterBottom variant="h5" component="div" color="gray" style={{position:'relative', right: '0px'}}>
                        <StartButton>데이터 학습 시작</StartButton>
                    </Typography>
                </Stack>
            </LearningHeader>
            <LearningBodyWrapper>
                <LearningBodyHeader>
                    <AddButton>+ Add new <span style={{color: '#1eb9f1'}}>Class</span></AddButton>
                </LearningBodyHeader>
                <LearningBody  dataLength={data.length}>
                    {data.map((number) => (
                        <UserLearningCard key={`card ${number}`} index={number}/>
                    ))}
                </LearningBody>
            </LearningBodyWrapper>
        </Paper>
    )
}
const LearningHeader = styled.div``;
const TitleWrapper = styled.div`
    display: flex;
`;
const TitleInput = styled.input`
    height: 36px;
    margin-top: 3px;
    margin-left: 16px;
    padding: 0 16px;
    font-size: 20px;
    border-radius: 8px;
    border: 0.5px solid #d3d8ff;
    :focus {
        outline: none;
    }
`;
const StartButton = styled.button`
    height: 36px;
    padding: 0 24px;
    font-size: 20px;
    border-radius: 8px;
    border: none;
    background-color: #376fd0;
    color: #fff;
    cursor: pointer;
`
const LearningBodyWrapper = styled.div`
    margin-top: 16px;
    padding: 0  16px;
    background-color: #f1f4f8;
    border-radius: 8px;
`;
const LearningBody = styled.div`
    display: flex;
    ${(props) => props.dataLength > 3 && css`
        flex-wrap: wrap;
    `}
`;
const LearningBodyHeader = styled.div`
    display: flex;
    justify-content: end;
    padding: 16px;
`;
const AddButton = styled(StartButton)`
    background-color: inherit;
    border: 0.5px solid #ccd3fa;
    color: #7961ff;
`;

export default UserLearning;