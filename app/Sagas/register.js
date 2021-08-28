import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import {
    callRegisterMobile,
    callGenerateOTP,
    callValidateOTP,
    callRegisterUser,
    callGenerateOTPForgetPassword,
    callResetPassword
} from '../Utils/apis';
import { showMessage, hideMessage } from "react-native-flash-message";
import {
    registerMobileSuccessAction,
    registerMobileFailedAction,
    generateOTPSuccessAction,
    generateOTPFailedAction,
    validateOTPSuccessAction,
    validateOTPFailedAction,
    registerUserSuccessAction,
    registerUserFailedAction
} from '../Actions/register';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from 'jwt-decode';
import * as NavigationService from './../Navigation/navigationService';

export function* registerMobile({ data }) {
    // alert('coming inside fetch leads count');
    const responseData = yield call(callRegisterMobile, data);
    // console.log('registerMobile', responseData.data);
    if (responseData.status == 200) {
        yield put(
            registerMobileSuccessAction(
                responseData.data
            ),
        );
        NavigationService.navigate('ValidateOTP', '', data);
    } else {
        if (responseData.response) {
            if (responseData.response.status == '409') {
                yield put(
                    registerMobileFailedAction(
                        'Mobile number already registered'
                    ),
                );
            }
        } else {
            yield put(
                registerMobileFailedAction(
                    ''
                ),
            );
            yield call(showMessage, {
                message: "Something Went Wrong",
                type: "danger",
            });
        }

    }
}
export function* generateOTP({ data }) {
    //console.log('generateOTP', data);
    let responseData = '';
    if (data.forgetPassword) {
        responseData = yield call(callGenerateOTPForgetPassword, data);
    } else {
        responseData = yield call(callGenerateOTP, data);
    }
    if (responseData.status == 200) {
        yield put(
            generateOTPSuccessAction(
                responseData.data
            ),
        );
        if (data.forgetPassword) {
            NavigationService.navigate('ValidateOTP', '', { mobile: data.mobile, resetPassword: true });
        } else {
            NavigationService.navigate('ValidateOTP', '', { mobile: data.mobile, resetPassword: false });
        }
    } else {
        if (responseData && responseData.response && responseData.response.status == 409) {

            yield put(
                generateOTPFailedAction(
                    'You are already registered. Please log in.'
                ),
            );
        }
        // yield call(showMessage, {
        //     message: "Something Went Wrong",
        //     type: "danger",
        // });
    }


}
export function* validateOTP({ data }) {
    //  console.log(data)
    const responseData = yield call(callValidateOTP, data);
    if (responseData.status == 200) {
        if (responseData.data.status == 'failed') {
            yield put(
                validateOTPFailedAction(
                    'Invalid OTP'
                ),
            );
        } else {
            yield put(
                validateOTPSuccessAction(
                    responseData.data
                ),
            );
        }

    } else {

        yield put(
            validateOTPFailedAction(
                'Invalid OTP'
            ),
        );
        // yield call(showMessage, {
        //     message: "Something Went Wrong",
        //     type: "danger",
        // });
    }


}
//REGISTER_USER_REQUEST
export function* registerUser({ data }) {
    let responseData = '';
    responseData = yield call(callRegisterUser, data);
    if (responseData.status == 200) {
        yield call(AsyncStorage.setItem, 'token', responseData.data.token);
        NavigationService.navigate('App');
        yield put(
            registerUserSuccessAction(
                responseData.data
            ),
        );
    } else {
        if (responseData.data && responseData.data.msg) {
            yield call(showMessage, {
                message: responseData.data.msg,
                type: "danger",
            });
        } else {
            yield call(showMessage, {
                message: 'Something went wrong',
                type: "danger",
            });
        }
    }


    // if (data.isResetPassword) {
    //     responseData = yield call(callResetPassword, data);
    // }
    // else {
    //     responseData = yield call(callRegisterUser, data);
    // }
    // if (responseData.status == 200) {
    //     //  console.log(responseData.data.userId, responseData.data.token)
    //     if (responseData.data.status == 'failed') {
    //         yield put(
    //             registerUserFailedAction(
    //                 'Something went Wrong'
    //             ),
    //         );
    //     } else {
    //         if (data.isResetPassword) {
    //             NavigationService.navigate('Login');

    //         }else{
    //             var decoded = jwt_decode(responseData.data.token);
    //            yield call(AsyncStorage.setItem, 'token', responseData.data.token);
    //            yield call(AsyncStorage.setItem, 'guid', decoded.unique_name);
    //            yield call(AsyncStorage.setItem, 'roleId', decoded.role);
    //         yield put(
    //             registerUserSuccessAction(
    //                 responseData.data
    //             ),
    //         );
    //         NavigationService.navigate('ProfileRegistrationPersonalInfo');
    //     }
    // }

    // } else {

    //     yield put(
    //         validateOTPFailedAction(
    //             'Invalid OTP'
    //         ),
    //     );
    //     yield call(showMessage, {
    //         message: "Something Went Wrong",
    //         type: "danger",
    //     });
    // }


}
export function* registerSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('REGISTER_MOBILE_REQUEST', registerMobile),
    takeLatest('GENERATE_OTP_REQUEST', generateOTP),
    takeLatest('VALIDATE_OTP_REQUEST', validateOTP),
    takeLatest('REGISTER_USER_REQUEST', registerUser),

    ]);
}

export default [registerSagas];


