import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

import useHomeClick from 'hooks/useHomeClick';


/** 
 * 경로 표시 컴포넌트 props로는 upper, current
 */
const PathBox = ({ upper, current, currentLink, detail }) => {
    const navigate = useNavigate();
    const homeClick = useHomeClick();

    const renderType = () => {
        if(currentLink && detail){
            return (
                <Breadcrumbs             
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcrumb"
                >
                <StyledLink
                    key="3"
                    component="button"
                    color="steelblue"
                    underline="hover"
                    onClick={() => navigate(`${currentLink}`)}
                    sx={{ fontSize: '1rem', paddingBottom: '3px' }}
                >
                    {current}
                </StyledLink>
                ,
                <Typography key="4" color="navy" fontWeight="bold">
                    {detail}
                </Typography>
                </Breadcrumbs>
            )
        }else{
            return (
                <Typography key="3" color="text.primary">
                    {current}
                </Typography>
            )
        }
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
            {renderType()}
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
