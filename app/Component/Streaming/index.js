import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Dimensions } from 'react-native';
// import {
//     RTCPeerConnection,
//     RTCIceCandidate,
//     RTCSessionDescription,
//     RTCView,
//     MediaStream,
//     MediaStreamTrack,
//     mediaDevices,
//     registerGlobals
// } from 'react-native-webrtc';
import moment from 'moment';
var duration = require("moment-duration-format");
import { Button, Icon, Avatar } from 'react-native-elements';
import InCallManager from 'react-native-incall-manager';
import socket from '../../Store/socket';
let configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
let pc = null;
var mediaConstraints = {
    audio: true, // We want an audio track
    video: true // ...and we want a video track
};

export default class Streaming extends React.Component {
    constructor() {
        super();
        this.state = {
            videoUrl: null,
            //when caller calls and waiting for answer
            isConnected: false,
            callEnded: false,
            remoteVideo: null,
            isFront: true,
            isCaller: false,
            answerStatus: null,
            callType: 'Video',
            //storing offer message till the call has been accepted
            offer: {},
            userId: 33,
            remoteUserId: 32,
            //if the call is coming
            isIncomingCall: false,
            callEndReason: null,
            currentCount: 0,
            isNegotiating: false
        },
            this.callTimwer = React.createRef();
    }

    componentDidMount() {
        socket.on('streaming-response', this.handleIncomingRequest);
        //this.setState({ currentCount: 0 });
        let { isCaller, msg, remoteUserId, remoteUserName, callType } = this.props;
        console.log(remoteUserId);
        this.setState({
            isCaller,
            remoteUserId,
            remoteUserName,
            callType,
            offer: msg,
            isIncomingCall: isCaller ? false : true
        })
        if (msg && msg.type == 'offer') {
            InCallManager.startRingtone('_BUNDLE_');
            // this.setState({
            //     isIncomingCall: true,
            //     offer: data.msg
            // })
        }
        //  console.log(InCallManager.recordPermission);
        // if (InCallManager.recordPermission !== 'granted') {
        //     InCallManager.requestRecordPermission()
        //         .then((requestedRecordPermissionResult) => {
        //             console.log("InCallManager.requestRecordPermission() requestedRecordPermissionResult: ", requestedRecordPermissionResult);
        //         })
        //         .catch((err) => {
        //             console.log("InCallManager.requestRecordPermission() catch: ", err);
        //         });
        // }
        //     this.createPeerConnection();
        if (isCaller) {
            this.handleOutgoingCall(callType)
        }

    }
    componentWillReceiveProps(nextProps) {
        let { isCaller, msg, isNewCall, remoteUserId, remoteUserName, callType } = nextProps;
        if (isNewCall) {
            this.setState({
                isCaller,
                remoteUserId,
                remoteUserName,
                callType,
                offer: msg,
                isIncomingCall: isCaller ? false : true
            })
            if (msg && msg.sdp && msg.type == 'offer') {
                InCallManager.startRingtone('_BUNDLE_');
                // this.setState({
                //     isIncomingCall: true,
                //     offer: data.msg
                // })
            }
            if (isCaller) {
                this.handleOutgoingCall(callType)
            }
        }
    }
    handleIncomingRequest = (data) => {
        if (data) {
            //check whether its a offer/answer or a candidate
            if (data.msg) {
                if (data.msg.sdp) {
                    //console.log('*****inside offer**********', data)
                    if (data.msg.type == 'offer') {
                        // InCallManager.startRingtone('_BUNDLE_');
                        // this.setState({
                        //     isIncomingCall: true,
                        //     offer: data.msg
                        // })
                        //    this.handleVideoOfferMsg(data.msg, data.remoteUserId)
                    } else {
                        //console.log('*****inside answer**********', data)
                        this.handleVideoAnswerMsg(data.msg)
                    }
                } else if (data.msg.candidate) {
                    //    console.log(pc)

                    if (pc) {
                        console.log('RTCIceCandidate');
                        var candidate = new RTCIceCandidate(data.msg);
                        //   console.log('inside ice candidate addition',candidate)
                        pc.addIceCandidate(candidate)
                            .catch(reportError => {
                                console.log('reportError', reportError)
                            });
                     }
                     // else {
                    //     this.createPeerConnection();
                    //     pc.addIceCandidate(candidate)
                    //         .catch(reportError => {
                    //             console.log('reportError', reportError)
                    //         });
                    // }
                }
            } else if (data.isBusy) {
                this.closeNotConnectedVideoCall(true)
                this.setState({
                    callEndReason: 'Busy'
                })
            } else if (data.callEnded) {
                //console.log('comingcallEnded')
                InCallManager.stopRingback();
                InCallManager.stopRingtone()
                this.closeVideoCall(true)
                this.setState({
                    callEndReason: data.reason
                })
            }

        }
    }
    componentWillUnmount() {
        this.props.resetCallState()
    }

