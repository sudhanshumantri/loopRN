import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Dimensions, ActivityIndicator, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon, Divider } from 'react-native-elements';

import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {
    AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const intValidateReg = /^[0]?[789]\d{9}$/;
export default class ProfileRegistrationPersonalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            userId: '',
            firstName: '',
            firstNameError: '',
            middleName: '',
            lastName: '',
            lastNameError: '',
            dob: '',
            dobError: '',
            age: '',
            ageError: '',
            gender: 'male',
            height: '',
            heightError: '',
            weight: '',
            weightError: '',
            dobResponse: '',
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
    handleFirstNameChange = (firstName) => {
        this.setState({
            firstName,
            firstNameError: ''
        })
    }
    handleMiddleNameChange = (middleName) => {
        this.setState({
            middleName
        })
    }
    handleLastNameChange = (lastName) => {
        this.setState({
            lastName,
            lastNameError: ''
        })
    }

    handleMobileChange = (altenate_Mobile) => {
        if (/^[\d]+$/.test(altenate_Mobile) || altenate_Mobile === '') {
            this.setState({
                altenate_Mobile,
                altenate_MobileError: ''
            })
        }
        else {
            this.setState({

                altenate_MobileError: ''
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

        let dob = moment(date).format('D-MM-YYYY');
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
    handleWeightChange = (weight) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(weight) || weight === '') {
            this.setState({
                weight: weight,
                weightError: ''
            })
        }
    }

    handleHeightChange = (height) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(height) || height === '') {
            this.setState({
                height: height,
                heightError: ''
            })
        }
    }



    handleAadharNumberChange = (adharNo) => {
        if (/^[\d]+$/.test(adharNo) || adharNo === '') {
            this.setState({
                adharNo, adharNoError: ''
            })

        } else {
            this.setState({
                adharNoError: ''
            })
        }
    }
    validatePersonalInfo = () => {
        let isValidated = true;
        let { firstName,
            lastName, middleName,
            userId,
            dob,
            age,
            height, weight } = this.state;
        if (firstName == '') {
            isValidated = false;
            this.setState({
                firstNameError: 'Please Enter First Name'
            })
        }
        if (lastName == '') {
            isValidated = false;
            this.setState({
                lastNameError: 'Please Enter Last Name'
            })
        }

        if (dob == '') {
            isValidated = false;
            this.setState({
                dobError: 'Please Enter DOB'
            })
        }
        if (age == '') {
            isValidated = false;
            this.setState({
                ageError: 'Please Enter Age'
            })
        }
        if (weight == '') {
            isValidated = false;
            this.setState({
                weightError: 'Please Enter Weight'
            })
        }
        if (height == '') {
            isValidated = false;
            this.setState({
                heightError: 'Please Enter Height'
            })
        }


        return isValidated;
    }
    handleSubmit = () => {
        if (this.validatePersonalInfo()) {
            let { firstName,
                lastName, middleName,
                dob,
                age,
                gender,
                height, weight,
                dobResponse
            } = this.state;
            let data = {
                //    userId,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                gender,
                dob: dobResponse,
                height: parseInt(height),
                weight: parseInt(weight)
            }

            //save the personalInfo Object and send it to next page : 
            //  this.props.updatePersonalInfo(data);
            this.props.navigation.navigate('ProfileRegistrationAddressInfo', { user: data })
        }


        //this.props.navigation.navigate('ProfileRegistrationAddressInfo')
    }

    renderPersonalInfo = () => {
        let {
            firstName,
            firstNameError,
            lastName,
            lastNameError,
            middleName,
            dob,
            dobError,
            age,
            ageError,
            height,
            weight,
            heightError,
            weightError,
            gender,
            focusNext } = this.state;
        return (
            <View style={{
                padding: 5,
                marginBottom: 5
            }}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2DB38D' }}>Personal Information</Text>

                </View>
                <DateTimePicker
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
                    placeholder='Enter First Name '
                    value={firstName}
                    label='First Name'
                    onChangeText={text => this.handleFirstNameChange(text)}
                    errorMessage={firstNameError}

                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,

                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Middle Name'
                    value={middleName}
                    label='Middle Name'
                    onChangeText={text => this.handleMiddleNameChange(text)}
                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        //   width: Math.round(Dimensions.get('window').width / 3) 
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Last Name '
                    label='Last Name'
                    value={lastName}
                    onChangeText={text => this.handleLastNameChange(text)}
                    errorMessage={lastNameError}

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
                    justifyContent: 'space-evenly',
                    paddingLeft: 5,
                    paddingRight: 5
                    // alignItems:'center'
                }}>


                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            width: Math.round(Dimensions.get('window').width / 2.3)
                        }}

                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Weight in KG'
                        label='Weight (KG)'
                        value={weight}
                        keyboardType={'decimal-pad'}
                        // disabled={true}
                        onChangeText={text => this.handleWeightChange(text)}
                        errorMessage={weightError}
                    />

                    <Input

                        containerStyle={{ height: 60, marginTop: 30, width: Math.round(Dimensions.get('window').width / 2) }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Height in CM'
                        label='Height (CM)'
                        keyboardType={'decimal-pad'}
                        value={height}
                        onChangeText={text => this.handleHeightChange(text)}
                        errorMessage={heightError}
                    // onBlur={this.calculateDOB}
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
            <SafeAreaView style={{ backgroundColor: '#2DB38D', backgroundColor: '#2DB38D', flex: 1, }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={true}
                    >
                        <Spinner color='grey'
                            visible={isLoading}
                        />
                        <View style={{

                            alignItems: 'center',


                        }}>
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>Thank you for registering with us!</Text>
                                <Text style={{ color: '#202748', fontSize: 16, lineHeight: 25 }}>Please fill the details below.</Text>
                            </View>
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
