import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class UpdatePassword extends React.Component {

    constructor() {
        super()
        this.state = {
            password: '',
            passwordCheck: '',
            passwordError: '',
            isError: false,
            mobileErrorMessage: '',
            showPassword: false

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.error && !this.props.error && !this.props.isLoading && prevProps.isLoading) {
            this.props.navigation.goBack()
        }
    }
    toggleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handlePasswordChange = (password) => {
        this.setState({
            password,

        })
    }

    handleRePasswordChange = (passwordCheck) => {
        this.setState({
            passwordCheck
        })
    }
    handleSubmit = () => {
        //     alert('login submit');
        const { password, passwordCheck } = this.state;
        if (password == '' || passwordCheck == '') {
            this.setState({
                passwordError: 'Password is not valid'
            })
        }
        else if (password == passwordCheck) {
            this.props.updateUserInfo({ password, isPasswordUpdate: true })
            //go ahead
        } else {
            this.setState({
                passwordError: 'Password is not matching'
            })


        }
    }
    render() {
        let { isLoading } = this.props;

        let { password, passwordError, passwordCheck } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"handled"}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'white',

                            // width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            //justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Spinner color='grey'
                                visible={isLoading}
                            />
                            <View style={{
                                backgroundColor: 'white',
                                width: Dimensions.get('window').width * 0.85,
                                // alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <View style={{ alignItems: 'center', }}>
                                    {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>SIGN UP </Text> */}
                                    <Text style={{ color: 'red', fontSize: 14, }}>{passwordError} </Text>

                                </View>

                                <Input
                                    containerStyle={{ height: 60, marginTop: 20 }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5, }}
                                    inputStyle={{ color: 'black' }}
                                    placeholder='Enter new password'
                                    value={password} onChangeText={text => this.handlePasswordChange(text)}

                                    secureTextEntry={!this.state.showPassword}
                                    leftIcon={
                                        <Icon
                                            name='account-key'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    rightIcon={
                                        <Icon
                                            name={this.state.showPassword ? 'eye' : 'eye-off'}
                                            size={20}
                                            color={this.state.showPassword ? 'black' : 'grey'}
                                            type='material-community'
                                            onPress={this.toggleShowPassword}
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 20 }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5, }}
                                    inputStyle={{ color: 'black' }}
                                    placeholder='Re-enter new password'
                                    value={passwordCheck}
                                    onChangeText={text => this.handleRePasswordChange(text)}

                                    secureTextEntry={true}
                                    leftIcon={
                                        <Icon
                                            name='account-key'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }

                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                />


                                <Button
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'black' }}
                                    title='Update Password'
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
