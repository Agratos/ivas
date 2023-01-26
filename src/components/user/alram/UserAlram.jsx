import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Paper, Stack, Typography } from '@mui/material';

import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import UserAlramPie from './UserAlramPie';
import UserAlramHeatmap from './UserAlramHeatmap';

const UserAlram = () => {
    return (
        <Paper
            sx={{ width: '100%', m: 2, mt: 4, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <Header>
                <BoxWrapper style={{marginLeft:'0px'}}>
                    <Box>
                        <BoxNumber>
                            <Label>TOTAL</Label>
                            <NumberText>16</NumberText>
                            <Label><span style={{color:'#2dc0af'}}>↑</span> 16%</Label>
                        </BoxNumber>
                        <BoxTitle>총건수</BoxTitle>
                        <BoxIcon bgColor={'#14b8a6'}><PeopleOutlineRoundedIcon style={{color: '#f0f8f9'}} /></BoxIcon>
                    </Box>
                </BoxWrapper>
                <BoxWrapper>
                    <Box>
                        <BoxNumber>1</BoxNumber>
                        <BoxTitle>자동 종료 건수</BoxTitle>
                        <BoxIcon><InsertChartOutlinedIcon style={{color: '#fae8c7'}} /></BoxIcon>
                    </Box>
                </BoxWrapper>
                <BoxWrapper>
                    <Box>
                        <BoxNumber>1</BoxNumber>
                        <BoxTitle>수동 종료 건수</BoxTitle>
                        <BoxIcon><InsertChartOutlinedIcon style={{color: '#fae8c7'}} /></BoxIcon>
                    </Box>
                </BoxWrapper>
                <BoxWrapper>
                    <Box>
                        <BoxNumber>75.5%</BoxNumber>
                        <BoxTitle>서비스 성공률</BoxTitle>
                        <BoxIcon style={{marginLeft: '16px'}}><InsertChartOutlinedIcon style={{color: '#fae8c7'}} /></BoxIcon>
                    </Box>
                </BoxWrapper>
            </Header>
            <Body>
                <UserAlramPie />
                <UserAlramHeatmap />
            </Body>
        </Paper>
    )
}
const Header = styled.div`
    display: flex;
`;
const Body = styled.div`
    display: flex;
    justify-content: space-between;
    height: 400px;
`; 
const BoxWrapper = styled.div`
    background-color: #f9fafc;
    border-radius: 16px;
    margin: 0 16px;
    padding: 16px;
`;
const Box = styled.div`
    display: flex;
    height: 120px;
    background-color: #fff;
    border-radius: 16px;
    padding: 16px;
    font-size: 20px;
    font-weight: bolder;
    box-shadow: 2px 2px 2px 2px #eff1f4;
`;
const BoxNumber = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
`;
const BoxTitle = styled.div`
    margin: auto 16px;
`;
const BoxIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : '#ffb020'};
    margin: auto;
    padding: 8px;
    border-radius: 50%;
`;
const Label = styled.div`
    font-size: 10px;
    color: #758cab;
`;
const NumberText = styled.div`
    margin: 8px 0;
`;

export default UserAlram;