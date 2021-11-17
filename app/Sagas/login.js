import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callUserAuthentication, callUserOTPAuthentication, callUserPhoneValidation } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    loginSuccessAction, loginFailedAction, loginMobileOTPSuccessAction, loginMobileOTPFailedAction
} from '../Actions/login';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './../Navigation/navigationService';

export function* authUser({ data }) {
  let responseData = '';
    if (data.isOTPLogin) {
        responseData = yield call(callUserOTPAuthentication, data);
    } else {
        responseData = yield call(callUserAuthentication, data);
    }
   // console.log(responseData);
    if (responseData.status == 200) {
        var decoded = '';
        //= jwt_decode(responseData.data.token);
        yield call(AsyncStorage.setItem, 'token', responseData.data.token);
        NavigationService.navigate('App');
        yield put(
            loginSuccessAction(
                responseData
            ),
        );

    } else {

        if (responseData && responseData.data.msg) {
            yield put(
                loginFailedAction(
                    responseData.data.msg
                ),
            );
        }
        else {
            yield put(
                loginFailedAction(
                    'Something went wrong'
                ),
            );
        }
    }
}
export function* validateUserPhone({ data }) {
    console.log(validateUserPhone, data);
    const responseData = yield call(callUserPhoneValidation, data);
    if (responseData.status == 200) {
        var decoded = '';
        //= jwt_decode(responseData.data.token);
        yield put(
            loginMobileOTPSuccessAction(
                responseData.data.otp
            ),
        );

    } else {
        if (responseData && responseData.data.msg) {
            yield put(
                loginMobileOTPFailedAction(
                ),
            );
            yield call(showMessage, {
                message: responseData.data.msg,
                type: "danger",
            });
        }
        else {
            yield put(
                loginFailedAction(
                    'Something went wrong'
                ),
            );
        }
    }
}
export function* logOutUser() {
    yield call(AsyncStorage.clear);
    NavigationService.navigate('AuthLoading');
}
export function* loginSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('LOGIN_REQUEST', authUser),
    takeLatest('LOGIN_VALIDATE_MOBILE_REQUEST', validateUserPhone),
    takeLatest('LOGOUT_REQUEST', logOutUser),


    ]);
}

export default [loginSagas];


