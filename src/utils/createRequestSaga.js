import { call, put } from 'redux-saga/effects';
import loadingAction from 'store/actions/loading';

export const createRequestActionTypes = (type) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

  // api 호출후 자동으로 데이터 저장
    return function* (action) {
        yield put(loadingAction.startLoading(type)); // 시작
        try {
            const response = yield call(request, action.payload);
            console.log(response.data)
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(loadingAction.finishLoading(type)); // 종료
    };
}
