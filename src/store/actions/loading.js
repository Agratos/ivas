import { createAction } from 'redux-actions';
import * as loadingActionType from '../action-types/loading';

const loadingAction = {
    startLoading: createAction(
        loadingActionType.START_LOADING,
        (requestType) => requestType,
    ),

    finishLoading: createAction(
        loadingActionType.FINISH_LOADING,
        (requestType) => requestType,
    )
}

export default loadingAction;