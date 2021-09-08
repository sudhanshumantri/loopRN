import { fromJS, List } from 'immutable';
import {

    FETCH_USER_PROFILE_DETAILS_REQUESTED,
    FETCH_USER_PROFILE_DETAILS_SUCCESS,
    FETCH_USER_PROFILE_DETAILS_FAILED,
    UPDATE_PROFILE_PIC_SUCCESS,
    SAVE_USER_PROFILE_DETAILS_REQUESTED,
    SAVE_USER_PROFILE_DETAILS_SUCCESS,
    SAVE_USER_PROFILE_DETAILS_FAILED,
    UPDATE_USER_PERSOANAL_DETAILS_REQUESTED,
    UPDATE_USER_PERSOANAL_DETAILS_SUCCESS,
    UPDATE_USER_PERSOANAL_DETAILS_FAILED,
    UPDATE_USER_SHARING_DETAILS_REQUESTED,
    UPDATE_USER_SHARING_DETAILS_SUCCESS,
    VALIDATE_QR_CODE_REQUESTED,
    VALIDATE_QR_CODE_SUCCESS,
    VALIDATE_QR_CODE_FAILED,
} from '../Actions/actionTypes';
import { findIndex, remove } from 'lodash';
const INITIAL_STATE = fromJS({
    isInfoLoading: false,
    infoError: null,
    userPersonalDetails: null,
    userSharingInfo: null,
    error: null,
    qrCodeError: null,
    qrCodeData: null
});

export default function userProfileReducer(state = INITIAL_STATE, action = {}) {
    let userInfoObject = state.toJS()['userPersonalDetails'];
    switch (action.type) {
        case FETCH_USER_PROFILE_DETAILS_REQUESTED:
            return state.set('isInfoLoading', true)
                .set('error', null);
        case FETCH_USER_PROFILE_DETAILS_SUCCESS:
            var userSharingObj = {
                phone: action.data.phone,
                name: action.data.name,
                email: action.data.email,
                dob: action.data.dob,
                gender: action.data.gender,
                instaLink: action.data.instaLink,
                fbLink: action.data.fbLink,
                linkedinLink: action.data.linkedinLink,
            }
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('isInfoLoading', false)
                .set('userPersonalDetails', action.data.userInfo)
                .set('userSharingInfo', userSharingObj)
                .set('error', null);
        case FETCH_USER_PROFILE_DETAILS_FAILED:
            return state.set('isInfoLoading', false)
                .set('error', action.error);
        case UPDATE_USER_PERSOANAL_DETAILS_REQUESTED:
            return state.set('isInfoLoading', true)

        case UPDATE_USER_PERSOANAL_DETAILS_SUCCESS:
            return state.set('isInfoLoading', false)
                .set('userPersonalDetails', action.data)
                .set('error', null);
        case UPDATE_USER_PERSOANAL_DETAILS_FAILED:

            return state.set('isInfoLoading', false)
                .set('error', action.error);

        case UPDATE_USER_SHARING_DETAILS_REQUESTED:
            return state
        case UPDATE_PROFILE_PIC_SUCCESS:
            userInfoObject.profilePicture = action.data;
            return state.set('isInfoLoading', false)
                .set('userPersonalDetails', userInfoObject)
                .set('error', null);
        case UPDATE_USER_SHARING_DETAILS_SUCCESS:
            var userSharingObj = {
                phone: action.data.phone,
                name: action.data.name,
                email: action.data.email,
                dob: action.data.dob,
                gender: action.data.gender,
                instaLink: action.data.instaLink,
                fbLink: action.data.fbLink,
                linkedinLink: action.data.linkedinLink,
            }
            return state.set('isInfoLoading', false)
                .set('userSharingInfo', userSharingObj)
                .set('error', null);
        case UPDATE_USER_PERSOANAL_DETAILS_FAILED:

            return state.set('isInfoLoading', false)
                .set('error', action.error);

        //QR Code Access
        case VALIDATE_QR_CODE_REQUESTED:
            return state.set('isInfoLoading', true)
                .set('qrCodeData', null)
                .set('qrCodeError', null);
        case VALIDATE_QR_CODE_SUCCESS:
            return state.set('isInfoLoading', false)
                .set('qrCodeData', action.data)
                .set('error', null)
                .set('qrCodeError', null);
        case VALIDATE_QR_CODE_FAILED:
            return state.set('isInfoLoading', false)
                .set('qrCodeData', null)
                .set('qrCodeError', action.error);
        default:
            return state;


    }
}
