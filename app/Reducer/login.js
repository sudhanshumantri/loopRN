import { fromJS } from 'immutable';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_VALIDATE_MOBILE_REQUEST,
    LOGIN_VALIDATE_MOBILE_SUCCESS,
    LOGIN_VALIDATE_MOBILE_FAILURE
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    isLoginRequested: false,
    error: null,
    otp: null,
    phone: null
})
export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.set('isLoginRequested', true)
                .set('error', null);

        case LOGIN_SUCCESS:
            return state.set('isLoginRequested', false)
                .set('error', null);;

        case LOGIN_FAILURE:
            return state.set('isLoginRequested', false)
                .set('error', action.error);

        case LOGIN_VALIDATE_MOBILE_REQUEST:
            return state.set('isLoginRequested', true)
                .set('otp', null)
                .set('phone', action.data.phone)
                .set('error', null);

        case LOGIN_VALIDATE_MOBILE_SUCCESS:
            return state.set('isLoginRequested', false)
                .set('otp', action.data)
                .set('error', null);

        case LOGIN_VALIDATE_MOBILE_FAILURE:
            return state.set('isLoginRequested', false)
                .set('otp', null)
                .set('error', action.error);
        default:
            return state
    }
}