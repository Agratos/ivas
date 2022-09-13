import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import * as serviceActionType from '../action-types/service';
import serviceAPI from 'apis/serviceApi';
import createRequestSaga from 'utils/createRequestSaga';

const registerSaga = createRequestSaga(serviceActionType.REGISTER, serviceAPI.register);
const chkdupSaga = createRequestSaga(serviceActionType.CHKDUP, serviceAPI.chkdup);

export function* serviceSaga() {
    yield takeLatest(serviceActionType.REGISTER, registerSaga);
    yield takeLatest(serviceActionType.CHKDUP, chkdupSaga);
}

const initialState = {
    form: {
        id: '',
        password: '',
        confirmPassword: '',
        stream: 0,
        functions: '',
    },
  
    selectedCheckBox: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
  
    registerInfo: null,
    registerError: null,
  
    chkdupInfo: null,
    chkdupError: null,
};

const service = handleActions(
    {
        [serviceActionType.CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, (draft) => {
                draft[form][key] = value;
            }),
        [serviceActionType.INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [serviceActionType.REGISTER_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            registerError: null,
            registerInfo: message,
        }),
        [serviceActionType.REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            registerError: error,
            registerInfo: null,
        }),
        [serviceActionType.CHKDUP_SUCCESS]: (state, { payload: message }) => ({
            ...state,
            chkdupError: null,
            chkdupInfo: message,
        }),
        [serviceActionType.CHKDUP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            chkdupError: error,
            chkdupInfo: null,
        }),
        [serviceActionType.CLEAR]: () => ({
            initialState
        })
    },
    initialState,
  );
  
  export default service;
  