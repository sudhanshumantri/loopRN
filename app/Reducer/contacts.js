import { fromJS, List } from 'immutable';
import {
    FETCH_USER_CONTACT_LIST_REQUESTED,
    FETCH_USER_CONTACT_LIST_SUCCESS,
    FETCH_USER_CONTACT_LIST_FAILED,


} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    contactList:[],
    isLoading: false,
    error: null
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

        default:
            return state;
    }
}

