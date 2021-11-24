import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class ValidatePhone extends React.Component {

    constructor() {
        super()
        this.state = {
            mobile: '',
            checked: true,
            isError: false,
            mobileErrorMessage: '',
            showPassword: false,
            isValidationRequested: false

        }
    }
    componentDidMount() {
        console.log('coming here');
    }
    componentDidUpdate(prevProps, prevState) {
        let { mobile } = this.state;
        if (this.state.isValidationRequested && this.props.otp && !prevProps.authError && !this.props.authError && !this.props.isLoading) {
            this.props.navigation.navigate('Login-ValidateOTP')
            //  this.props.navigation.navigate('BasicInfo', { phone: mobile,otp: this.props.otp})
        }

    }

    handlemobileChange = (mobile) => {
        if (/^[\d.]+$/.test(mobile) || mobile === '') {
            this.setState({
                mobile,
                mobileErrorMessage: '',
                isValidationRequested: false
            })
        }
        //   this.props.authUser({ mobile:'PUNEBA', password:'123456' });
    }
    handleSubmit = () => {
        //     alert('login submit');
        const { mobile } = this.state;
        if (mobile == '' || mobile.length != 10) {
            this.setState({
                mobileErrorMessage: 'Please enter valid mobile number'
            })
        } else {
            this.setState({
                isValidationRequested: true
            })

            this.props.validatePhone({ phone: mobile })
            //   this.props.navigation.navigate('personal-info', { mobile })
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
        let { isLoading, error, otp } = this.props;
        let { mobile, mobileErrorMessage } = this.state;
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
                            {this.renderLogo()}
                            <View style={{
                                backgroundColor: 'white',
                                width: Dimensions.get('window').width * 0.85,
                                // alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <Text style={{fontSize:26,marginBottom:10}}>Sign In</Text>

                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter Mobile Number '
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='cellphone-android'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={mobile}
                                    onChangeText={text => this.handlemobileChange(text)}
                                    errorMessage={mobileErrorMessage}
                                    keyboardType='phone-pad'
                                />


                                <Button color='black'
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
