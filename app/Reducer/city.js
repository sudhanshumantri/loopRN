import { fromJS, List } from 'immutable';
import {
    FETCH_CITY_REQUESTED,
    FETCH_CITY_FAILED,
    FETCH_CITY_SUCCESS,
    FETCH_COUNTRY_FAILED,
    FETCH_COUNTRY_REQUESTED,
    FETCH_COUNTRY_SUCCESS,
    FETCH_STATE_FAILED,
    FETCH_STATE_REQUESTED,
    FETCH_STATE_SUCCESS,
    FETCH_PERMANENT_ADDR_STATE_SUCCESS,
    FETCH_PERMANENT_ADDR_STATE_FAILED,
    FETCH_PERMANENT_ADDR_CITY_REQUESTED,
    FETCH_PERMANENT_ADDR_CITY_SUCCESS,
    FETCH_PERMANENT_ADDR_CITY_FAILED,
    FETCH_PERMANENT_ADDR_STATE_REQUESTED

} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    countryList: [],
    cityList: [],
    stateList: [],
    cityPermList: [],
    statePermList: [],
    isCityLoading: false,
    isCountryLoading: false,
    isStateLoading: false,
    error: null
});

export default function cityReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case FETCH_COUNTRY_REQUESTED:
            return state.set('isCountryLoading', true)
                .set('countryList', []);
        case FETCH_COUNTRY_SUCCESS:
            return state
                .set('isCountryLoading', false)
                .set('countryList', action.data);
        case FETCH_COUNTRY_FAILED:
            return state.set('isCountryLoading', false)
                .set('error', action.error)
                .set('countryList', []);

        case FETCH_STATE_REQUESTED:
            return state.set('isStateLoading', true)
                .set('stateList', []);
        case FETCH_STATE_SUCCESS:
            return state
                .set('isStateLoading', false)
                .set('stateList', action.data.data);
        case FETCH_STATE_FAILED:
            return state.set('isStateLoading', false)
                .set('error', action.error)
                .set('stateList', [])

        case FETCH_CITY_REQUESTED:
            return state.set('isCityLoading', true)
                .set('cityList', [])
        case FETCH_CITY_SUCCESS:
            return state
                .set('isCityLoading', false)
                .set('cityList', action.data.data);
        case FETCH_CITY_FAILED:
            return state.set('isCityLoading', false)
                .set('error', action.error)
                .set('cityList', [])
        //permanent address
        case FETCH_PERMANENT_ADDR_STATE_REQUESTED:
            return state.set('isStateLoading', true)
                .set('statePermList', []);
        case FETCH_PERMANENT_ADDR_STATE_SUCCESS:
            return state
                .set('isStateLoading', false)
                .set('statePermList', action.data.data);
        case FETCH_PERMANENT_ADDR_STATE_FAILED:
            return state.set('isStateLoading', false)
                .set('error', action.error)
                .set('statePermList', [])

        case FETCH_PERMANENT_ADDR_CITY_REQUESTED:
            return state.set('isCityLoading', true)
                .set('cityPermList', [])
        case FETCH_PERMANENT_ADDR_CITY_SUCCESS:
            return state
                .set('isCityLoading', false)
                .set('cityPermList', action.data.data);
        case FETCH_PERMANENT_ADDR_CITY_FAILED:
            return state.set('isCityLoading', false)
                .set('error', action.error)
                .set('cityPermList', [])

        default:
            return state;
    }
}

