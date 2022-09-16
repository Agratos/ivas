import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';



/** 
 * 경로 표시 컴포넌트 props로는 upper, current
 */
const PathBox = ({ upper, current, currentLink, detail }) => {
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const homeClick = () => {
        if(path.includes('user') && path !== '/user/dashboard'){
            navigate('/user/dashboard');
        }else if(path.includes('admin') && path !== '/admin/dashboard'){
            navigate('/admin/dashboard');
        }
    }

    switch({currentLink, detail}){
        
    }

    return (
        <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mt: 3 }}
        >
            <StyledLink underline="hover" key="1" color="inherit" onClick={() => homeClick()}>
                HOME
            </StyledLink>
            ,
            <Typography key="2" color="inherit">
                {upper}
            </Typography>
            ,
            <Typography key="3" color="text.primary">
                {current}
            </Typography>
        </Breadcrumbs>
    );
};
const StyledLink = styled(Link)`
    cursor: none;
    user-select: none;
    :hover{
        cursor: pointer;
        text-decoration: none;
    }
`;

export default PathBox;
