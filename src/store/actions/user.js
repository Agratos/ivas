import { createAction, handleActions } from 'redux-actions';
import * as userActionType from 'store/action-types/user';

export const changeField = createAction( 
    userActionType.CHANGE_FIELD, 
    ({ form, key, value }) => ({ form, key, value })
);

export const initializeForm = createAction(
    userActionType.INITIALIZE_FORM, 
    (form) => form
);

export const login = createAction(
    userActionType.LOGIN, 
    ({ id, password }) => ({ id, password })
);

export const logout = createAction(
    userActionType.LOGOUT, 
    ({ id }) => ({id})
);

export const getResourceList = createAction(
    userActionType.RESOURCE
);

export const getVideoConfig = createAction(
    userActionType.GET_VIDEO_CONFIG, 
    ({ id }) => ({ id })
);

export const setInputConfig = createAction(
    userActionType.SET_INPUT_CONFIG, 
    ({ id, idx, address, auth }) => ({ id, idx, address, auth })
);

export const setOutputConfig = createAction(
    userActionType.SET_OUTPUT_CONFIG, 
    ({ id, idx, auth }) => ({ id, idx, auth })
);

export const setAlarmConfig = createAction(
    userActionType.SET_ALARM_CONFIG, 
    ({ id, enable, address }) => ({ id, enable, address })
);

export const resign = createAction(
    userActionType.RESIGN, 
    ({ id }) => ({ id })
);

export const alter = createAction(
    userActionType.ALTER, 
    ({ id, password, stream, functions }) => ({ id, password, stream, functions })
);

export const snapshot = createAction(
    userActionType.SNAPSHOT, 
    ({ id, idx }) => ({ id, idx })
);

export const getSnapshot = createAction(
    userActionType.GET_SNAPSHOT, 
    ({ id, idx }) => ({ id, idx })
);

export const setControlConfig = createAction(
    userActionType.SET_CTL_CONFIG, 
    ({ id, idx, detect, roi, line, alarm, overlay }) => ({id, idx, detect, roi, line, alarm, overlay })
);