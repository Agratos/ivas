import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { all } from 'redux-saga/effects';
import loading from './sagas/loading';
import user ,{ userSaga } from './sagas/user';
import admin, { adminSaga} from './sagas/admin';
import service, { serviceSaga } from './sagas/service';

const persistConfig = {
    key: 'root',
    storage: storageSession
}

export const rootReducer = combineReducers({
    loading,
    user,
    admin,
    service
})

export function* rootSaga(){
    yield all([userSaga(), adminSaga(), serviceSaga()]);
}

export default persistReducer(persistConfig, rootReducer);