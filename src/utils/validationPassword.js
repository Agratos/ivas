import { serviceProperties } from 'assets/properties/serviceProperties';

/** 
 * 비밀번호 유효성 검사 
 * false 일때 error message 반환 
 * true 일때 true 반환
 * */
const validationPassword = (pwd1, pwd2) => {
    if(!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(pwd1)){
        return '비밀번호가 조건에 맞지 않습니다.';
    }

    if(pwd1 !== pwd2){
        return serviceProperties.login.validation.info.confirmpassword;
    }

    return true;
}

export default validationPassword;