import { fromJS, List } from 'immutable';
import {
    FETCH_MEMBERSHIP_PLAN_REQUESTED,
    FETCH_MEMBERSHIP_PLAN_SUCCESS,
    FETCH_MEMBERSHIP_PLAN_FAILED,
    FETCH_ARTICLES_REQUESTED,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILED
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    fetching: false,
    memberShipPlan: [],
    error: null,
    articles: []
})
export default function servicesReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case FETCH_MEMBERSHIP_PLAN_REQUESTED:
            return state
                .set('error', null)
                .set('fetching', true)
                .set('memberShipPlan', [])
        case FETCH_MEMBERSHIP_PLAN_SUCCESS:
            return state
                .set('error', null)
                .set('fetching', false)
                .set('memberShipPlan', action.data)
        case FETCH_MEMBERSHIP_PLAN_FAILED:
            return state
                .set('error', action.error)
                .set('fetching', false)
                .set('memberShipPlan', [])

        case FETCH_ARTICLES_REQUESTED:
            return state
                .set('error', null)
                //   .set('fetching', true)
                .set('articles', [])
        case FETCH_ARTICLES_SUCCESS:
            return state
                .set('error', null)
                //    .set('fetching', false)
                .set('articles', action.data)
        case FETCH_ARTICLES_FAILED:
            return state
                .set('error', action.error)
                //  .set('fetching', false)
                .set('articles', [])
        default:
            return state;
    }
}