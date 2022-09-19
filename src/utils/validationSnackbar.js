import { serviceProperties } from 'assets/properties/serviceProperties';

/** 
 * snackbar handle 함수
 * 
 * 전달 받아야하는 props
 * type, target => serviceProperties[`${type}`].success[`${target}`] 사용됨
 * result: success, error
 * 
 * 함수
 * setSeverity: 성공 여부 success, error
 * setMessage: 전달할 메시지
 * setFlag: 성공 실패 여부 true, false
 * setDuration: 지속 시간: 1000, 1초
 * handleAlertOpen: alert 오픈
 */
const validationSnackbar = ({type, target, result, setSeverity, setMessage, handleAlertOpen}) => {
    switch(result){
        case 'success' :
            setSeverity('success');
            setMessage(serviceProperties[`${type}`].success[`${target}`]);
            handleAlertOpen();
            break;
        case 'error' :
            setSeverity('error');
            setMessage(serviceProperties[`${type}`].error[`${target}`]);
            handleAlertOpen();
            break;
        default:
            return null;
    }
}

export default validationSnackbar;