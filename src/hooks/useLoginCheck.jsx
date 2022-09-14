import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

const useLoginCheck = () => {
    const navigate = useNavigate();
    const userLoginInfo = useSelector(({user}) => user.loginInfo);
    const adminLoginInfo = useSelector(({admin}) => admin.loginInfo);

    useEffect(() => {
        console.log(`user: `,userLoginInfo);
        console.log(`admin: `,adminLoginInfo);
        if(userLoginInfo){
            navigate('/user/dashboard');
        }else if(adminLoginInfo){
            navigate('/admin/dashboard');
        }else{
            navigate('/');
        }
    },[userLoginInfo, adminLoginInfo])

    return userLoginInfo ? 'user' : adminLoginInfo ? 'admin' : false
}

export default useLoginCheck;