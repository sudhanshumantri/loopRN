import {
    POST_FEEDBACK_FAILURE,
    POST_FEEDBACK_REQUEST,
    POST_FEEDBACK_SUCCESS,
    FETCH_APP_VERSION_REQUEST,
    FETCH_APP_VERSION_SUCCESS,
    FETCH_APP_VERSION_FAILURE
} from '../Actions/actionTypes';
export function postFeedbackAction(data) {
    return {
        type: POST_FEEDBACK_REQUEST,
        data
    };
}
export function postFeedbackSucceededAction(data) {
    return {
        type: POST_FEEDBACK_SUCCESS,
        data
    };
}
export function postFeedbackFailedAction(error) {
    return {
        type: POST_FEEDBACK_FAILURE,
        error
    };
}

export function fetchAppVersionAction() {
    return {
        type: FETCH_APP_VERSION_REQUEST,
    };
}
export function fetchAppVersionSucceededAction(data) {
    return {
        type: FETCH_APP_VERSION_SUCCESS,
        data
    };
}
export function fetchAppVersionFailedAction(error) {
    return {
        type: FETCH_APP_VERSION_FAILURE,
        error
    };
}