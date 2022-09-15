import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { List, ListItem } from '@mui/material';
import userAction from 'store/actions/user';
import Button from './CustomButton';
import styles from 'styles/jss/headerLinkStyle';
import {
  Dashboard,
  //AutoGraph,
  PlaylistAddCheckOutlined,
  VideoStable,
  BorderColorOutlined,
  Logout,
} from '@mui/icons-material';

const useStyles = makeStyles(styles);

const HeaderLinks = ({ type }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { logoutInfo, logoutError } = useSelector(({ user }) => ({
    logoutInfo: user.logoutInfo,
    logoutError: user.logoutError,
  }));

  // 로그 아웃
  const onLogOut = () => {
    // let id = localStorage.getItem('user');
    dispatch(userAction.clear());
    navigate('/');
  };

  useEffect(() => {

    if (logoutInfo) {

      let state = localStorage.getItem('logged');
      console.log('로그인 상태 : ' + state)
      
      if(state === 'outing') {
        // dispacth로 초기화 예정
        localStorage.setItem('user', '');
        localStorage.setItem('pwd', '');
        localStorage.setItem('logged', 'out');
        navigate('/');
      }
    }

    if (logoutError) {

    }

  }, [logoutInfo, logoutError, navigate]);  

  return (
    <List className={classes.list}>
      {type === 0 ? (
        <>
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
              <VideoStable className={classes.icons} /> 영상 설정
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
        </>      
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              className={classes.navLink}
              onClick={() => navigate('/admin/dashboard')}
            >
              <Dashboard className={classes.icons} /> 대시보드
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              className={classes.navLink}
              onClick={() => navigate('/admin/approval')}
            >
              <PlaylistAddCheckOutlined className={classes.icon} /> 서비스 승인
              현황
            </Button>
          </ListItem>
          {/*
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              className={classes.navLink}
              onClick={() => navigate('/admin/usage')}
            >
              <AutoGraph className={classes.icon} /> 서비스 사용 현황
            </Button>
          </ListItem>
          */}
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
        </>
      )}
    </List>
  );
};

export default HeaderLinks;
