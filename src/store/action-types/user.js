import { createRequestActionTypes} from "utils/createRequestSaga"

export const CHANGE_FIELD = 'user/CHANGE_FIELD';
export const INITIALIZE_FORM = 'user/INITIALIZE_FORM';
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('user/LOGIN');
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('user/LOGOUT');
export const [RESOURCE, RESOURCE_SUCCESS, RESOURCE_FAILURE] = createRequestActionTypes('admin/RESOURCE');  
export const [GET_VIDEO_CONFIG, GET_VIDEO_CONFIG_SUCCESS, GET_VIDEO_CONFIG_FAILURE] = createRequestActionTypes('user/GET_VIDEO_CONFIG');
export const [SET_INPUT_CONFIG, SET_INPUT_CONFIG_SUCCESS, SET_INPUT_CONFIG_FAILURE] = createRequestActionTypes('user/SET_INPUT_CONFIG');
export const [SET_OUTPUT_CONFIG, SET_OUTPUT_CONFIG_SUCCESS, SET_OUTPUT_CONFIG_FAILURE] = createRequestActionTypes('user/SET_OUTPUT_CONFIG');
export const [SET_ALARM_CONFIG, SET_ALARM_CONFIG_SUCCESS, SET_ALARM_CONFIG_FAILURE] = createRequestActionTypes('user/SET_ALARM_CONFIG');  
export const [RESIGN, RESIGN_SUCCESS, RESIGN_FAILURE] = createRequestActionTypes('user/RESIGN');
export const [ALTER, ALTER_SUCCESS, ALTER_FAILURE] = createRequestActionTypes('user/ALTER');
export const [SNAPSHOT, SNAPSHOT_SUCCESS, SNAPSHOT_FAILURE] = createRequestActionTypes('user/SNAPSHOT');
export const [GET_SNAPSHOT, GET_SNAPSHOT_SUCCESS, GET_SNAPSHOT_FAILURE] = createRequestActionTypes('user/GET_SNAPSHOT');
export const [SET_CTL_CONFIG, SET_CTL_CONFIG_SUCCESS, SET_CTL_CONFIG_FAILURE] = createRequestActionTypes('user/SET_CTL_CONFIG');
