import { useNavigate, useLocation } from 'react-router-dom';

/**
 * home 버튼을 누르면 기본적으로 dashboard 로 이동한다.
 * login인 되어 있는 사용자가 user 인지 admin인지 구별후
 * 사용자/dashboard로 이동
 * 단 사용자/dashboard일때는 실행하지 않는다.
 * @returns function: homeClick 
 */
const useHomeClick = () => {
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const homeClick = () => {
        if(path.includes('user') && path !== '/user/dashboard'){
            navigate('/user/dashboard');
        }else if(path.includes('admin') && path !== '/admin/dashboard'){
            navigate('/admin/dashboard');
        }
    }

    return homeClick;
}

export default useHomeClick;