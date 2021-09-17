import { fromJS, List } from 'immutable';
import {
    FETCH_APP_VERSION_REQUEST,
    FETCH_APP_VERSION_SUCCESS,
    FETCH_APP_VERSION_FAILURE,


} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    appVersion: null,
    isLoading: false,
    error: null
});

export default function utilReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case FETCH_APP_VERSION_REQUEST:
            return state.set('isLoading', true)
                .set('appVersion', null)
                .set('error', null)
                ;
        case FETCH_APP_VERSION_SUCCESS:
            return state
                .set('isLoading', false)
                .set('appVersion', action.data)
                .set('error', null)
                ;
        case FETCH_APP_VERSION_FAILURE:
            return state.set('isLoading', false)
                .set('error', action.error)
                .set('appVersion', null);

        default:
            return state;
    }
}

