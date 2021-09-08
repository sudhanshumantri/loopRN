import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
export default class BasicInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            phone: '',
            name: '',
            nameError: '',
            dob: '',
            dobError: '',
            gender: 'male',
            email: '',
            emailError: '',
            isDateTimePickerVisible: false,

        }
    }
    componentDidMount() {
        this.setState({
            phone: this.props.route.params.phone
        })
    }
    handleNameChange = (name) => {
        this.setState({
            name,
            nameError: ''
        })
    }
    handleEmailChange = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                email,
                emailError: ''
            })
        } else {
            this.setState({
                email,
                emailError: 'Enter valid email'
            })
        }

    }
    handleGenderChange = (gender) => {
        this.setState({
            gender
        })
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        let dob = moment(date).format('DD-MM-YYYY');
        this.setState({
            dob,
            dobError: '',
        })
        this.hideDateTimePicker();
        // this.secondTextInput.focus();
    };
    handleGenderChange = (gender) => {
        this.setState({
            gender
        })
    }
    validatePersonalInfo = () => {
        let isValidated = true;
        let { name, email,
            dob,
            age,
            emailError,
        } = this.state;
        if (name == '') {
            isValidated = false;
            this.setState({
                nameError: 'Enter valid  name'
            })
        }
        if (email == '' || emailError != '') {
            isValidated = false;
            this.setState({
                emailError: 'Enter valid email'
            })
        }
        if (dob == '') {
            isValidated = false;
            this.setState({
                dobError: 'Enter valid DOB'
            })
        }
        if (age == '') {
            isValidated = false;
            this.setState({
                ageError: 'Enter valid age'
            })
        }
        return isValidated;
    }
    handleSubmit = () => {
        if (this.validatePersonalInfo()) {
            let { phone, name, email, dob, gender } = this.state;
            let user = {
                phone, name, email, dob, gender
            }
            this.props.navigation.navigate('SetPassword', { user })
        }

    }

    renderLogo = () => {
        return (
            <View>

                <Image
                    style={{ width: 200, height: 200, }}
                    source={require('../../../assets/loopLogoBlack.png')}
                />
            </View>
        );
    }

    render() {
        // let { isLoading, authError } = this.props;
        let { name, nameError, dob, dobError, email, emailError, gender } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"always"}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'white',

                            // width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            //justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            {this.renderLogo()}
                            <DateTimePickerModal
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                maximumDate={new Date()}
                            />
                            <View style={{
                                backgroundColor: 'white',
                                width: Dimensions.get('window').width * 0.85,
                                // alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}>Basic Information </Text>
                                    {/* <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text> */}

                                </View>

                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Your name '
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='account'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={name}
                                    onChangeText={text => this.handleNameChange(text)}
                                    errorMessage={nameError}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Your email '
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='email'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={email}
                                    onChangeText={text => this.handleEmailChange(text)}
                                    errorMessage={emailError}
                                    keyboardType='email-address'
                                />
                                <TouchableOpacity onPress={this.showDateTimePicker}>

                                    <Input
                                        containerStyle={{
                                            height: 60, marginTop: 10,

                                        }}
                                        // disabled={true}
                                        editable={false}
                                        inputStyle={{ color: 'black' }}
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        placeholder='Select DOB '
                                        placeholder=' Your DOB '
                                        value={dob}
                                        leftIcon={
                                            <Icon
                                                name='birthday-cake'
                                                size={24}
                                                color='black'
                                                type='font-awesome'
                                            />
                                        }
                                        errorMessage={dobError}
                                        rightIcon={<Icon
                                            name='menu-down'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />}

                                    />
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    //  justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    alignItems: 'center'
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                        <CheckBox
                                            title='Male'
                                            checked={gender == 'male' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'black' }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('male')}
                                            checkedColor='black'
                                        />
                                        <CheckBox
                                            title='Female'
                                            checked={gender === 'female' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'black' }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('female')}
                                            checkedColor='black'
                                        />
                                        <CheckBox
                                            title='Other'
                                            checked={gender === 'other' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'black' }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('other')}
                                            checkedColor='black'
                                        />

                                    </View>


                                </View>


                                <Button
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'black' }}
                                    title='Next'
                                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                    onPress={this.handleSubmit} />

                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
