import { fromJS, List } from 'immutable';
import {
    SEARCH_CONSULTANT_REQUESTED,
    SEARCH_CONSULTANT_SUCCESS,
    SEARCH_CONSULTANT_FAILED
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    isSearching: true,
    results: [],
    error: null
})
export default function searchReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SEARCH_CONSULTANT_REQUESTED:
            return state
                .set('isSearching', true)
                .set('results', [])
                .set('error', null)
        case SEARCH_CONSULTANT_SUCCESS:
            return state
                .set('isSearching', false)
                .set('results', action.data)
                .set('error', null)
        case SEARCH_CONSULTANT_FAILED:
            return state
                .set('isSearching', false)
                .set('results', [])
                .set('error', action.error)
        default:
            return state;
    }
}