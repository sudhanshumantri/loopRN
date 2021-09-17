import { createSelector } from 'reselect';

const selectLogin = state => state.get('util');

export const selectIsLoading = () =>
    createSelector(selectLogin, login => login.toJS()['isLoading']);

export const selectError = () =>
    createSelector(selectLogin, login => login.toJS()['error']);

export const selectVersion = () =>
    createSelector(selectLogin, login => login.toJS()['appVersion']);



