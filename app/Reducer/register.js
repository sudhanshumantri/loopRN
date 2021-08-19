import { fromJS, List } from 'immutable';
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

const INITIAL_STATE = fromJS({
    isRegisterMobileRequested: false,
    isOTPRequested: false,
    isOTPValidationRequested: false,
    isUserRegistrationRequested: false,
    otpToken: '',
    error: null,
    otp: '',
    validated: false
})
export default function registerReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REGISTER_MOBILE_REQUEST:
            return state.set('isRegisterMobileRequested', true)
                .set('error', null);

        case REGISTER_MOBILE_SUCCESS:
            return state.set('isRegisterMobileRequested', false)
                .set('error', null);;

        case REGISTER_MOBILE_FAILURE:
            return state.set('isRegisterMobileRequested', false)
                .set('error', action.error);

        case GENERATE_OTP_REQUEST:
            return state.set('isOTPRequested', true)
                .set('otp', '')
                .set('error', null);

        case GENERATE_OTP_SUCCESS:
            return state.set('isOTPRequested', false)
                .set('otp', action.data.otp)
                .set('error', null);;

        case GENERATE_OTP_FAILURE:
            return state.set('isOTPRequested', false)
                .set('otp', '')
                .set('error', action.error);
        case VALIDATE_OTP_REQUEST:
            return state.set('isOTPValidationRequested', true)
                .set('validated', false)
                .set('otp', '')
                .set('otpToken', '')
                .set('error', null);

        case VALIDATE_OTP_SUCCESS:
            return state.set('isOTPValidationRequested', false)
                .set('validated', true)
                .set('otp', '')
                .set('otpToken', action.data.token)
                .set('error', null);;

        case VALIDATE_OTP_FAILURE:
            return state.set('isOTPValidationRequested', false)
                .set('otp', '')
                .set('otpToken', '')
                .set('validated', false)
                .set('error', action.error);

        // REGISTER_USER_


        case REGISTER_USER_REQUEST:
            return state.set('isUserRegistrationRequested', true)
                .set('error', null);

        case REGISTER_USER_SUCCESS:
            return state.set('isUserRegistrationRequested', false)

                .set('error', null);;

        case REGISTER_USER_FAILURE:
            return state.set('isUserRegistrationRequested', false)
                .set('error', action.error);


        default:
            return state
    }
}