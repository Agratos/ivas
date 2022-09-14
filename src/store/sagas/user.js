import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import * as userActionType from '../action-types/user';
import userAPI from 'apis/userApi';
import createRequestSaga from 'utils/createRequestSaga';

const loginSaga = createRequestSaga(userActionType.LOGIN, userAPI.login);
const logoutSaga = createRequestSaga(userActionType.LOGOUT, userAPI.logout);
const getResourceListSaga = createRequestSaga(userActionType.RESOURCE, userAPI.getResourceList);
const getVideoConfigSaga = createRequestSaga(userActionType.GET_VIDEO_CONFIG, userAPI.getVideoConfig);
const setInputConfigSaga = createRequestSaga(userActionType.SET_INPUT_CONFIG, userAPI.setInputConfig);
const setOutputConfigSaga = createRequestSaga(userActionType.SET_OUTPUT_CONFIG, userAPI.setOutputConfig);
const setAlarmConfigSaga = createRequestSaga(userActionType.SET_ALARM_CONFIG, userAPI.setAlarmConfig);
const resignSaga = createRequestSaga(userActionType.RESIGN, userAPI.resign);
const alterSaga = createRequestSaga(userActionType.ALTER, userAPI.alter);
const snapshotSaga = createRequestSaga(userActionType.SNAPSHOT, userAPI.snapshot);
const getSnapshotSaga = createRequestSaga(userActionType.GET_SNAPSHOT, userAPI.getSnapshot);
const setControlConfigSaga = createRequestSaga(userActionType.SET_CTL_CONFIG, userAPI.setControlConfig);

export function* userSaga() {
    yield takeLatest(userActionType.LOGIN, loginSaga);
    yield takeLatest(userActionType.LOGOUT, logoutSaga);
    yield takeLatest(userActionType.RESOURCE, getResourceListSaga);
    yield takeLatest(userActionType.GET_VIDEO_CONFIG, getVideoConfigSaga);
    yield takeLatest(userActionType.SET_INPUT_CONFIG, setInputConfigSaga);
    yield takeLatest(userActionType.SET_OUTPUT_CONFIG, setOutputConfigSaga);
    yield takeLatest(userActionType.SET_ALARM_CONFIG, setAlarmConfigSaga);
    yield takeLatest(userActionType.RESIGN, resignSaga);
    yield takeLatest(userActionType.ALTER, alterSaga);
    yield takeLatest(userActionType.SNAPSHOT, snapshotSaga);
    yield takeLatest(userActionType.GET_SNAPSHOT, getSnapshotSaga);
    yield takeLatest(userActionType.SET_CTL_CONFIG, setControlConfigSaga);
}

export const alarmconfig = {
    enable : false,
    address : ''
}

export const videoconfig = {
    idx: 0,
    input : {
        address : '',
        auth : {
        enable : false,
        id : '',
        password : '',
        }
    },
    proc : {
        detect : [],
        roi : [],
        line : []
    },
    alarm : {
        enable : false,
        address : '',
        alarm : false,
        noti : false,
    },
    overlay : {
        enable : false,
        functions : [], // get { 1: true, 3: true, 4: true } , post [1, 3, 4]
    },
    output : {
        rtsp : {
        address : '',
        auth : {
            enable : false,
            id : '',
            password : '',
        }
        },
        webrtc : '',
    }
};
  
