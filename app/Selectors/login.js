import { createSelector } from 'reselect';

const selectLogin = state => state.get('login');

export const selectLoginRequested = () =>
    createSelector(selectLogin, login => login.toJS()['isLoginRequested']);

export const selectLoginError = () =>
    createSelector(selectLogin, login => login.toJS()['error']);

export const selectLoginOTP= () =>
    createSelector(selectLogin, login => login.toJS()['otp']);
    export const selectPhone= () =>
    createSelector(selectLogin, login => login.toJS()['phone']);


