import { createSelector } from 'reselect';

const selectLogin = state => state.get('login');

export const selectLoginRequested = () =>
    createSelector(selectLogin, login => login.toJS()['isLoginRequested']);

export const selectLoginError = () =>
    createSelector(selectLogin, login => login.toJS()['error']);

    export const selectLoginUserName = () =>
    createSelector(selectLogin, login => login.toJS()['userName']);

