import {
    REGISTER_MOBILE_REQUEST,
    REGISTER_MOBILE_SUCCESS,
    REGISTER_MOBILE_FAILURE,
    GENERATE_OTP_REQUEST,
    GENERATE_OTP_SUCCESS,
    GENERATE_OTP_FAILURE,
    VALIDATE_OTP_REQUEST,
    VALIDATE_OTP_SUCCESS,
    VALIDATE_OTP_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from '../Actions/actionTypes';

export function registerMobileAction(data) {
    return {
        type: REGISTER_MOBILE_REQUEST,
        data
    };
}

export function registerMobileSuccessAction(data) {
    return {
        type: REGISTER_MOBILE_SUCCESS,
        data
    };
}
export function registerMobileFailedAction(error) {
    return {
        type: REGISTER_MOBILE_FAILURE,
        error
    };
}
export function generateOTPAction(data) {
    return {
        type: GENERATE_OTP_REQUEST,
        data
    };
}

export function generateOTPSuccessAction(data) {
    return {
        type: GENERATE_OTP_SUCCESS,
        data
    };
}
export function generateOTPFailedAction(error) {
    return {
        type: GENERATE_OTP_FAILURE,
        error
    };
}
//otp validation
export function validateOTPAction(data) {
    return {
        type: VALIDATE_OTP_REQUEST,
        data
    };
}

export function validateOTPSuccessAction(data) {
    return {
        type: VALIDATE_OTP_SUCCESS,
        data
    };
}
export function validateOTPFailedAction(error) {
    return {
        type: VALIDATE_OTP_FAILURE,
        error
    };
}
//USER REGISTRATION
export function registerUserAction(data) {
    return {
        type: REGISTER_USER_REQUEST,
        data
    };
}

export function registerUserSuccessAction(data) {
    return {
        type: REGISTER_USER_SUCCESS,
        data
    };
}
export function registerUserFailedAction(error) {
    return {
        type: REGISTER_USER_FAILURE,
        error
    };
}