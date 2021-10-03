import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import {
    callUpdateUserInfo, callFetchUserInfo, callUpdateUserSharingInfo, callValidateQRCode, callUpdateUserProfilePic, callUpdateUserPassword
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
    validateQRCodeSucceededAction,
    updateUserProfilePicSucceededAction,
    updateUserProfilePicFailedAction,
} from '../Actions/user';
import { fetchUserContactListAction } from '../Actions/contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function* fetchUserInfo() {
    let responseData = '';
    responseData = yield call(callFetchUserInfo);
    //    console.log('fetchUserInfo', responseData.data)
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
    if (data.isPasswordUpdate) {
        responseData = yield call(callUpdateUserPassword, data);

    } else {
        responseData = yield call(callUpdateUserInfo, data);
    }
    if (responseData.status == 200) {

        if (data.isPasswordUpdate) {
            yield put(
                updateUserPersonalInfoSucceededAction(),
            );

            yield call(showMessage, {
                message: 'Password updated sucessfully',
                type: "success",
            });
        } else {
            yield put(
                updateUserPersonalInfoSucceededAction(
                    responseData.data
                ),
            );

            yield call(showMessage, {
                message: 'Profile updated sucessfully',
                type: "success",
            });
        }
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
export function* updateUserProfilePic({ data }) {
    const responseData = yield call(callUpdateUserProfilePic, data);
    if (responseData.status == 201 || responseData.status == 200) {
        yield put(
            updateUserProfilePicSucceededAction(
                responseData.data
            ),
        );
        yield call(showMessage, {
            message: "Profile photo uploaded successfully",
            type: "success",
        });
        // yield put(
        //     fetchUserProfileAction(
        //         responseData
        //     ),
        // );
    } else {

        yield call(showMessage, {
            message: "Something Went Wrong",
            type: "danger",
        });
        yield put(
            updateUserProfilePicFailedAction(
                'Something went wrong'
            ),
        );
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
        yield put(
            fetchUserContactListAction(),
        );

        // yield call(showMessage, {
        //     message: 'Profile updates sucessfully',
        //     type: "success",
        // });
    } else {
        if (responseData.data.msg) {
            yield put(
                validateQRCodeFailedAction(
                    responseData.data.msg
                ),
            );
            yield call(showMessage, {
                message: responseData.data.msg,
                type: "danger",
            });
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
}

export function* userSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('FETCH_USER_PROFILE_DETAILS_REQUESTED', fetchUserInfo),
    takeLatest('UPDATE_USER_PERSOANAL_DETAILS_REQUESTED', updateUserInfo),
    takeLatest('UPDATE_USER_SHARING_DETAILS_REQUESTED', updateUserSharingInfo),
    takeLatest('VALIDATE_QR_CODE_REQUESTED', validateQRCode),
    takeLatest('UPDATE_PROFILE_PIC_REQUESTED', updateUserProfilePic),



    ]);
}

export default [userSagas];