const initialState = {
    login: {
        id: '',
        password: '',
    },

    loginInfo: null,
    loginError: null,

    logoutInfo: null,
    logoutError: null,

    resourceList: [],
    resourceListError: null,

    getVideoConfigInfo: null,
    getVideoConfigError: null,

    setConfigInfo: null,
    setConfigError: null,

    resignInfo: null,
    resignError: null,

    alterInfo: null,
    alterError: null,

    snapshotInfo: null,
    snapshotError: null,

    getSnapshotInfo: '',
    getSnapshotError: null,

    form: {
        id: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        count: 0,
    },
    
    selectedCheckBox: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
    },
    
    video: {
        restAddr: '',
    },
    stream1: {
        inRtspAddr: '',
        inID: '',
        inPassword: '',
        ctlRestAddr: '',
        alarm: true,
        noti: true,
        outRtspAddr: '',
        outID: '',
        outPassword: '',
        outRtcAddr: '',
    },
    stream2: {
        inRtspAddr: '',
        inID: '',
        inPassword: '',
        ctlRestAddr: '',
        alarm: true,
        noti: true,
        outRtspAddr: '',
        outID: '',
        outPassword: '',
        outRtcAddr: '',
    },
    stream3: {
        inRtspAddr: '',
        inID: '',
        inPassword: '',
        ctlRestAddr: '',
        alarm: true,
        noti: true,
        outRtspAddr: '',
        outID: '',
        outPassword: '',
        outRtcAddr: '',
    },
};

const user = handleActions(
    {
        [userActionType.CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, (draft) => {
                draft[form][key] = value;
        }),
        [userActionType.INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [userActionType.LOGIN_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            loginInfo: message,
            loginError: null,
        }),
        [userActionType.LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loginError: error,
        }),
        [userActionType.LOGOUT_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            logoutInfo: message,
            logoutError: null,
        }),
        [userActionType.LOGOUT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            logoutError: error,
        }),
        [userActionType.RESOURCE_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            resourceList: info.system, // json이 list로 한번 더 감싸져 있음 (info.system) 
            resourceListError: null,
        }),
        [userActionType.RESOURCE_FAILURE]: (state, { payload: message }) => ({
            ...state,
            resourceListError: message,
        }),
        [userActionType.GET_VIDEO_CONFIG_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            getVideoConfigInfo: info,
            getVideoConfigError: null,
        }),
        [userActionType.GET_VIDEO_CONFIG_FAILURE]: (state, { payload: message }) => ({
            ...state,
            getVideoConfigError: message,
        }),
        [userActionType.SET_INPUT_CONFIG_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            setConfigInfo: info,
            setConfigError: null,
        }),
        [userActionType.SET_INPUT_CONFIG_FAILURE]: (state, { payload: message }) => ({
            ...state,
            setConfigError: message,
        }),
        [userActionType.SET_OUTPUT_CONFIG_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            setConfigInfo: info,
            setConfigError: null,
        }),
        [userActionType.SET_OUTPUT_CONFIG_FAILURE]: (state, { payload: message }) => ({
            ...state,
            setConfigError: message,
        }),  
        [userActionType.SET_ALARM_CONFIG_SUCCESS]: (state, { payload: info }) => ({
            ...state,
            setConfigInfo: info,
            setConfigError: null,
        }),
        [userActionType.SET_ALARM_CONFIG_FAILURE]: (state, { payload: message }) => ({
            ...state,
            setConfigError: message,
        }),
        [userActionType.RESIGN_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            resignError: null,
            resignInfo: message,
        }),
        [userActionType.RESIGN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            resignError: error,
            resignInfo: null,
        }),
        [userActionType.ALTER_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            alterError: null,
            alterInfo: message,
        }),
        [userActionType.ALTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            alterError: error,
            alternInfo: null,
        }),
        [userActionType.SNAPSHOT_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            snapshotError: null,
            snapshotInfo: message,
        }),
        [userActionType.SNAPSHOT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            snapshotError: error,
            snapshotInfo: null,
        }),
        [userActionType.GET_SNAPSHOT_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            getSnapshotError: null,
            getSnapshotInfo: message,
        }),
        [userActionType.GET_SNAPSHOT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            getSnapshotError: error,
            getSnapshotInfo: null,
        }),
        [userActionType.SET_CTL_CONFIG_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            setConfigError: null,
            setConfigInfo: message,
        }),
        [userActionType.SET_CTL_CONFIG_FAILURE]: (state, { payload: error }) => ({
            ...state,
            setConfigError: error,
            setConfigInfo: null,
        }),
        [userActionType.CLEAR]: () => ({
            initialState
        })

    },
    initialState,
);

export default user;