import React, { useState, useEffect } from 'react';
import { Grid, CssBaseline, Typography, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, deepPurple } from '@mui/material/colors';
import styled from 'styled-components';

import useLoginCheck from 'hooks/useLoginCheck';

import LoginMenuButton from '../../components/modal/login/LoginMenuButton';
import LoginModal from 'components/modal/login/LoginModal';
import CreateAccountModal from 'components/modal/service/CreateAccountModal';

const theme = createTheme({
    palette: {
        pink: {
            main: pink[400],
            contrastText: 'white',
        },
        deepPurple: {
            main: deepPurple[400],
            contrastText: 'white',
        },
    },
});

const LoginPage = () => { 
    const isLogin = useLoginCheck();

    const [userOpen, setUserOpen] = useState(false);
    const handleUserClickOpen = () => { setUserOpen(true); };
    const handleUserClose = () => { setUserOpen(false); };
  
    const [createAccountOpen, setCreateAccountOpen] = useState(false);
    const handleServiceClickOpen = () => { setCreateAccountOpen(true); };
    const handleServiceClose = () => { setCreateAccountOpen(false); };
  
    const [adminOpen, setAdminOpen] = useState(false);
    const handleAdminClickOpen = () => { setAdminOpen(true); };
    const handleAdminClose = () => { setAdminOpen(false); };
    
    const styles = {
        container: {
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${"/static/images/background.png"})`
        }
    };

    useEffect(() => {
        document.body.style.overflowY = 'auto';

        return () => document.body.style.overflowY = 'scroll';
    },[])
    
    return (
        isLogin ? <Loading />:
        <Wrapper>
            <ThemeProvider theme={theme}>
            <Grid
                container
                sx={styles.container}
            >
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} lg={12} />
                <Grid item xs={2} sm={2} md={4} lg={8} />
                <Grid item xs={9} sm={9} md={6} lg={3}>
                <Typography component="h2" variant="h2" color="white" mb={5}>
                    Welcome IVAS
                </Typography>
                <Stack spacing={3}>
                    <LoginMenuButton type={1} clickEvent={handleUserClickOpen} />
                    <LoginMenuButton type={2} clickEvent={handleServiceClickOpen} />
                    <LoginMenuButton type={3} clickEvent={handleAdminClickOpen} />
                </Stack>
                </Grid>
            </Grid>
            </ThemeProvider>
            <UserLoginWrapper>
                <LoginModal open={userOpen} onClose={handleUserClose} target={'user'}/>
            </UserLoginWrapper>
            <CreateAccountModal open={createAccountOpen} onClose={handleServiceClose}/>
            <AdminLoginWrapper>
                <LoginModal open={adminOpen} onClose={handleAdminClose} target={'admin'}/>
            </AdminLoginWrapper>
        </Wrapper>
    );
};
/** 리다이렉트시 배경색 같게 표시 */
const Loading = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f4f6f8;
`;
const Wrapper = styled.div``;
const UserLoginWrapper = styled.div``;
const AdminLoginWrapper = styled.div``;

export default LoginPage;
  