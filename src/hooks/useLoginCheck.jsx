import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

const useLoginCheck = () => {
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const userLoginInfo = useSelector(({user}) => user.loginInfo);
    const adminLoginInfo = useSelector(({admin}) => admin.loginInfo);

    useEffect(() => {
        if(path === '/'){
            if(userLoginInfo){
                navigate('/user/dashboard');
            }else if(adminLoginInfo){
                navigate('/admin/dashboard');
            }else{
                navigate('/');
            }
        }else if(path.includes('/user')){
            if(!userLoginInfo){
                navigate('/')
                alert('권한이 없습니다 로그인후 사용해주세요')
            }
        }else if(path.includes('/admin')){
            if(!adminLoginInfo){
                navigate('/')
                alert('권한이 없습니다 로그인후 사용해주세요')
            }
        }
    },[path, userLoginInfo, adminLoginInfo, navigate])

    return userLoginInfo ? 'user' : adminLoginInfo ? 'admin' : false
}

export default useLoginCheck;