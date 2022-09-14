import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const useLoginCheck = () => {
    const navigate = useNavigate();
    const userLoginInfo = useSelector(({user}) => user.loginInfo);
    const adminLoginInfo = useSelector(({admin}) => admin.loginInfo);

    useEffect(() => {
        if(userLoginInfo){
            setTimeout(() => {
                navigate('/user/dashboard');
            }, 1000)
        }else if(adminLoginInfo){
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000)
        }else{
            navigate('/');
        }
    },[userLoginInfo, adminLoginInfo])

    return userLoginInfo ? 'user' : adminLoginInfo ? 'admin' : false
}

export default useLoginCheck;