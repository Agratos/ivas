import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import * as adminActionType from '../action-types/admin';
import adminAPI from 'apis/adminApi';
import createRequestSaga from 'utils/createRequestSaga';

const loginSaga = createRequestSaga(adminActionType.LOGIN, adminAPI.login);
const getResourceListSaga = createRequestSaga(adminActionType.RESOURCE,adminAPI.getResourceList,);
const getAlarmListSaga = createRequestSaga(adminActionType.ALARM, adminAPI.getAlarmList);
const getApprovalListSaga = createRequestSaga(adminActionType.APPROVAL_LIST,adminAPI.getApprovalList,);
const serviceApprovalSaga = createRequestSaga(adminActionType.APPROVAL,adminAPI.serviceApproval,);
const getTotalUsageListSaga = createRequestSaga(adminActionType.USAGE_LIST,adminAPI.getTotalUsageList,);
const getUsageInfoSaga = createRequestSaga(adminActionType.USAGE, adminAPI.getUsageInfo);
const serviceUserDelSaga = createRequestSaga(adminActionType.USERDEL, adminAPI.serviceUserDel);

export function* adminSaga() {
    yield takeLatest(adminActionType.LOGIN, loginSaga);
    yield takeLatest(adminActionType.RESOURCE, getResourceListSaga);
    yield takeLatest(adminActionType.ALARM, getAlarmListSaga);
    yield takeLatest(adminActionType.APPROVAL_LIST, getApprovalListSaga);
    yield takeLatest(adminActionType.APPROVAL, serviceApprovalSaga);
    yield takeLatest(adminActionType.USAGE_LIST, getTotalUsageListSaga);
    yield takeLatest(adminActionType.USAGE, getUsageInfoSaga);
    yield takeLatest(adminActionType.USERDEL, serviceUserDelSaga);
}

const initialState = {
    login: {
      id: '',
      password: '',
    },

    loginInfo: null,
    loginError: null,
  
    resourceList: [],
    resourceListError: null,
  
    alarmList: [],
    alarmListError: null,
  
    approval: {
      reason: '',
    },
    approvalList: [],
    approvalListError: null,
  
    approvalInfo: null,
    approvalError: null,
  
    totalUsageList: [],
    totalUsageListError: null,
  
    usageInfo: {
      control: [],
      videoProcessing: [],
      videoAnalysis: [],
    },
    usageError: null,
  
    userdelInfo: null,
    userdelError: null,
};

const admin = handleActions(
    {
        [adminActionType.CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, (draft) => { draft[form][key] = value; }
        ),
        [adminActionType.INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [adminActionType.LOGIN_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            loginInfo: message,
            loginError: null,
        }),
        [adminActionType.LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loginError: error,
        }),
        [adminActionType.RESOURCE_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            resourceList: info.system, // json이 list로 한번 더 감싸져 있음 (info.system) 
            resourceListError: null,
        }),
        [adminActionType.RESOURCE_FAILURE]: (state, { payload: message }) => ({
            ...state,
            resourceListError: message,
        }),
        [adminActionType.ALARM_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            alarmList: info,
            alarmListError: null,
        }),
        [adminActionType.ALARM__FAILURE]: (state, { payload: message }) => ({
            ...state,
            alarmListError: message,
        }),
        [adminActionType.APPROVAL_LIST_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            approvalList: info,
            approvalListError: null,
        }),
        [adminActionType.APPROVAL_LIST_FAILURE]: (state, { payload: message }) => ({
            ...state,
            approvalListError: message,
        }),
        [adminActionType.APPROVAL_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            approvalInfo: message,
            approvalError: null,
        }),
        [adminActionType.APPROVAL_FAILURE]: (state, { payload: error }) => ({
            ...state,
            approvalError: error,
        }),
        [adminActionType.USAGE_LIST_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            totalUsageList: info,
            totalUsageListError: null,
        }),
        [adminActionType.USAGE_LIST_FAILURE]: (state, { payload: message }) => ({
            ...state,
            totalUsageListError: message,
        }),
        [adminActionType.USAGE_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            usageInfo: info,
            usageError: null,
        }),
        [adminActionType.USAGE_FAILURE]: (state, { payload: message }) => ({
            ...state,
            usageError: message,
        }),
        [adminActionType.USERDEL_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            userdelInfo: info,
            userdelError: null,
        }),
        [adminActionType.USERDEL_FAILURE]: (state, { payload: message }) => ({
            ...state,
            userdelError: message,
        }),
        [adminActionType.CLEAR]: () => ({
            initialState
        })
    },
    initialState,
);

export default admin;