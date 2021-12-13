import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class ValidateOTP extends React.Component {
    constructor() {
        super()
        this.state = {
            phone: '',
            otp: Array(6).fill(''),
            otpAct: null,
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
     //   console.log(this.props.phone, this.props.otp)
        this.setState({
            phone: this.props.phone,
            otpAct: this.props.otp
        })
    }
    componentDidUpdate(prevProps, prevState) {
        let { mobile } = this.state;
        if (this.props.otp && this.props.otp != prevProps.otp && !prevProps.error && !this.props.error && !this.props.phoneValidationRequested) {
            this.setState({
                phone: this.props.phone,
                otpAct: this.props.otp
            })
            //  this.props.navigation.navigate('BasicInfo', { phone: mobile,otp: this.props.otp})
        }

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

    hanleResendOTP = () => {
        let { phone, isResetPassword } = this.state;
        // forgetPassword:true 
        this.props.resendOTP({ phone })
        //   this.props.generateOTP({ mobile: mobile, forgetPassword: isResetPassword });
       // this.focusOTP();
        this.setState({
            OTPResent: true,
            otp: Array(6).fill(''),
        })
    }
    validateOTPFields = () => {
        let isValidated = true;
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
        let { otp, phone, otpAct } = this.state;
        //  console.log(otp);
       // let otpCombined = otp.join('');
        if (otp === otpAct) {
            this.props.navigation.navigate('BasicInfo', { phone })
        } else {
            this.setState({
                otpValidationError: true
            })
        }
    }
    focusNext = (index, text) => {
        const otp = this.state.otp;
        otp[index] = text.charAt(text.length - 1);
        this.setState({ otp });
        if (index < this.otpTextInput.length - 1 && text) {
            this.otpTextInput[index + 1].focus();
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
    renderInputs = () => {
        const inputs = Array(6).fill(0);
        let { otp } = this.state;
        return inputs.map((i, j) => {
            return (
                <View style={{ flex: 1 / 6 }} key={j}>
                    <Input

                        //  inputContainerStyle={{ borderBottomWidth: 0.5, }}
                        inputStyle={{ color: 'black', textAlign: 'center' }}
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
        let { phoneValidationRequested } = this.props;
        let { otpValidationError, password, passwordCheck, passwordError, OTPResent } = this.state;
        let { mobile, otpAct } = this.state;
        console.log(otpAct)
        return (
            <SafeAreaView style={{

            }}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        height: Dimensions.get('window').height,
                        alignItems: 'center'
                    }}>
                        {this.renderLogo()}
                        <Spinner color='grey'
                            visible={phoneValidationRequested}
                        />
                        <View style={{
                            backgroundColor: 'white',
                            width: Dimensions.get('window').width * 0.85,
                            // alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 26, marginBottom: 10 }}>Sign Up</Text>
                            <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter Six Digit OTP '
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    maxLength={6}
                                    leftIcon={
                                        <Icon
                                            name='message-outline'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={mobile}
                                    onChangeText={text => this.handleOTPChange(text)}
                                 //   errorMessage={mobileErrorMessage}
                                   keyboardType='number-pad'
                                />
                            {/* {otpValidationError && (
                                <Text style={{ color: 'red' }}>Invalid OTP</Text>

                            )} */}

                        </View>


                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            {this.renderInputs()}

                        </View> */}
                        <Button color='black'
                            containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                            buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'black' }}
                            title='Next'
                            titleStyle={{ fontWeight: 'bold', color: 'white' }}
                            onPress={this.handleSubmit} />
                        <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.hanleResendOTP() }} style={{flexDirection:'row'}}>
                                <Text style={{ color: 'grey', fontSize: 16 }}>Didn't Get the OTP?</Text>
                                <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}> Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