    //call this once the call has been accepted babes : 
    handleVideoOfferMsg = (msg) => {
        this.createPeerConnection(false);
        let { isFront, userId, remoteUserId, callType } = this.state;
        var desc = new RTCSessionDescription(msg);
        //console.log(dc)
        pc.setRemoteDescription(desc).then(function () {
            return mediaDevices.getUserMedia({
                audio: true,
                video: callType == 'Video' ? true : false
            });
        }).then((stream) => {
            this.setState({
                videoUrl: stream,
                isConnected: true,
                isIncomingCall: false,
                callEnded: false
            })
            pc.addStream(stream);
            //  this.localVideo.setNativeProps({ streamURL: stream.toURL() })
        }).then(function () {
            return pc.createAnswer();
        }).then(function (answer) {
            return pc.setLocalDescription(answer);
        }).then(function () {
            //  console.log('coming here to emit babes', pc.localDescription);
            socket.emit('streaming-emit', {
                msg: pc.localDescription,
                remoteUserId: remoteUserId,
                callerId: userId,
                type: 'video answer emmit callee'
                // callerName: 'Sudhanshu'
            });
        })
            .catch(this.handleGetUserMediaError);
    }
    handleVideoAnswerMsg = (answer) => {
        console.log('video answer mesages');
        var desc = new RTCSessionDescription(answer);
        console.log('desc', desc);
        pc.setRemoteDescription(desc).then(() => {

            console.log('setRemoteDescription');
            let { isConnected } = this.state;
            if (!isConnected)
                this.setState({
                    isConnected: true,
                    isIncomingCall: false,
                    callEnded: false
                })
        }).catch(reportError => {
            console.log('setRemoteDescription', reportError);
        });
        InCallManager.stopRingback();
    }
    createPeerConnection = (isCaller) => {
        pc = new RTCPeerConnection(configuration
        );
        // console.log('createPeerConnection', isCaller)
        if (isCaller) {
            pc.onnegotiationneeded = this.handleNegotiationNeededEvent;
        }
        pc.onicecandidate = this.handleICECandidateEvent;
        pc.onaddstream = this.handleTrackEvent;
        // pc.onremovetrack = handleRemoveTrackEvent;
        pc.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
        // pc.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
        pc.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    }
    handleSignalingStateChangeEvent = () => {
        console.log('handleSignalingStateChangeEvent', pc.signalingState);
    }
    handleICEConnectionStateChangeEvent = () => {
        console.log('ICE state: ', pc.iceConnectionState);
        if (pc.iceConnectionState == 'disconnected' || pc.iceConnectionState == 'failed') {
            //close the connections :
            let { remoteUserId, userId } = this.state;
            this.closeVideoCall();
            // socket.emit("streaming-emit", {
            //     // msg: pc.localDescription,
            //     remoteUserId,
            //     callerName: 'Sudhanshu',
            //     callerId: userId,
            //     callEnded: true,
            //     reason: 'Something went wrong',
            //     type: 'call dropped'
            // });
        }
    }
    handleNegotiationNeededEvent = () => {
        let { remoteUserId, userId, callType } = this.state;
        console.log('handleNegotiationNeededEvent', remoteUserId, userId, callType);
        pc.createOffer().then(desc => {
            //    console.log('handleNegotiationNeededEvent');
            pc.setLocalDescription(desc).then(() => {

                //offer message babes : 
                socket.emit("outgoing-call-offer", {
                    msg: pc.localDescription,
                    remoteUserId,
                    callerName: 'Sudhanshu',
                    callerId: userId,
                    callType
                });

            });
        });
    }
    handleICECandidateEvent = (event) => {
        console.log('handleICECandidateEvent', event.candidate);
        let { remoteUserId, userId } = this.state
        if (event.candidate) {
            // console.log(event.candidate)
            socket.emit("streaming-emit", {
                msg: event.candidate,
                remoteUserId,
                callerName: 'Sudhanshu',
                callerId: userId,
                type: 'handleICECandidateEvent callee'
            });
        }
    }
    handleTrackEvent = (event) => {
        //   console.log('****************handleTrackEvent****************************');
        this.setState({
            remoteVideo: event.stream
        })
    }
    handleGetUserMediaError = (e) => {
        console.log('media error', e)
        switch (e.name) {
            case "NotFoundError":
                alert("Unable to open your call because no camera and/or microphone" +
                    "were found.");
                break;
            case "SecurityError":
            case "PermissionDeniedError":
                // Do nothing; this is the same as the user canceling the call.
                break;
            default:
                alert("Error opening your camera and/or microphone: " + e);
                break;
        }

        this.closeVideoCall();
    }

