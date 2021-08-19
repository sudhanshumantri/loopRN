import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, Modal, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import { Button, Card, Icon, Divider, Avatar } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        marginTop: 20
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        //   fontWeight: 'bold',
        //  width:200
    }
})

//import Icon from "react-native-vector-icons/MaterialIcons";
export default class OutgoingRequestModal extends React.Component {
    constructor() {
        super()
        this.state = {
            showFilteringModal: false,
            location: '',
            time: 30,
        },
            this.timer = 0;
    }
    componentDidMount() {
        this.startTimer()
    }
    startTimer = () => {
        if (this.state.time > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.time - 1;
        this.setState({
            time: seconds

        });
        // Check if we're at zero.
        if (seconds == 0) {
            //close the modal and send the status cancelled
            this.props.closeRequest()
            clearInterval(this.timer);
        }
    }
    closeOutgoingRequestModal = () => {
        this.props.closeRequest();
    }

    setActiveFilterWindow = (screenName) => {
        this.props.setActiveFilterWindow(screenName);
    }
    handleLocationChange = (text) => {
        this.setState({
            location: text
        })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.showOutgoingRequest}
                onRequestClose={this.props.closeRequest}
            >
                <View style={{
                    justifyContent: 'flex-start',
                    backgroundColor: '#2DB38D',
                    flex: 1
                }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>Checking With Doctor</Text>
                        <Text style={{ fontSize: 18, color: 'white', marginTop: 10, marginBottom: 40 }}>Sudhanshu Kumar</Text>
                        <Avatar
                            size={200}
                            rounded
                            title={this.state.time}
                            titleStyle={{ color: 'red', fontWeight: 'bold' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            overlayContainerStyle={{ backgroundColor: 'white', }}
                        />
                        <Text style={{ color: 'white', marginTop: 10 }}>Request will automtically end in 30 seconds</Text>
                        <Text style={{ color: 'white', marginTop: 10 }}>Once Accepted,you will be redirected for payment</Text>
                        <Button title='Cancel' onPress={this.closeOutgoingRequestModal}
                            containerStyle={{ marginTop:30}}
                            buttonStyle={{ borderRadius: 30,padding:10,backgroundColor:'red' }}
                        />
                    </View>





                </View>
            </Modal >
        )
    }
}