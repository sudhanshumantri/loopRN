import {
    POST_FEEDBACK_FAILURE,
    POST_FEEDBACK_REQUEST,
    POST_FEEDBACK_SUCCESS
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