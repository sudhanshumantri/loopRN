import {

    FETCH_USER_CONTACT_LIST_REQUESTED,
    FETCH_USER_CONTACT_LIST_SUCCESS,
    FETCH_USER_CONTACT_LIST_FAILED,

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