import React from 'react';
import { View, Text, Platform, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import moment from 'moment';
import style from './style';
export default class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            mobileErrorMessage: '',
            email: '',
            emailError: '',
            feedback: '',
            feedbackError: ''
        }
    }
    componentDidMount() {

    }
    handlemobileChange = (mobile) => {
        if (/^[\d.]+$/.test(mobile) || mobile === '') {
            this.setState({
                mobile,
                mobileErrorMessage: ''
            })
        }

    }
    handleEmailChange = (email) => {
        this.setState({
            email,
            emailError: ''
        })
    }
    handleFeedbackChange = (feedback) => {
        this.setState({
            feedback,
            feedbackError: ''
        })
    }
    validateData = () => {
        let { feedback } = this.state;
        let isValid = true;
        if (feedback.trim().length == 0) {
            isValid = false
            this.setState({
                feedbackError: 'Please enter your feedback'
            })
        }
        return isValid;
    }


    handleSubmit() {
        // console.log(data);
        if (this.validateData()) {
            let { feedback } = this.state;
            this.props.postFeedback({ feedback })
            this.props.navigation.goBack();
            // showMessage({
            //     message: "Your feedback sent sucessfully",
            //     type: "success",
            // });
        }

    }

    render() {
        let { mobile, mobileErrorMessage, email, emailError, feedback, feedbackError } = this.state;
        return (

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            //   style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
            >
                <View
                    style={style.conatiner}>
                    {/* <Input
                        containerStyle={{ height: 60, marginTop: 10 }}
                        placeholder=' Mobile Number '
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
                    <Input
                        containerStyle={{ height: 60, marginTop: 10 }}
                        placeholder=' Your email '
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        inputStyle={{ color: 'black' }}
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='black'
                                type='material-community'
                            />
                        }
                        leftIconContainerStyle={{ marginLeft: -1 }}
                        value={email}
                        onChangeText={text => this.handleEmailChange(text)}
                        errorMessage={emailError}
                        keyboardType='email-address'
                    /> */}
                    <Input
                        containerStyle={{ height: 150, marginTop: 10 }}
                        placeholder=' Share your feedback '
                        inputContainerStyle={{ borderWidth: 0.5 }}
                        inputStyle={{ color: 'black' }}
                        multiline={true}
                        numberOfLines={Platform.OS === 'ios' ? null : 10}
                        minHeight={(Platform.OS === 'ios' ) ? (15 * 10) : null}
                        value={feedback}
                        onChangeText={text => this.handleFeedbackChange(text)}
                        errorMessage={feedbackError}
                    // keyboardType='phone-pad'
                    />


                    <Button
                        onPress={() => this.handleSubmit()}
                        title="Send Feedback"
                        TouchableOpacity={1}
                        buttonStyle={style.buttonStyle}
                    />


                </View >
            </ScrollView>
        )


    }
}
