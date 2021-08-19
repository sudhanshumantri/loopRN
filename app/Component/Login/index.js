import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            mobile: '',
            password: '',
            checked: true,
            isError: false,
            mobileErrorMessage: '',
            passwordErrorMessage: '',
            showPassword:false

        }
    }
    handlemobileChange = (mobile) => {
        if (/^[\d.]+$/.test(mobile) || mobile === '') {
            this.setState({
                mobile,
                mobileErrorMessage: ''
            })
        }
        //   this.props.authUser({ mobile:'PUNEBA', password:'123456' });
    }
    handlePasswordChange = (password) => {
        this.setState({
            password,
            passwordErrorMessage: ''
        })
    }
    handleRememberMe = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    handleSubmit = () => {
        //     alert('login submit');

        const { mobile, password } = this.state;
        if (mobile == '' || mobile.length != 10) {
            this.setState({
                mobileErrorMessage: 'Please Enter Valid Mobile Number'
            })
        }
        if (password == '') {
            this.setState({
                passwordErrorMessage: 'Password cannot be blank'
            })
        }
        if (mobile != '' && mobile.length == 10 && password != '') {
            //if both are filled,call the auth api,if OK then store in async storage and redirect to home page
            this.props.authUser({ mobile, password })
        }
    }
    toggleShowPassword=()=>{
        this.setState({
            showPassword:!this.state.showPassword
        })
    }

    render() {
        let { isLoading, authError } = this.props;
        let { mobile, password, mobileErrorMessage, passwordErrorMessage } = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: '#2DB38D', flex: 1 }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"always"}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: '#2DB38D',

                            // width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Spinner color='grey'
                                visible={isLoading}
                            />

                            <View style={{
                                backgroundColor: 'white',
                                height: Dimensions.get('window').height * 0.55,
                                width: Dimensions.get('window').width * 0.85,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignItems: "center",
                                borderRadius: 5
                            }}>
                                <Card containerStyle={{
                                    borderRadius: 5,
                                    height: Dimensions.get('window').height * 0.45,
                                    width: Dimensions.get('window').width * 0.75,
                                    marginTop: -35,
                                    justifyContent: 'center'
                                }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={{ color: '#2DB38D', fontWeight: 'bold', fontSize: 20, }}>Login </Text>
                                        <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text>

                                    </View>

                                    <Input
                                        containerStyle={{ height: 60, marginTop: 10 }}
                                        placeholder=' Mobile Number '
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        leftIcon={
                                            <Icon
                                                name='cellphone-android'
                                                size={24}
                                                color='#2DB38D'
                                                type='material-community'
                                            />
                                        }
                                        leftIconContainerStyle={{ marginLeft: -1 }}
                                        value={mobile}
                                        onChangeText={text => this.handlemobileChange(text)}
                                        errorMessage={mobileErrorMessage}
                                        keyboardType='phone-pad'
                                    />

                                    <Input
                                        containerStyle={{ height: 60, marginTop: 20 }}
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        placeholder=' Enter Password'
                                        value={password} onChangeText={text => this.handlePasswordChange(text)}
                                        errorMessage={passwordErrorMessage}
                                        secureTextEntry={!this.state.showPassword}
                                        leftIcon={
                                            <Icon
                                                name='account-key'
                                                size={24}
                                                color='#2DB38D'
                                                type='material-community'
                                            />
                                        }
                                        rightIcon={
                                            <Icon
                                                name={this.state.showPassword?'eye':'eye-off'}
                                                size={20}
                                                color={this.state.showPassword?'#2DB38D':'grey'}
                                                type='material-community'
                                                onPress={this.toggleShowPassword}
                                            />
                                        }
                                        leftIconContainerStyle={{ marginLeft: -1 }}
                                    />

                                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { this.props.navigation.navigate('ForgetPassword') }}>
                                        <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Forgot Password</Text>
                                    </TouchableOpacity>

                                    <Button color='white'
                                        containerStyle={{ marginTop: 10 }}
                                        buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: '#2DB38D' }}
                                        title='SIGN IN'
                                        titleStyle={{ fontWeight: 'bold' }}
                                        onPress={this.handleSubmit} />
                                </Card>
                                <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 50, flexDirection: 'row' }}>
                                    <Text style={{ color: '#202748', fontWeight: 'bold', fontSize: 16, lineHeight: 25 }}>Don't  have an Account?</Text>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                                        <Text style={{ color: '#2DB38D', fontWeight: 'bold', fontSize: 16, lineHeight: 25, textDecorationLine: 'underline' }}> Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
