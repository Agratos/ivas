import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

const useLoginCheck = () => {
    const navigate = useNavigate();
    const userLoginInfo = useSelector(({user}) => user.loginInfo);
    const adminLoginInfo = useSelector(({admin}) => admin.loginInfo);
    const path = useLocation().pathname;

    useEffect(() => {
        
    },[userLoginInfo, adminLoginInfo])

    return userLoginInfo ? 'user' : adminLoginInfo ? 'admin' : false
}

export default useLoginCheck;