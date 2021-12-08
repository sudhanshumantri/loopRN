import {

    FETCH_USER_CONTACT_LIST_REQUESTED,
    FETCH_USER_CONTACT_LIST_SUCCESS,
    FETCH_USER_CONTACT_LIST_FAILED,
    UPDATE_USER_CONTACT_DETAILS_REQUESTED,
    UPDATE_USER_CONTACT_DETAILS_SUCCESS

} from '../Actions/actionTypes';
export function fetchUserContactListAction() {
    return {
        type: FETCH_USER_CONTACT_LIST_REQUESTED,
    };
}
export function fetchUserContactListSucceededAction(data) {
    return {
        type: FETCH_USER_CONTACT_LIST_SUCCESS,
        data
    };
}
export function fetchUserContactListFailedAction(data) {
    return {
        type: FETCH_USER_CONTACT_LIST_FAILED,
        data
    };
}

//update contacts
export function updateContactInfoAction(data) {
    return {
        type: UPDATE_USER_CONTACT_DETAILS_REQUESTED,
        data
    };
}
export function updateContactInfoSucceededAction(data) {
    return {
        type: UPDATE_USER_CONTACT_DETAILS_SUCCESS,
        data
    };
}