import React from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, Dimensions, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import style from './style';
let index = 0;
export default class ModalPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: undefined
        }
    }
    handleInputValueChange = (inputValue) => {
        this.setState({
            inputValue
        })
    }
    renderModalComponent = () => {
        let { inputValue } = this.state;
        return (<Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={style.modalText}>{this.props.title}</Text>
                    <Input
                        containerStyle={{ height: 60, marginTop: 10 }}
                        placeholder={this.props.placeholder}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        inputStyle={{ color: 'black' }}
                        value={inputValue!=undefined ? inputValue : this.props.value}
                        onChangeText={text => this.handleInputValueChange(text)}
                        // errorMessage={mobileErrorMessage}
                       // keyboardType='phone-pad'
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Pressable
                            style={[style.button, style.buttonClose]}
                            onPress={() => this.props.closePopupModal()}
                        >
                            <Text style={style.textStyleClose}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[style.button, style.buttonSave]}
                            onPress={() => this.props.handleSave(inputValue!=undefined  ? inputValue : this.props.value)}
                        >
                            <Text style={style.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>)
    }
    render() {
        return (
            <View>
                {this.renderModalComponent()}
            </View>
        )
    }
}
