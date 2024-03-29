import { createSelector } from 'reselect';

const selectUserData = state => state.get('userInfo');
export const selectUserInfo = () =>
    createSelector(selectUserData, properties => properties.toJS()['userPersonalDetails']);
export const selectInfoLoading = () =>
    createSelector(selectUserData, properties => properties.toJS()['isInfoLoading']);
export const selectError = () =>
    createSelector(selectUserData, properties => properties.toJS()['error']);
    export const selectIsInformationSharingUpdate = () =>
    createSelector(selectUserData, properties => properties.toJS()['isSharingInfoUpdateRequest']);
export const selectInformationSharing = () =>
    createSelector(selectUserData, properties => properties.toJS()['userSharingInfo']);
export const selectQRCodeData = () =>
    createSelector(selectUserData, properties => properties.toJS()['qrCodeData']);
export const selectQRCodeError = () =>
    createSelector(selectUserData, properties => properties.toJS()['qrCodeError']);

