import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callUserAuthentication } from '../Utils/apis';
//import jwt_decode from 'jwt-decode';
import {
    loginSuccessAction, loginFailedAction
} from '../Actions/login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './../Navigation/navigationService';

export function* authUser({ data }) {
   console.log('going for auth man')
    const responseData = yield call(callUserAuthentication, data);
    console.log(responseData);
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
        if (responseData && responseData.response && responseData.response.status == 404) {
            yield put(
                loginFailedAction(
                    "User is not registered"
                ),
            );
        }
        else {
            yield put(
                loginFailedAction(
                    'Invalid Credentials'
                ),
            );
        }
    }
}
export function* logOutUser() {
    yield call(AsyncStorage.clear);
    console.log('coming logout');
    NavigationService.navigate('AuthLoading');
}
export function* loginSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    yield all([takeLatest('LOGIN_REQUEST', authUser),
    takeLatest('LOGOUT_REQUEST', logOutUser),

    ]);
}

export default [loginSagas];


