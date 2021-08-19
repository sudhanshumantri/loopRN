import { fromJS, List } from 'immutable';
import { showMessage, hideMessage } from "react-native-flash-message";
import InCallManager from 'react-native-incall-manager';
import {
    GOT_MESSAGES,
    GOT_NEW_MESSAGE,
    FETCH_CHAT_LIST_REQUEST,
    FETCH_CHAT_LIST_SUCCESS,
    FETCH_CHAT_LIST_FAILURE,
    FETCH_CHAT_MESSAGES_REQUEST,
    FETCH_CHAT_MESSAGES_SUCCESS,
    FETCH_CHAT_MESSAGES_FAILURE,
    GOT_NEW_ONGOING_CHAT_MESSAGE,
    SEND_NEW_MESSAGE,
    RESET_MESSAGE_REDUCER
} from '../Actions/actionTypes';
var i = 0;
const INITIAL_STATE = fromJS({
    // GOT_MESSAGES: [],
    //GOT_NEW_MESSAGE: [],
    //if a new message comes,append to the chatList
    inComingchatList: [],
    outGoingchatList: [],
    messages: [],
    messageFetching: true,
    chatFetching: true,
    error: null

})
export default function chatReducer(state = INITIAL_STATE, action = {}) {
    let messageObject = state.toJS()['messages'];
    switch (action.type) {
        // case GOT_MESSAGES:
        //     return action.messages ? action.messages : [];
        // case GOT_NEW_MESSAGE:
        //     return [action.message, ...state]

        case FETCH_CHAT_LIST_REQUEST:
            return state
                .set('chatFetching', true)
                .set('chatList', [])
                .set('error', null)

        case FETCH_CHAT_LIST_SUCCESS:
            return state
                .set('chatFetching', false)
                .set('outGoingchatList', action.data.outgoingRequest)
                .set('inComingchatList', action.data.incomingRequest)
                .set('error', null)
        case FETCH_CHAT_LIST_FAILURE:
            return state
                .set('chatFetching', false)
                .set('chatList', [])
                .set('error', action.error)

        case FETCH_CHAT_MESSAGES_REQUEST:
            //put a check for pagination
            //ui is done for the same
            return state
                .set('messageFetching', true)
                //    .set('messages', [])
                .set('error', null)

        case FETCH_CHAT_MESSAGES_SUCCESS:
            //check if the data is there or not
            messageObject = state.toJS()['messages'];
     //       console.log('fetch chat message success',action.data.length)
            if (action.data.length > 0) {
                let receivedmessageObject = action.data;
                receivedmessageObject = receivedmessageObject.map(element => {
                    let incomingObject = {
                        _id: ++i,
                        text: element.downloadUrl ? '' : element.message,
                        createdAt: element.dateSent,
                        image: element.downloadUrl ? element.downloadUrl : null,
                        fromId: element.fromId,
                        toId: element.toId,
                        user: {
                            _id: element.fromId,
                            //name: 'React Native',
                            //avatar: 'https://placeimg.com/140/140/any',
                        },
                    }
                    messageObject.push(incomingObject)
                    // return incomingObject
                });
                return state
                    .set('messages', messageObject)
                    .set('error', action.error)
                    .set('messageFetching', false)

            } else {
                return state
                    //  .set('messages', messageObject)
                    .set('error', action.error)
                    .set('messageFetching', false)
            }
        case FETCH_CHAT_MESSAGES_FAILURE:
            return state
                .set('messageFetching', false)
                .set('messages', [])
                .set('error', action.error)

        case SEND_NEW_MESSAGE:

            let newMessageObject = null;
            //     console.log(action.data.messageData);
            if (action.data.imageData) {
                if (action.data.isLocal) {
                    newMessageObject = {
                        _id: action.data.imageData.dateSent,
                        text: action.data.imageData.message,
                        createdAt: action.data.imageData.dateSent,
                        image: action.data.imageData.image,
                        fromId: action.data.imageData.fromId,
                        toId: action.data.imageData.toId,
                        user: {
                            _id: action.data.imageData.fromId
                        }
                    };
                }
            } else {
                newMessageObject = {
                    _id: action.data.messageData.dateSent,
                    text: action.data.messageData.message,
                    createdAt: action.data.messageData.dateSent,
                    fromId: action.data.messageData.fromId,
                    toId: action.data.messageData.toId,
                    //   image: action.data.messageData.image,
                    user: {
                        _id: action.data.messageData.fromId
                    }
                };
            }

            if (newMessageObject) {
                messageObject.unshift(newMessageObject);
            }
            return state
                .set('messages', messageObject)
                .set('error', action.error)

        case GOT_NEW_ONGOING_CHAT_MESSAGE:
            //      console.log('GOT_NEW_ONGOING_CHAT_MESSAGE', action.data);
            InCallManager.startRingtone();
            messageObject = state.toJS()['messages'];
            if (messageObject.length > 0) {
                //fetch the first message and check to and from id
                receivedMesaageToId = action.data.toId;
                receivedMessageFromId = action.data.fromId;
                let firstMessage = messageObject[0];
                let existingMessageFromId = firstMessage.fromId;
                let existingMessageToId = firstMessage.toId;
                //     console.log(receivedMesaageToId, receivedMessageFromId, existingMessageFromId, existingMessageToId);
                if (receivedMessageFromId == existingMessageFromId || receivedMessageFromId == existingMessageToId) {
                    //   message belongs to existing 
                    let incomingObject = {
                        _id: ++i,
                        text: action.data.downloadUrl ? '' : action.data.message,
                        createdAt: action.data.dateSent,
                        image: action.data.downloadUrl ? action.data.downloadUrl : null,
                        toId: receivedMesaageToId,
                        fromId: receivedMessageFromId,
                        user: {
                            _id: action.data.fromId,
                            //name: 'React Native',
                            //avatar: 'https://placeimg.com/140/140/any',
                        },
                    }
                    messageObject.unshift(incomingObject);
                    return state
                        .set('messages', messageObject)
                } else {
                    //send notification
                    showMessage({
                        message: "Someone sent you a new message",
                        type: "success",
                    });
                    return state;
                }
                //check existing message to and from id


            } else {
                showMessage({
                    message: "Someone sent you a new message",
                    type: "success",
                });
                //show notification that a new message has arrived
                return state;
            }
        //fetch to and from Id


        //change receiverId to senderId and change the id
        //     console.log('GOT_NEW_ONGOING_CHAT_MESSAGE', action.data.senderId);
        //     let incomingObject = {
        //         _id: i++,
        //         text: action.data.message,
        //         createdAt: action.data.message.createdAt,
        //         user: {
        //             _id: parseInt(action.data.senderId),
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     }
        //    // messageObject.push(incomingObject)
        //     console.log('messageObject', messageObject);
        //     return state
        //  .set('messages', messageObject)
        // .set('error', action.error)
        case RESET_MESSAGE_REDUCER:
            return state
                .set('messages', [])
        default:
            return state;
    }
}
