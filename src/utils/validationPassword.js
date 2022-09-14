import { serviceProperties } from 'assets/properties/serviceProperties';

/** 비밀번호 유효성 검사 */
const validationPassword = (pwd1, pwd2) => {
    if(!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(pwd1)){
        return '비밀번호가 조건에 맞지 않습니다.';
    }

    if(pwd1 !== pwd2){
        return serviceProperties.login.validation.info.confirmpassword;
    }

    return '';
}

export default validationPassword;