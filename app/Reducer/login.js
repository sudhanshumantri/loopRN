import { fromJS, List } from 'immutable';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    isLoginRequested: false,
    error: null,
})
export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.set('isLoginRequested', true)
                .set('error', null);

        case LOGIN_SUCCESS:
            return state.set('isLoginRequested', false)
                .set('error', null);;

        case LOGIN_FAILURE:
            return state.set('isLoginRequested', false)
                .set('error', action.error);

        default:
            return state
    }
}