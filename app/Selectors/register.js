import { createSelector } from 'reselect';

const selectRegister = state => state.get('register');

export const selectRegisterMobileRequested = () =>
    createSelector(selectRegister, login => login.toJS()['isRegisterMobileRequested']);

export const selectIsOTPRequestedRequested = () =>
    createSelector(selectRegister, login => login.toJS()['isOTPRequested']);
export const selectOTP = () =>
    createSelector(selectRegister, login => login.toJS()['otp']);

export const selectIsOTPValidationRequested = () =>
    createSelector(selectRegister, login => login.toJS()['isOTPValidationRequested']);
export const selectIsOTPValidated = () =>
    createSelector(selectRegister, login => login.toJS()['validated']);

export const selectOTPToken = () =>
    createSelector(selectRegister, login => login.toJS()['otpToken']);
export const selectIsUserRegistrationRequested = () =>
    createSelector(selectRegister, login => login.toJS()['isUserRegistrationRequested']);


export const selectError = () =>
    createSelector(selectRegister, login => login.toJS()['error']);



