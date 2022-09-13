import { createRequestActionTypes} from "utils/createRequestSaga"

export const CHANGE_FIELD = 'service/CHANGE_FIELD';
export const INITIALIZE_FORM = 'service/INITIALIZE_FORM';
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('service/REGISTER');
export const [CHKDUP, CHKDUP_SUCCESS, CHKDUP_FAILURE] = createRequestActionTypes('service/CHKDUP');