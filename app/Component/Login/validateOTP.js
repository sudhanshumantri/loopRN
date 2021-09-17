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
        //   console.log(this.props)
        this.focusOTP();
        this.setState({
            phone: this.props.phone,
            otpAct: this.props.otp
        })
    }
    componentDidUpdate(prevProps, prevState) {
        let { mobile } = this.state;
        if (this.props.otp && this.props.otp != prevProps.otp && !prevProps.authError && !this.props.authError && !this.props.isLoading) {
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
        this.props.resendOTP({ phone });
        this.focusOTP();
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
        let otpCombined = otp.join('');
        if (otpCombined === otpAct) {
            this.props.authUser({ phone, isOTPLogin: true })
        } else {
            this.setState({
                otpValidationError: true
            })
        }

        // this.props.validateOTP({
        //     mobile,
        //     otp: otp.join('')
        // })
        // this.setState({ OTPResent: false })

    }
    focusNext = (index, text) => {

        const otp = this.state.otp;
        // if (/^[\d]+$/.test(text)) {
        otp[index] = text.charAt(text.length - 1);
        this.setState({ otp });

        if (index < this.otpTextInput.length - 1 && text) {
            this.otpTextInput[index + 1].focus();
        }
        // if (index === this.otpTextInput.length - 1) {
        //     this.otpTextInput[0].focus();
        // }
        //  }
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
        let { isLoading, error, generatedOTP, isValidationRequested, isOTPValidated, isUserRegistrationRequested } = this.props;
        let { otpValidationError, mobile, otpAct } = this.state;
      //  console.log(otpAct);
        return (
            <SafeAreaView style={{

            }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        // width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        // justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.renderLogo()}
                        <Text style={{ color: 'black' }}>OTP has been sent </Text>
                        {otpValidationError && (
                            <Text style={{ color: 'red' }}>Invalid OTP</Text>

                        )}
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            {this.renderInputs()}
                        </View>
                        <Button color='black'
                            containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                            buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'black' }}
                            title='Next'
                            titleStyle={{ fontWeight: 'bold', color: 'white' }}
                            onPress={this.handleSubmit} />
                        <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.hanleResendOTP() }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
