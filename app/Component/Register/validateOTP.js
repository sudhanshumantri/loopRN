import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class ValidateOTP extends React.Component {
    constructor() {
        super()
        this.state = {
            mobile: '',
            otp: Array(6).fill(''),
            otpValidationError: null,
            password: '',
            passwordCheck: '',
            passwordError: '',
            OTPResent: false,
            isResetPassword: false,
            //   otpTextInput=[6]

        }
        this.otpTextInput = [6];
        //     this.focusOTP();
        //     this.otpTextInput[0].focus();
        //this.otpTextInput[] = React.createRef();
    }
    componentDidMount() {
        let mobile = this.props.navigation.getParam('mobile');
        let isResetPassword = this.props.navigation.getParam('resetPassword');

        this.setState({
            mobile,
            isResetPassword
        })
        //    this.props.generateOTP(mobile);
        this.focusOTP();
        //now call the otp and integrate the things babes : 
    }

    focusOTP = () => {
     //   console.log('coming here', this.otpTextInput);
        this.otpTextInput[0].focus();
    };
    handleOTPChange = (otp) => {
        this.setState({
            otp
        })
    }
    handlePasswordChange = (password) => {
        this.setState({
            password
        })
    }
    handleRePasswordChange = (passwordCheck) => {
        this.setState({
            passwordCheck
        })
    }
    hanleResendOTP = () => {
        let { mobile, isResetPassword } = this.state;
        // forgetPassword:true 
        this.props.generateOTP({ mobile: mobile, forgetPassword: isResetPassword });
        this.focusOTP();
        this.setState({
            OTPResent: true,
            otp: Array(6).fill(''),
        })
    }
    validateOTPFields = () => {
       let  isValidated = true;
        let { otp } = this.state;
        otp.forEach(element => {
            if (element == '') {
                isValidated = false;
                this.setState({
                    otpValidationError: true
                })
            }

        });
        return isValidated;
    }
    handleSubmit = () => {
        let { otp, mobile } = this.state;
        //  console.log(otp);
        if (this.validateOTPFields()) {

            this.props.validateOTP({
                mobile,
                otp: otp.join('')
            })
            this.setState({ OTPResent: false })
        }
    }
    handleUserRegistration = () => {

        let { password, passwordCheck, mobile } = this.state;
        let { otpToken } = this.props;
        if (password == passwordCheck) {
            if (password.match(/[a-z]/g) && password.match(
                /[A-Z]/g) && password.match(
                    /[0-9]/g) && password.match(
                        /[^a-zA-Z\d]/g) && password.length >= 6) {
                //call the registration api with the token received from OTP : 
                let isResetPassword = this.props.navigation.getParam('resetPassword');
                this.props.registerUser({ userData: { mobile, password }, otpToken, isResetPassword })

            } else {
                this.setState({
                    passwordError: 'Password is not valid'
                })
            }
        } else {
            this.setState({
                passwordError: 'Password is not matching'
            })
        }


    }
    focusNext = (index, text) => {

        const otp = this.state.otp;
        if (/^[\d]+$/.test(text)) {
            otp[index] = text.charAt(text.length - 1);
            this.setState({ otp });

            if (index < this.otpTextInput.length - 1 && text) {
                this.otpTextInput[index + 1].focus();
            }
            // if (index === this.otpTextInput.length - 1) {
            //     this.otpTextInput[0].focus();
            // }
        }
    }
    renderInputs = () => {
        const inputs = Array(6).fill(0);
        let { otp } = this.state;
        return inputs.map((i, j) => {
            return (
                <View style={{ flex: 1 / 6, }}>
                    <Input
                        keyboardType="number-pad"
                        onChangeText={v => this.focusNext(j, v)}
                        autoFocus={j == 0 ? true : false}
                        value={otp[j]}
                        ref={ref => this.otpTextInput[j] = ref}
                    //maxLength={1}

                    />
                </View>
            )
        }
        );
    }
    render() {
        let { isLoading, error, generatedOTP, isValidationRequested, isOTPValidated, isUserRegistrationRequested } = this.props;
        let { otpValidationError, password, passwordCheck, passwordError, OTPResent } = this.state;
        let { mobile } = this.state;
        return (
            <SafeAreaView>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <Spinner color='grey'
                        visible={isLoading || isValidationRequested || isUserRegistrationRequested}
                    />
                    <View style={{
                        backgroundColor: '#2DB38D',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            height: Dimensions.get('window').height * 0.50,
                            width: Dimensions.get('window').width * 0.85,
                            alignItems: 'center',
                            borderRadius: 5
                        }}>
                            <Card containerStyle={{
                                borderRadius: 5,
                                height: Dimensions.get('window').height * 0.50,
                                width: Dimensions.get('window').width * 0.75,
                                marginTop: -35,
                                justifyContent: 'center'
                            }}>
                                {!isOTPValidated && (
                                    <View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ color: '#D00D0E', fontWeight: 'bold', fontSize: 20, }}>Verification</Text>

                                            <Text style={{ color: 'red', fontSize: 12, }}>{error || otpValidationError ? 'Invalid OTP' : ''} </Text>

                                            <Text style={{ fontSize: 12, color: 'grey', }}>{'\n'} Enter 6 digit OTP that was sent to {mobile} </Text>
                                            {OTPResent && !isLoading && (
                                                <Text style={{ fontSize: 12, color: 'green', }}>{'\n'}
                                                    New OTP sent successfully </Text>)}

                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            {this.renderInputs()}
                                        </View>

                                        <Button color='white'
                                            containerStyle={{ marginTop: 20 }}
                                            buttonStyle={{ borderRadius: 20, marginTop: 20, backgroundColor: '#2DB38D' }}
                                            title='Continue'
                                            titleStyle={{ fontWeight: 'bold' }}
                                            onPress={this.handleSubmit} />
                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', alignItems: 'center' }}>


                                            <TouchableOpacity onPress={() => { this.state.isResetPassword ? this.props.navigation.navigate('ForgetPassword') : this.props.navigation.navigate('Register') }}>
                                                <Text style={{ color: '#2DB38D' }}>Edit Number</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.hanleResendOTP}>
                                                <Text style={{ color: '#2DB38D' }}>Resend OTP?</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}

                                {isOTPValidated && (
                                    <View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ color: '#D00D0E', fontWeight: 'bold', fontSize: 20, }}>Set Password</Text>
                                            <Text style={{ fontSize: 12, color: 'grey', }}>{'\n'} Password should be atleast six characters long</Text>
                                            <Text style={{ fontSize: 12, color: 'grey', }}>one uppercase & alphanumeric characters  </Text>
                                            <Text style={{ color: 'red', fontSize: 12, }}>{passwordError ? passwordError : ''} </Text>

                                        </View>
                                        <TextInput style={{ height: 40, borderColor: '#2DB38D', borderWidth: 1, marginTop: 5, borderRadius: 3, paddingLeft: 2 }}
                                            placeholder='Enter Password'
                                            value={password}
                                            placeholderTextColor='grey'
                                            secureTextEntry={true}
                                            onChangeText={text => this.handlePasswordChange(text)} />
                                        <TextInput style={{ height: 40, borderColor: '#2DB38D', borderWidth: 1, marginTop: 5, borderRadius: 3, paddingLeft: 2 }}
                                            placeholder='Re-Enter Password'
                                            placeholderTextColor='grey'
                                            value={passwordCheck}
                                            secureTextEntry={true}
                                            onChangeText={text => this.handleRePasswordChange(text)}
                                        />
                                        <Button color='white'
                                            containerStyle={{ marginTop: 20 }}
                                            buttonStyle={{ borderRadius: 20, marginTop: 20, backgroundColor: '#2DB38D' }}
                                            title='Continue'
                                            titleStyle={{ fontWeight: 'bold' }}
                                            onPress={this.handleUserRegistration} />

                                    </View>
                                )}
                            </Card>
                        </View>

                    </View >
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
