import {
    UPDATE_USER_PERSOANAL_DETAILS_REQUESTED,
    UPDATE_USER_PERSOANAL_DETAILS_SUCCESS,
    UPDATE_USER_PERSOANAL_DETAILS_FAILED,
    FETCH_USER_PROFILE_DETAILS_REQUESTED,
    FETCH_USER_PROFILE_DETAILS_SUCCESS,
    FETCH_USER_PROFILE_DETAILS_FAILED,
    UPDATE_USER_SHARING_DETAILS_REQUESTED,
    UPDATE_USER_SHARING_DETAILS_SUCCESS,
    UPDATE_USER_SHARING_DETAILS_FAILED,
    VALIDATE_QR_CODE_REQUESTED,
    VALIDATE_QR_CODE_SUCCESS,
    VALIDATE_QR_CODE_FAILED
} from '../Actions/actionTypes';
export function fetchUserProfileAction() {
    return {
        type: FETCH_USER_PROFILE_DETAILS_REQUESTED,
    };
}
export function fetchUserProfileSucceededAction(data) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_SUCCESS,
        data
    };
}
export function fetchUserProfileFailedAction(error) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_FAILED,
        error
    };
}
//update user personal information
export function updateUserPersonalInfoAction(data) {
    return {
        type: UPDATE_USER_PERSOANAL_DETAILS_REQUESTED,
        data
    };
}
export function updateUserPersonalInfoSucceededAction(data) {
    return {
        type: UPDATE_USER_PERSOANAL_DETAILS_SUCCESS,
        data
    };
}
export function updateUserPersonalInfoFailedAction(error) {
    return {
        type: UPDATE_USER_PERSOANAL_DETAILS_FAILED,
    };
}
//Update user sharing information babes :

export function updateUserSharingInfoAction(data) {
    return {
        type: UPDATE_USER_SHARING_DETAILS_REQUESTED,
        data
    };
}
export function updateUserSharingInfoSucceededAction(data) {
    return {
        type: UPDATE_USER_SHARING_DETAILS_SUCCESS,
        data
    };
}
export function updateUserSharingInfoFailedAction(error) {
    return {
        type: UPDATE_USER_SHARING_DETAILS_FAILED,
    };
}
//VALIDATE QR CODE
export function validateQRCodeAction(data) {
    return {
        type: VALIDATE_QR_CODE_REQUESTED,
        data
    };
}
export function validateQRCodeSucceededAction(data) {
    return {
        type: VALIDATE_QR_CODE_SUCCESS,
        data
    };
}
export function validateQRCodeFailedAction(error) {
    return {
        type: VALIDATE_QR_CODE_FAILED,
    };
}
//V

