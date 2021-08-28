import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Dimensions, ActivityIndicator, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon, Divider } from 'react-native-elements';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const intValidateReg = /^[0]?[789]\d{9}$/;
export default class ProfileRegistrationPersonalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            userId: '',
            name: '',
            nameError: '',
            dob: '',
            dobError: '',
            age: '',
            ageError: '',
            gender: 'male',
            dobResponse: '',
            mobileNumber: '',
            mobileNumberError: '',
            email: '',
            emailError: '',
            instaLink: '',
            fbLink: '',
            linkedinLink: '',
            password: '',
            isDateTimePickerVisible: false,
            focusNext: false


        }
    }
    componentDidMount() {

        // this.bootstrapAsyncUserToken().then(info => {
        //     this.setState({
        //         userId: parseInt(info.userId)
        //     })

        // });
    }
    bootstrapAsyncUserToken = async () => {
        return {
            userId: await AsyncStorage.getItem('userId'),
            token: await AsyncStorage.getItem('token')
        };

    };
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
    handleMobileChange = (mobileNumber) => {
        if (/^[0]?[789]\d{9}$/.test(mobileNumber) || mobileNumber === '') {
            this.setState({
                mobileNumber,
                mobileNumberError: ''
            })
        } else {
            this.setState({
                mobileNumber,
                mobileNumberError: 'Enter valid 10 digits mobile no.'
            })
        }
    }
    handleGenderChange = (gender) => {
        this.setState({
            gender
        })
    }
    handleLinkedInChange = (linkedinLink) => {
        this.setState({
            linkedinLink,

        })
    }
    handleFBLinkChange = (fbLink) => {
        this.setState({
            fbLink,

        })
    }
    handleInstaIDChange = (instaLink) => {
        this.setState({
            instaLink,

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
        let dobResponse = moment(date).format('YYYY/MM/D');
        let ageCalculated = moment().diff(moment(date), 'years');
        this.setState({
            dob,
            age: ageCalculated.toString(),
            ageError: '',
            dobError: '',
            focusNext: true,
            dobResponse

        })

        this.hideDateTimePicker();
        // this.secondTextInput.focus();
    };
    calculateDOB = () => {
        let { age } = this.state
        let dob = moment().subtract(age, 'years').format('D-MM-YYYY');
        let dobResponse = moment().subtract(age, 'years').format('YYYY/MM/D');
        this.setState({
            dob: dob,
            dobError: '',
            dobResponse: dobResponse
        })
    }
    handleAgeChange = (age) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(age) || age === '') {
            this.setState({
                age: age,
                ageError: ''
            })
        }
    }
    validatePersonalInfo = () => {
        let isValidated = true;
        let { name, mobileNumber, email,
            dob,
            age,
            mobileNumberError,
            emailError,
        } = this.state;
        if (name == '') {
            isValidated = false;
            this.setState({
                nameError: 'Enter valid  name'
            })
        }
        if (mobileNumber == '' || mobileNumberError != '') {
            isValidated = false;
            this.setState({
                mobileNumberError: 'Enter valid 10 digits mobile no.'
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
            let { name,
                dob,
                age,
                gender,
                mobileNumber,
                email,
                instaLink,
                linkedinLink,
                fbLink,

            } = this.state;
            let data = {
                //    userId,
                phone: mobileNumber,
                email: email,
                password: "123",
                name: name,
                gender,
                dob: dob,
                instaLink,
                fbLink,
                linkedinLink
            }
            //  console.log(data);
            this.props.registerUser(data);
            //save the personalInfo Object and send it to next page : 
            //  this.props.updatePersonalInfo(data);
            // this.props.navigation.navigate('ProfileRegistrationAddressInfo', { user: data })
        }


        //this.props.navigation.navigate('ProfileRegistrationAddressInfo')
    }

    renderPersonalInfo = () => {
        let {
            name,
            nameError,
            dob,
            dobError,
            age,
            ageError,
            gender,
            mobileNumber,
            mobileNumberError,
            email,
            emailError,
            instaLink,
            fbLink,
            linkedinLink,
            password,
            focusNext } = this.state;
        return (
            <View style={{
                padding: 5,
                marginBottom: 5
            }}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2DB38D' }}>Personal Information</Text>

                </View>
                <DateTimePickerModal
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    maximumDate={new Date()}
                />
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 10
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Name '
                    value={name}
                    label='Name*'
                    onChangeText={text => this.handleNameChange(text)}
                    errorMessage={nameError}

                />
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 30
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter mobile number '
                    value={mobileNumber}
                    label='Mobile No.*'
                    onChangeText={text => this.handleMobileChange(text)}
                    errorMessage={mobileNumberError}
                    keyboardType='phone-pad'

                />
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 30
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter email'
                    value={email}
                    label='Email*'
                    onChangeText={text => this.handleEmailChange(text)}
                    errorMessage={emailError}

                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingLeft: 5,
                    paddingRight: 5
                    // alignItems:'center'
                }}>
                    <TouchableOpacity onPress={this.showDateTimePicker}>

                        <Input
                            containerStyle={{
                                height: 60, marginTop: 30,
                                width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            disabled={true}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            placeholder='Select DOB '
                            label='DOB'
                            value={dob}
                            // disabled={true}
                            // onChangeText={text => this.handleMobileNumberChange(text)}
                            errorMessage={dobError}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                            />}

                        />
                    </TouchableOpacity>
                    <Input

                        containerStyle={{ height: 60, marginTop: 30, width: Math.round(Dimensions.get('window').width / 2) }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Age'
                        label='Age'
                        // focus={focusNext}
                        value={age}
                        onChangeText={text => this.handleAgeChange(text)}
                        keyboardType={'decimal-pad'}
                        errorMessage={ageError}
                        onBlur={this.calculateDOB}
                    />

                </View>
                <View style={{
                    flexDirection: 'row',
                    //  justifyContent: 'space-evenly',
                    paddingLeft: 5,
                    paddingRight: 5,
                    alignItems: 'center'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 30,
                    }}>
                        <CheckBox
                            title='Male'
                            checked={gender == 'male' ? true : false}
                            textStyle={{ marginLeft: -1 }}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                            onPress={() => this.handleGenderChange('male')}
                            checkedColor='#2DB38D'
                        />
                        <CheckBox
                            title='Female'
                            checked={gender === 'female' ? true : false}
                            textStyle={{ marginLeft: -1 }}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                            onPress={() => this.handleGenderChange('female')}
                            checkedColor='#2DB38D'
                        />
                        <CheckBox
                            title='Other'
                            checked={gender === 'other' ? true : false}
                            textStyle={{ marginLeft: -1 }}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                            onPress={() => this.handleGenderChange('other')}
                            checkedColor='#2DB38D'
                        />

                    </View>


                </View>
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 30
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter LinkedIn Profile Link'
                    value={linkedinLink}
                    label='LinkedIn Profile'
                    onChangeText={text => this.handleLinkedInChange(text)}


                />
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 30
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Facebook Profile Link'
                    value={fbLink}
                    label='Facebook Profile'
                    onChangeText={text => this.handleFBLinkChange(text)}


                />
                <Input
                    containerStyle={{
                        height: 60,
                        marginTop: 30
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Instagram Username'
                    value={instaLink}
                    label='Instagram Id'
                    onChangeText={text => this.handleInstaIDChange(text)}

                />
                <Button
                    buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 10 }}
                    title='Continue'
                    onPress={this.handleSubmit}
                />

            </View>
        )
    }


    render() {
        let { isLoading } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#6b3871', flex: 1, }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                    >
                        <Spinner color='grey'
                            visible={isLoading}
                        />
                        <View style={{

                            alignItems: 'center',


                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                margin: 10,
                                padding: 5,
                                borderRadius: 5

                            }}>
                                {this.renderPersonalInfo()}

                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
