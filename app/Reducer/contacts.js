import { fromJS, List } from 'immutable';
import {
    FETCH_USER_CONTACT_LIST_REQUESTED,
    FETCH_USER_CONTACT_LIST_SUCCESS,
    FETCH_USER_CONTACT_LIST_FAILED,
    LOGOUT_REQUEST,
    UPDATE_USER_CONTACT_SHARING_PREFERENCES_REQUESTED,
    UPDATE_USER_CONTACT_SHARING_PREFERENCES_SUCCESS,
    SAVE_EXCHANGE_CONTACT_WITH_USER_REQUESTED,
    SAVE_EXCHANGE_CONTACT_WITH_USER_SUCCESS
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    contactList: [],
    isLoading: false,
    error: null,
    isContactUpdate: false
});

export default function contactsReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case FETCH_USER_CONTACT_LIST_REQUESTED:
            return state.set('isLoading', true)
                .set('contactList', []);
        case FETCH_USER_CONTACT_LIST_SUCCESS:
            return state
                .set('isLoading', false)
                .set('contactList', action.data);
        case FETCH_USER_CONTACT_LIST_FAILED:
            return state.set('isLoading', false)
                .set('error', action.error)
                .set('contactList', []);
        case UPDATE_USER_CONTACT_SHARING_PREFERENCES_REQUESTED:
            return state.set('isContactUpdate', true);
        case UPDATE_USER_CONTACT_SHARING_PREFERENCES_SUCCESS:
            return state.set('isContactUpdate', false);
        case SAVE_EXCHANGE_CONTACT_WITH_USER_REQUESTED:
            return state.set('isContactUpdate', true);
        case SAVE_EXCHANGE_CONTACT_WITH_USER_SUCCESS:
            return state.set('isContactUpdate', false);

        case LOGOUT_REQUEST:
            return state.set('isLoading', false)
                .set('error', action.error)
                .set('contactList', []);
        default:
            return state;
    }
}

