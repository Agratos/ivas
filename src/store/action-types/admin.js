import { createRequestActionTypes} from "utils/createRequestSaga"

export const CHANGE_FIELD = 'admin/CHANGE_FIELD';
export const INITIALIZE_FORM = 'admin/INITIALIZE_FORM';
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('admin/LOGIN');
export const [RESOURCE, RESOURCE_SUCCESS, RESOURCE_FAILURE] = createRequestActionTypes('admin/RESOURCE');
export const [ALARM, ALARM_SUCCESS, ALARM__FAILURE] = createRequestActionTypes('admin/ALARM');
export const [APPROVAL_LIST, APPROVAL_LIST_SUCCESS, APPROVAL_LIST_FAILURE] = createRequestActionTypes('admin/APPROVAL_LIST');
export const [APPROVAL, APPROVAL_SUCCESS, APPROVAL_FAILURE] = createRequestActionTypes('admin/APPROVAL');
export const [USAGE_LIST, USAGE_LIST_SUCCESS, USAGE_LIST_FAILURE] = createRequestActionTypes('ADMIN/USAGE_LIST');
export const [USAGE, USAGE_SUCCESS, USAGE_FAILURE] = createRequestActionTypes('ADMIN/USAGE');
export const [USERDEL, USERDEL_SUCCESS, USERDEL_FAILURE] = createRequestActionTypes('ADMIN/USERDEL');