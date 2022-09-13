import { handleActions } from 'redux-actions';
import * as loadingActionType from '../action-types/loading';

const initialState = {};

const loading = handleActions(
    {
        [loadingActionType.START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [loadingActionType.FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);
  
export default loading;
  