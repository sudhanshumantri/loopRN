import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callPostUserFeedback, callUserAuthentication, callUserOTPAuthentication, callUserPhoneValidation } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    loginSuccessAction, loginFailedAction, loginMobileOTPSuccessAction, loginMobileOTPFailedAction
} from '../Actions/login';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './../Navigation/navigationService';

export function* postFeedback({ data }) {
    let responseData = yield call(callPostUserFeedback, data);
    if (responseData.status == 200) {
        yield call(showMessage, {
            message: 'Your feedback has been sent',
            type: "success",
        });

    } else {
        yield call(showMessage, {
            message: 'Something went wrong',
            type: "failure",
        });
    }
}

export function* utilsSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('POST_FEEDBACK_REQUEST', postFeedback),

    ]);
}

export default [utilsSagas];


