import { createAction } from 'redux-actions';
import * as userActionType from 'store/action-types/user';

const userAction = {
    changeField: createAction( 
        userActionType.CHANGE_FIELD, 
        ({ form, key, value }) => ({ form, key, value })
    ),

    initializeForm: createAction(
        userActionType.INITIALIZE_FORM, 
        (form) => form
    ),

    login: createAction(
        userActionType.LOGIN, 
        ({ id, password }) => ({ id, password })
    ),

    logout: createAction(
        userActionType.LOGOUT, 
        ({ id }) => ({id})
    ),

    setUser: createAction(
        userActionType.SET_USER,
        ({ id, password }) => ({ id, password })
    ),
    
    getResourceList: createAction(
        userActionType.RESOURCE
    ),
    
    getVideoConfig: createAction(
        userActionType.GET_VIDEO_CONFIG, 
        ({ id }) => ({ id })
    ),
    
    setInputConfig: createAction(
        userActionType.SET_INPUT_CONFIG, 
        ({ id, idx, address, auth }) => ({ id, idx, address, auth })
    ),
    
    setOutputConfig: createAction(
        userActionType.SET_OUTPUT_CONFIG, 
        ({ id, idx, auth }) => ({ id, idx, auth })
    ),
    
    setAlarmConfig: createAction(
        userActionType.SET_ALARM_CONFIG, 
        ({ id, enable, address }) => ({ id, enable, address })
    ),
    
    resign: createAction(
        userActionType.RESIGN, 
        ({ id }) => ({ id })
    ),
    
    alter: createAction(
        userActionType.ALTER, 
        ({ id, password, stream, functions }) => ({ id, password, stream, functions })
    ),
    
    snapshot: createAction(
        userActionType.SNAPSHOT, 
        ({ id, idx }) => ({ id, idx })
    ),
    
    getSnapshot: createAction(
        userActionType.GET_SNAPSHOT, 
        ({ id, idx }) => ({ id, idx })
    ),
    
    setControlConfig: createAction(
        userActionType.SET_CTL_CONFIG, 
        ({ id, idx, detect, roi, line, alarm, overlay }) => ({id, idx, detect, roi, line, alarm, overlay })
    ),
    
    clear: createAction(userActionType.CLEAR)
}

export default userAction;