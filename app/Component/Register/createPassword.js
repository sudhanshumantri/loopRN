import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class CreatePassword extends React.Component {

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
        if (!prevProps.error && !this.props.error && !this.props.isUserRegistrationRequested && prevProps.isUserRegistrationRequested) {
            this.props.navigation.navigate('PersonalInfo')
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
        if (password == passwordCheck) {
            let { user } = this.props.route.params;
            user.password = password
            this.props.registerUser(user);
            //go ahead
        } else {
            this.setState({
                passwordError: 'Password is not matching'
            })
        }
    }

    renderLogo = () => {
        return (
            <View>

                <Image
                    style={{ width: 200, height: 200, }}
                    source={require('../../../assets/loopLogoWhite.png')}
                />
            </View>
        );
    }

    render() {
        let { isUserRegistrationRequested } = this.props;
        console.log(isUserRegistrationRequested)
        let { password, passwordError, passwordCheck } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: '#404040', flex: 1 }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"always"}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: '#404040',

                            // width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            //justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            {this.renderLogo()}
                            <Spinner color='grey'
                                visible={isUserRegistrationRequested}
                            />
                            <View style={{
                                backgroundColor: '#404040',
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
                                    inputStyle={{ color: 'white' }}
                                    placeholder='Enter Password'
                                    value={password} onChangeText={text => this.handlePasswordChange(text)}

                                    secureTextEntry={!this.state.showPassword}
                                    leftIcon={
                                        <Icon
                                            name='account-key'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }
                                    rightIcon={
                                        <Icon
                                            name={this.state.showPassword ? 'eye' : 'eye-off'}
                                            size={20}
                                            color={this.state.showPassword ? '#2DB38D' : 'grey'}
                                            type='material-community'
                                            onPress={this.toggleShowPassword}
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 20 }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5, }}
                                    inputStyle={{ color: 'white' }}
                                    placeholder='Re Enter Password'
                                    value={passwordCheck}
                                    onChangeText={text => this.handleRePasswordChange(text)}

                                    secureTextEntry={true}
                                    leftIcon={
                                        <Icon
                                            name='account-key'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }

                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                />


                                <Button color='white'
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'white' }}
                                    title='Next'
                                    titleStyle={{ fontWeight: 'bold', color: '#404040' }}
                                    onPress={this.handleSubmit} />

                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
