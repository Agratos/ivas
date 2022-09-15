import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import { List, ListItem } from '@mui/material';
import {
    Dashboard,
    PlaylistAddCheckOutlined,
    VideoStable,
    BorderColorOutlined,
    Logout,
} from '@mui/icons-material';

import userAction from 'store/actions/user';
import adminAction from 'store/actions/admin';
import styles from 'styles/jss/headerLinkStyle';

import Button from './CustomButton';

const HeaderLinks = ({ type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = makeStyles(styles)();
    const path = useLocation().pathname;

    // 로그 아웃
    const onLogOut = () => {
        if(path.includes('user')){
            dispatch(userAction.clear());
        }else if(path.includes('admin')){
            dispatch(adminAction.clear());
        }
        navigate('/');
    };

    return (
        <List className={classes.list}>
        {type === 0 ? (
            <Wrapper>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={() => navigate('/user/dashboard')}
                    >
                        <Dashboard className={classes.icons} /> 대시보드
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={() => navigate('/user/video')}
                    >
                        <VideoStable className={classes.icons} /> 
                        영상 설정
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={() => navigate('/user/service')}
                    >
                    <BorderColorOutlined className={classes.icons} />
                        서비스 변경 신청
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        onClick={() => onLogOut()}
                        color="transparent" 
                        className={classes.navLink}
                        variant="contained" sx={{ mt: '2px' }}
                    >
                    <Logout className={classes.icons} />
                        로그아웃
                    </Button>
                </ListItem>
            </Wrapper>      
        ) : (
            <Wrapper>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        <Dashboard className={classes.icons} /> 
                        대시보드
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={() => navigate('/admin/approval')}
                    >
                    <PlaylistAddCheckOutlined className={classes.icon} /> 
                        서비스 승인 현황
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        onClick={() => onLogOut()}
                        color="transparent" 
                        className={classes.navLink}
                        variant="contained" sx={{ mt: '2px' }}
                    >
                    <Logout className={classes.icons} />
                        로그아웃
                    </Button>
                </ListItem>
            </Wrapper>
        )}
        </List>
    );
};
const Wrapper = styled.div``;

export default HeaderLinks;
