import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callexchangeContactWithUser, callFetchUserContactList, callupdateContactSharingPreferences, callupdateUserConact } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    exchangeContactInfoSucceededAction,
    fetchUserContactListSucceededAction,fetchUserContactListFailedAction, updateContactInfoAction, updateContactInfoSucceededAction, updateContactSharingPreferencesSucceededAction
} from '../Actions/contacts';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './../Navigation/navigationService';

export function* fetchUserContactList() {
    const responseData = yield call(callFetchUserContactList);
    if (responseData.status == 200) {
        var decoded = '';
        //= jwt_decode(responseData.data.token);
        yield put(
            fetchUserContactListSucceededAction(
                responseData.data
            ),
        );

    } else {
        yield put(
            fetchUserContactListFailedAction(
                'Something went wrong'
            ),
        );

    }
}
export function* updateContactInfo({ data }) {
    const responseData = yield call(callupdateUserConact, data);
    if (responseData.status == 201 || responseData.status == 200) {
        yield call(showMessage, {
            message: "Contact Preferences Updated Sucessfully",
            type: "success",
        });
        yield put(
            updateContactInfoSucceededAction(
                responseData.data
            ),
        );
    } else {
        yield call(showMessage, {
            message: "Something Went Wrong",
            type: "danger",
        });

    }
}

export function* updateContactSharingPreferences({ data }) {
    const responseData = yield call(callupdateContactSharingPreferences, data);
    if (responseData.status == 201 || responseData.status == 200) {
        yield call(showMessage, {
            message: "Contact Preferences Updated Sucessfully",
            type: "success",
        });
        yield put(
            updateContactSharingPreferencesSucceededAction(
                responseData.data
            ),
        );
        

    } else {

        yield call(showMessage, {
            message: "Something Went Wrong",
            type: "danger",
        });
    }
}

export function* exchangeContactWithUser({ data }) {
    const responseData = yield call(callexchangeContactWithUser, data);
    if (responseData.status == 201 || responseData.status == 200) {
        yield call(showMessage, {
            message: "Contact Exchanged Sucessfully",
            type: "success",
        });
        yield put(
            exchangeContactInfoSucceededAction(
                responseData.data
            ),
        );
    } else {

        yield call(showMessage, {
            message: "Something Went Wrong",
            type: "danger",
        });

    }
}

export function* contactsSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('FETCH_USER_CONTACT_LIST_REQUESTED', fetchUserContactList),
    takeLatest('UPDATE_USER_CONTACT_DETAILS_REQUESTED', updateContactInfo),
    takeLatest('SAVE_EXCHANGE_CONTACT_WITH_USER_REQUESTED', exchangeContactWithUser),
    takeLatest('UPDATE_USER_CONTACT_SHARING_PREFERENCES_REQUESTED', updateContactSharingPreferences),




    ]);
}

export default [contactsSagas];


