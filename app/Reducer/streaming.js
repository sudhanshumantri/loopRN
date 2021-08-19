import { fromJS, List } from 'immutable';
import {
    LISTEN_INCOMING_REQUEST,
    LISTEN_INCOMING_SUCCESS,
    OUTGOING_CALL_REQUEST,
    CALL_END,
    RESET_CALL_STATE,
    RESET_BUSY_STATE
} from '../Actions/actionTypes';

const INITIAL_STATE = fromJS({
    msg: {},
    isCaller: true,
    isBusy: false,
    remoteUserId: null,
    remoteUserName: null,
    callType: 'Video',
    newCall: false
})
export default function streamingReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case LISTEN_INCOMING_REQUEST:
            return state;

        case LISTEN_INCOMING_SUCCESS:
            //get the offer message,remoteUserId
            //set caller falsemsg
            return state
                .set('msg', action.data.msg)
                .set('newCall', true)
                .set('isCaller', false)
                .set('isBusy', true)
                .set('remoteUserId', action.data.remoteUserId)
                .set('remoteUserName', action.data.callerName)
                .set('callType',action.data.callType)
        case OUTGOING_CALL_REQUEST:
            return state
                .set('msg', null)
                .set('newCall', true)
                .set('isCaller', true)
                .set('isBusy', true)
                .set('remoteUserId', action.data.remoteUserId)
                .set('callType', action.data.callType)
                .set('remoteUserName', action.data.remoteUserName)

        case RESET_BUSY_STATE:
            return state
                .set('isBusy', false)
                .set('newCall', false);
        case RESET_CALL_STATE:
            return state
                .set('offerData', {})
                .set('isCaller', true)
                .set('answerError', null)
                .set('answer', null)
                .set('remoteUserName', null)
                .set('isBusy', false)
                .set('newCall', false);

        default:
            return state;
    }
}