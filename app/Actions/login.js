import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGIN_VALIDATE_MOBILE_FAILURE, LOGIN_VALIDATE_MOBILE_REQUEST, LOGIN_VALIDATE_MOBILE_SUCCESS } from '../Actions/actionTypes';

export function loginAction(data) {
    return {
        type: LOGIN_REQUEST,
        data
    };
}

export function loginSuccessAction(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    };
}
export function loginFailedAction(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}
export function logoutRequestAction() {
    return {
        type: LOGOUT_REQUEST,
    };
}
export function logoutSuccessAction(error) {
    return {
        type: LOGOUT_SUCCESS,
    };
}
//LOGIN WITH VALIDATE MOBILE
export function loginMobileOTPAction(data) {
    return {
        type: LOGIN_VALIDATE_MOBILE_REQUEST,
        data
    };
}

export function loginMobileOTPSuccessAction(data) {
    return {
        type: LOGIN_VALIDATE_MOBILE_SUCCESS,
        data
    };
}
export function loginMobileOTPFailedAction(error) {
    return {
        type: LOGIN_VALIDATE_MOBILE_FAILURE,
        error
    };
}