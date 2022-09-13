import { createAction } from 'redux-actions';
import * as serviceActionType from 'store/action-types/service';

const serviceAction = {
    changeField: createAction(
        serviceActionType.CHANGE_FIELD,
        ({ form, key, value }) => ({ form, key, value }),
    ),

    initializeForm: createAction(
        serviceActionType.INITIALIZE_FORM, 
        (form) => form
    ),
    register: createAction(
        serviceActionType.REGISTER,
        ({ id, password, confirmPassword, stream, functions }) => ({ id, password, confirmPassword, stream, functions }),
    ),

    chkdup: createAction(
        serviceActionType.CHKDUP,
        ({ id }) => ({ id }),
    )
}

export default serviceAction;

