import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            mobileNumber: '',
            isError: false,
            mobileNumberErrorMessage: null,


        }
    }
    validateMobileNumber = (mobile) => {
        const reg = /^[0]?[789]\d{9}$/;
        if (reg.test(mobile) === false) {
            this.setState({
                mobileNumberErrorMessage: 'Invalid Mobile Number',
                mobileNumber: mobile,
            });
            return false;
        } else {
            this.setState({
                mobileNumberErrorMessage: null,
                mobileNumber: mobile,

            });
            return true;
        }
    }
    handleMobileNumberChange = (mobileNumber) => {
        //   alert(userId);
        const mobileValidateReg = /^[0]?[789]\d{9}$/;
        if (/^[\d.]+$/.test(mobileNumber) || mobileNumber === '') {
            this.setState({
                mobileNumber,
                mobileNumberErrorMessage: null
            })
        }

        //   this.props.authUser({ userId:'PUNEBA', password:'123456' });
    }
    componentWillReceiveProps(nextProps) {

        let { mobileNumberErrorMessage } = this.state;
        if (nextProps.error != mobileNumberErrorMessage) {
            this.setState({
                mobileNumberErrorMessage: nextProps.error
            })
        }
        // this.setState(nextProps);
    }


    handleSubmit = () => {
        //     alert('login submit');
        const { mobileNumber, mobileNumberErrorMessage } = this.state;
        if (this.validateMobileNumber(mobileNumber)) {
            this.props.generateOTP({ mobile: mobileNumber });
        }
    }

    render() {
        let { isLoading, error, } = this.props;

        let { mobileNumber, mobileNumberErrorMessage, } = this.state;

        return (
            <SafeAreaView
                style={{
                    backgroundColor: '#2DB38D',
                }}>
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
                                    height: Dimensions.get('window').height * 0.45,
                                    width: Dimensions.get('window').width * 0.75,
                                    marginTop: -35,
                                    justifyContent: 'center'
                                }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                        <Text style={{ color: '#2DB38D', fontWeight: 'bold', fontSize: 20, }}>Registration </Text>

                                        <Text style={{ fontSize: 12, color: 'grey', }}>{'\n'} Enter you mobile number, </Text>
                                        <Text style={{ fontSize: 12, color: 'grey', }}>we'll send you an OTP to verify. </Text>
                                    </View>

                                    <Input
                                        containerStyle={{ height: 60, marginTop: 10 }}
                                        inputContainerStyle={{ borderBottomWidth: 1 }}
                                        placeholder=' Mobile Number '
                                        leftIcon={
                                            <Icon
                                                name='cellphone-android'
                                                size={24}
                                                color='#2DB38D'
                                                type='material-community'
                                            />
                                        }
                                        leftIconContainerStyle={{ marginLeft: -1 }}
                                        value={mobileNumber}
                                        onChangeText={text => this.handleMobileNumberChange(text)}
                                        errorMessage={mobileNumberErrorMessage}
                                        keyboardType='phone-pad'
                                    />
                                    <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ color: '#202748', fontSize: 16, lineHeight: 25 }}>Already have an Account?</Text>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                                            <Text style={{ color: '#2DB38D', fontWeight: 'bold', fontSize: 16, lineHeight: 25, textDecorationLine: 'underline' }}> Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Button color='white'
                                        containerStyle={{ marginTop: 0 }}
                                        buttonStyle={{ borderRadius: 20, marginTop: 20, backgroundColor: '#2DB38D' }}
                                        title='Continue'
                                        titleStyle={{ fontWeight: 'bold' }}
                                        onPress={this.handleSubmit} />

                                    <Text style={{ color: 'grey', fontSize: 12, marginTop: 10, }}>Your number is safe, we do not share contact number to any third parties</Text>
                                </Card>
                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
