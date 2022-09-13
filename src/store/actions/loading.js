import { createAction } from 'redux-actions';
import * as loadingActionType from '../action-types/loading';

export const startLoading = createAction(
    loadingActionType.START_LOADING,
    (requestType) => requestType,
);
  
export const finishLoading = createAction(
    loadingActionType.FINISH_LOADING,
    (requestType) => requestType,
);