    closeVideoCall = () => {
        console.log('coming inside this for closing');
        let { videoUrl, remoteVideo, remoteUserId, userId } = this.state;
        this.props.resetBusyState()
        // console.log('closeVideoCall');
        if (pc) {
            pc.ontrack = null;
            pc.onremovetrack = null;
            pc.onremovestream = null;
            pc.onicecandidate = null;
            pc.oniceconnectionstatechange = null;
            pc.onsignalingstatechange = null;
            pc.onicegatheringstatechange = null;
            pc.onnegotiationneeded = null;
            if (remoteVideo) {

                remoteVideo.getTracks().forEach(track => track.stop());
            }
            if (videoUrl) {

                videoUrl.getTracks().forEach(track => track.stop());
            }

            pc.close();
            pc = null;
            //offer message babes : 
            //callEnded:true
            //emit that video has been closed with a reason : 

        }
        //     console.log('disconnected babes');
        this.setState({
            remoteVideo: null,
            videoUrl: null,
            callEnded: true,
            isConnected: false,
            isIncomingCall: false
        })
    }
    handleOutgoingCall = (callType) => {
        this.createPeerConnection(true);
        InCallManager.startRingback({ media: 'audio', ringback: '_DTMF_' });
        const { isFront } = this.state;
        mediaDevices.getUserMedia({
            audio: true,
            video: callType == 'Video' ?
                {
                    mandatory: {
                        minWidth: 500, // Provide your own width, height and frame rate here
                        minHeight: 300,
                        minFrameRate: 30
                    },
                }
                : false,
        }).then(stream => {
            console.log('stream', 'coming inside stream babes', stream.toURL());
            this.setState({
                videoUrl: stream
            })
            //   this.localVideo.setNativeProps({ streamURL: stream.toURL() })
            pc.addStream(stream);
        })

        //   })
    }
    handleAcceptIncomingCall = () => {
        //start the call and send the response that call has been accepted
        let { offer } = this.state;
        InCallManager.stopRingtone();
        this.handleVideoOfferMsg(offer)
    }
    hungup = () => {

        let { remoteUserId, userId } = this.state;
        this.closeVideoCall();
        InCallManager.stopRingback();
        socket.emit("streaming-emit", {
            // msg: pc.localDescription,
            remoteUserId,
            callerName: 'Sudhanshu',
            callerId: userId,
            callEnded: true,
            reason: 'Hunged UP',
            type: 'call hunged Up'
        });
    }
    handleRejectIncomingCall = () => {
        //send the response that call has been rejected
        let { remoteUserId, userId } = this.state;
        InCallManager.stopRingtone();
        this.closeVideoCall()
        socket.emit("streaming-emit", {
            // msg: pc.localDescription,
            remoteUserId,
            callerName: 'Sudhanshu',
            callerId: userId,
            callEnded: true,
            reason: 'Declined',
            type: 'call rejected'
        });

    }
    renderIncomingCall = () => {
        let { isCaller, offer } = this.props;
        return (
            <View style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#2DB38D'
            }}>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Text style={{ color: 'white', fontSize: 30, lineHeight: 30, fontWeight: 'bold' }}>Incoming call {'\n'}</Text>
                    <Text style={{ color: 'white', fontSize: 20, lineHeight: 20, fontWeight: 'bold' }}>Sudhanshu{/*offer.callerName ? offer.callerName : ''*/}</Text>
                </View>
                <View style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: 50
                }}>
                    <Icon
                        raised
                        name='phone'
                        type='material-community'
                        size={30}
                        color='#f50'
                        activeOpacity={5}
                        onPress={() => this.handleAcceptIncomingCall()} />
                    <Icon
                        raised
                        name='cancel'
                        type='material-community'
                        color='#f50'
                        size={30}
                        activeOpacity={5}
                        onPress={() => this.handleRejectIncomingCall()} />
                </View>

            </View>
        )
    }
    callAgain = () => {
        this.setState({
            callEnded: false,
            isCaller: true,
            callEndReason: null
        });
        let { callType, remoteUserId, remoteUserName } = this.state;
        //  console.log(callType, remoteUserId, remoteUserName);

        //call the action
        this.props.outGoingCall({ remoteUserId, remoteUserName, callType })
        //  this.handleOutgoingCall(callType)

    }
    closeNotConnectedVideoCall = () => {

        InCallManager.stopRingback();
        this.closeVideoCall();
        let { remoteUserId, userId } = this.state;
        socket.emit("streaming-emit", {
            // msg: pc.localDescription,
            remoteUserId,
            callerName: 'Sudhanshu',
            callerId: userId,
            callEnded: true,
            reason: 'Declined',
            type: 'call rejected'
        });

    }
    renderCallEnded = () => {
        let { remoteUserName } = this.state;
        return (
            <SafeAreaView style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#2DB38D'
            }}>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>

                    <Text style={{ color: 'white', fontSize: 30, lineHeight: 30, fontWeight: 'bold' }}>Call Ended</Text>
                    <Text style={{ fontWeight: 'bold' }}>1.30 sec{'\n'}</Text>

                    <Text style={{ color: 'white', fontSize: 20, lineHeight: 20, fontWeight: 'bold' }}>{remoteUserName}</Text>
                    <Text style={{ color: 'red', fontSize: 15, lineHeight: 15, }}>{this.state.callEndReason}</Text>

                </View>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                    <Icon
                        raised
                        name='phone'
                        type='material-community'
                        size={30}
                        color='#f50'
                        activeOpacity={5}
                        onPress={() => this.callAgain()} />
                    <Text style={{ color: 'white' }}>Call Again</Text>
                </View>

            </SafeAreaView>
        )
    }
    renderOutgoingCall = () => {
        let { remoteUserName } = this.state;
        return (

            <View style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#2DB38D'
            }}
            //       ref={component => { this.localVideo = component }}
            >
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Text style={{ color: 'white', fontSize: 30, lineHeight: 30, fontWeight: 'bold' }}>Calling {'\n'}</Text>
                    <Text style={{ color: 'white', fontSize: 20, lineHeight: 20, fontWeight: 'bold' }}>{remoteUserName}</Text>
                </View>

                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                    <Avatar
                        size="large"
                        rounded
                        icon={{ name: 'phone-hangup', type: 'material-community' }}
                        overlayContainerStyle={{ backgroundColor: 'red', }}
                        onPress={() => this.hungup()}
                        activeOpacity={0.7}
                        containerStyle={{ color: 'red' }}
                    />
                </View>

            </View>

        )
    }
    renderOngoingCall = () => {
        return (
            <View key={1} style={[{
                flex: 1,

                backgroundColor: '#2DB38D',
                width: Dimensions.get('window').width,
                height: 100,
                overflow: 'hidden',

            }]}
            //  ref={component => this.localVideo = component}
            >
                <RTCView style={[{
                    flex: 0.2,
                    overflow: 'hidden',
                    width: Dimensions.get('window').width,
                    //  backgroundColor: 'red'
                }]}
                    ref={component => { this.localVideo = component }}
                />
                <RTCView objectFit='cover' style={[{
                    flex: 1,
                    overflow: 'hidden',
                    backgroundColor: 'red'
                }]}
                    streamURL={this.state.videoUrl ? this.state.videoUrl.toURL() : null} />
                <View style={{ marginTop: -150, color: 'red', alignItems: 'center' }}>
                    <Avatar
                        size="large"
                        rounded
                        icon={{ name: 'phone-hangup', type: 'material-community' }}
                        overlayContainerStyle={{ backgroundColor: 'red', }}
                        onPress={() => this.closeNotConnectedVideoCall()}
                        activeOpacity={0.7}
                        containerStyle={{ color: 'red' }}
                    />
                </View>

            </View>
        )
    }
    //if user tends to respond,start this,otherwise emit end with reason :'not answered/declined' 


    render() {
        let { isIncomingCall, callEnded, isConnected, videoUrl, callType } = this.state;
        // console.log(this.state.videoUrl ? this.state.videoUrl.toURL() : null, callType, moment("1982-5-25").countdown("1955-8-21").toString(); )
        if (isIncomingCall) {
            return this.renderIncomingCall()
        }
        else if (!isConnected && !callEnded) {
            return (
                this.renderOutgoingCall()
            )

        } else if (callEnded) {
            return (
                this.renderCallEnded()
            )

        }
        else if (isConnected) {
            return (
                <SafeAreaView key={1} style={[{
                    flex: 1,
                    backgroundColor: '#2DB38D',
                    width: Dimensions.get('window').width,
                    height: 100,
                    overflow: 'hidden',

                }]}>
                    <RTCView style={[{
                        flex: 0.2,
                        overflow: 'hidden',
                        width: Dimensions.get('window').width,
                        //  backgroundColor: 'red'
                    }]}
                        //       ref={component => { this.localVideo = component }}
                        //   ref={this.localVideo}
                        streamURL={this.state.videoUrl ? this.state.videoUrl.toURL() : null}
                    />

                    <RTCView objectFit='cover' style={[{
                        flex: 1,
                        overflow: 'hidden',
                        backgroundColor: 'red'
                    }]}
                        streamURL={this.state.remoteVideo ? this.state.remoteVideo.toURL() : null} />
                    <View style={{ marginTop: -150, color: 'red', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{this.state.currentCount}</Text>
                        <Avatar
                            size="large"
                            rounded
                            icon={{ name: 'phone-hangup', type: 'material-community' }}
                            overlayContainerStyle={{ backgroundColor: 'red', }}
                            onPress={() => this.hungup()}
                            activeOpacity={0.7}
                            containerStyle={{ color: 'red' }}
                        />
                    </View>

                </SafeAreaView>
            )
        }
    }
}

