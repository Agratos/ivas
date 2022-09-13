import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { all } from 'redux-saga/effects';
import loading from './sagas/loading';
import user ,{ userSaga } from './sagas/user';
import admin, { adminSaga} from './sagas/admin';

const persistConfig = {
    key: 'root',
    storage: storageSession
}

export const rootReducer = combineReducers({
    loading,
    user,
    admin
})

export function* rootSaga(){
    yield all([userSaga(), adminSaga]);
}

export default persistReducer(persistConfig, rootReducer);