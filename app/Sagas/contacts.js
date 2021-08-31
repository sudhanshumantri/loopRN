import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callFetchUserContactList } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    fetchUserContactListSucceededAction, fetchUserContactListFailedAction
} from '../Actions/contacts';

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
            fetchUserContactListSucceededAction(
                'Something went wrong'
            ),
        );

    }
}

export function* contactsSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('FETCH_USER_CONTACT_LIST_REQUESTED', fetchUserContactList),

    ]);
}

export default [contactsSagas];


