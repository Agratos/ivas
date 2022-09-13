import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { all } from 'redux-saga/effects';
import loading from './sagas/loading';
import user ,{ userSaga } from './sagas/user';

const persistConfig = {
    key: 'root',
    storage: storageSession
}

export const rootReducer = combineReducers({
    loading,
    user
})

export function* rootSaga(){
    yield all([userSaga()]);
}

export default persistReducer(persistConfig, rootReducer);