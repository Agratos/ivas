import React, { useEffect, useState } from 'react';
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
    BarChart,
    Logout,
} from '@mui/icons-material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

import userAction from 'store/actions/user';
import adminAction from 'store/actions/admin';
import styles from 'styles/jss/headerLinkStyle';

import Button from './CustomButton';
import ConfirmModal from 'components/modal/ConfirmModal';

/** type: 0 or 1 */
const HeaderLinks = ({ type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = makeStyles(styles)();
    const path = useLocation().pathname;

    const [ modalOpen, setModalOpen] = useState(false);
    const handleModalClickOpen = () => { setModalOpen(true); };
    const handleModalClose = () => { setModalOpen(false); };
    
    // 로그 아웃
    const onLogout = () => {
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
                            onClick={() => navigate('/user/learning')}
                        >
                            <CastForEducationIcon className={classes.icons} /> 
                            데이터 학습
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
                            onClick={() => handleModalClickOpen()}
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
                            color="transparent"
                            className={classes.navLink}
                            onClick={() => navigate('/admin/usage')}
                        >
                        <BarChart className={classes.icon} /> 
                            서비스 사용 현황
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            onClick={() => handleModalClickOpen()}
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
            <LogoutWrapper>
                <ConfirmModal 
                    text={'로그아웃'} 
                    open={modalOpen} 
                    onClose={handleModalClose} 
                    closeAction={onLogout}
                />
            </LogoutWrapper>
        </List>
    );
};
const Wrapper = styled.div``;
const LogoutWrapper = styled.div``;

export default HeaderLinks;
