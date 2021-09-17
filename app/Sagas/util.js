import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callFetchAppVersion, callPostUserFeedback, callUserAuthentication, callUserOTPAuthentication, callUserPhoneValidation } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    fetchAppVersionSucceededAction, fetchAppVersionFailedAction
} from '../Actions/util';
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
export function* fetchAppVersion() {
    let responseData = yield call(callFetchAppVersion);
    if (responseData.status == 200) {
        yield put(
            fetchAppVersionSucceededAction(
                responseData.data
            ),
        );

    } else {
        yield put(
            fetchAppVersionFailedAction(
                responseData.data
            ),
        );
    }
}

export function* utilsSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('POST_FEEDBACK_REQUEST', postFeedback),
    takeLatest('FETCH_APP_VERSION_REQUEST', fetchAppVersion)
    ]);
}

export default [utilsSagas];


