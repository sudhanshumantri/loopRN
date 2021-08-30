import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import {
    callUpdateUserInfo, callFetchUserInfo, callUpdateUserSharingInfo, callValidateQRCode
} from '../Utils/apis';
import { showMessage, hideMessage } from "react-native-flash-message";
import {
    fetchUserProfileSucceededAction,
    fetchUserProfileFailedAction,
    updateUserPersonalInfoSucceededAction,
    updateUserPersonalInfoFailedAction,
    updateUserSharingInfoSucceededAction,
    updateUserSharingInfoFailedAction,
    validateQRCodeFailedAction,
    validateQRCodeSucceededAction
} from '../Actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function* fetchUserInfo() {
    let responseData = '';
    responseData = yield call(callFetchUserInfo);
    console.log('fetchUserInfo', responseData.data)
    if (responseData.status == 200) {

        yield put(
            fetchUserProfileSucceededAction(
                responseData.data
            ),
        );
    } else {
        yield put(
            fetchUserProfileFailedAction(
                'Something Went Wrong'
            ),
        );
    }
}
export function* updateUserInfo({ data }) {
    let responseData = '';

    responseData = yield call(callUpdateUserInfo, data);
    if (responseData.status == 200) {

        yield put(
            updateUserPersonalInfoSucceededAction(
                responseData.data
            ),
        );
        yield call(showMessage, {
            message: 'Profile updates sucessfully',
            type: "success",
        });
    } else {
        yield put(
            updateUserPersonalInfoFailedAction(
                'Something Went Wrong'
            ),
        );
        yield call(showMessage, {
            message: 'Something went wrong',
            type: "danger",
        });
    }
}
export function* updateUserSharingInfo({ data }) {
    let responseData = '';
    //  console.log('updateUserSharingInfo', data);
    responseData = yield call(callUpdateUserSharingInfo, data);
    //  console.log('updateUserSharingInfo',responseData.data)
    if (responseData.status == 200) {

        yield put(
            updateUserSharingInfoSucceededAction(
                responseData.data
            ),
        );
        yield call(showMessage, {
            message: 'Profile updates sucessfully',
            type: "success",
        });
    } else {
        yield put(
            updateUserSharingInfoFailedAction(
                'Something Went Wrong'
            ),
        );
        yield call(showMessage, {
            message: 'Something went wrong',
            type: "danger",
        });
    }
}

export function* validateQRCode({ data }) {
    let responseData = '';
  //  console.log('validateQRCode', data)
    responseData = yield call(callValidateQRCode, data);
    if (responseData.status == 200 && responseData.data) {

        yield put(
            validateQRCodeSucceededAction(
                responseData.data
            ),
        );
        // yield call(showMessage, {
        //     message: 'Profile updates sucessfully',
        //     type: "success",
        // });
    } else {
        yield put(
            validateQRCodeFailedAction(
                'No user found'
            ),
        );
        yield call(showMessage, {
            message: 'No user found',
            type: "danger",
        });
    }
}

export function* userSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('FETCH_USER_PROFILE_DETAILS_REQUESTED', fetchUserInfo),
    takeLatest('UPDATE_USER_PERSOANAL_DETAILS_REQUESTED', updateUserInfo),
    takeLatest('UPDATE_USER_SHARING_DETAILS_REQUESTED', updateUserSharingInfo),
    takeLatest('VALIDATE_QR_CODE_REQUESTED', validateQRCode),



    ]);
}

export default [userSagas];