import { createAction } from 'redux-actions';
import * as adminActionType from 'store/action-types/admin';

const adminAction = {
    changeField: createAction(
        adminActionType.CHANGE_FIELD,
        ({ form, key, value }) => ({ form, key, value }),
    ),

    initializeForm: createAction(
        adminActionType.INITIALIZE_FORM, 
        ( form ) => ( form )
    ),

    login: createAction(
        adminActionType.LOGIN, 
        ({ id, password }) => ({ id ,password })
    ),

    getResourceList: createAction(adminActionType.RESOURCE),

    getAlarmList: createAction(adminActionType.ALARM),

    getApprovalList: createAction(adminActionType.APPROVAL_LIST),

    serviceApproval: createAction(
        adminActionType.APPROVAL, 
        ({ id, idx, permit, reason }) => ({ id, idx, permit, reason })
    ),

    serviceUserDel: createAction(
        adminActionType.USERDEL, 
        ({ idx }) => ({ idx })
    ),

    getTotalUsageList: createAction(adminActionType.USAGE_LIST),

    getUsageInfo: createAction(
        adminActionType.USAGE, 
        ( id ) => ( id )
    ),

    clear: createAction(adminActionType.CLEAR)
}

export default adminAction;
  