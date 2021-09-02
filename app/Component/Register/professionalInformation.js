import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class ProfessionalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            linkedinLink: '',
            professionalEmail: '',
            currentOrganization: '',
            previousOrganization: '',
            professionalInterests: '',
            skills: ''

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.error && !this.props.error && !this.props.isLoading && prevProps.isLoading) {
            this.props.navigation.navigate('OtherInfo')
        }
    }
    handleLinkedinChange = (linkedinLink) => {
        this.setState({
            linkedinLink,

        })
    }
    handlelProfessionalEmailChange = (professionalEmail) => {
        this.setState({
            professionalEmail,

        })
    }
    handleCurrentOrganizationChange = (currentOrganization) => {
        this.setState({
            currentOrganization,

        })
    }
    handlePreviousOrganizationChange = (previousOrganization) => {
        this.setState({
            previousOrganization,

        })
    }
    handleProfessionalInterestsChange = (professionalInterests) => {
        this.setState({
            professionalInterests,

        })
    }
    handleSkillsChange = (skills) => {
        this.setState({
            skills,

        })
    }

    handleSubmit = () => {
        this.props.updateUserInformation(this.state);
        // if (this.validatePersonalInfo()) {
        //     let { phone, name, email, dob, gender } = this.state;
        //     let user = {
        //         phone, name, email, dob, gender
        //     }
        //     this.props.navigation.navigate('SetPassword', { user })
        // }

    }
    handleSkip = () => {
        this.props.navigation.navigate('OtherInfo')
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
        let { isLoading } = this.props;
        let { linkedinLink, currentOrganization, previousOrganization, professionalEmail, professionalInterests, skills } = this.state;
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
                            // height: Dimensions.get('window').height,
                            //justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            {this.renderLogo()}
                            <Spinner color='grey'
                                visible={isLoading}
                            />
                            <View style={{
                                backgroundColor: '#404040',
                                width: Dimensions.get('window').width * 0.85,
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>Professional Information </Text>
                                    {/* <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text> */}

                                </View>
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter linkedin profile link'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='linkedin'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={linkedinLink}
                                    onChangeText={text => this.handleLinkedinChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter professional email'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='email'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={professionalEmail}
                                    onChangeText={text => this.handlelProfessionalEmailChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter current college/company'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='graduation-cap'
                                            size={24}
                                            color='white'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={currentOrganization}
                                    onChangeText={text => this.handleCurrentOrganizationChange(text)}


                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter previous college/company'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='graduation-cap'
                                            size={24}
                                            color='white'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={previousOrganization}
                                    onChangeText={text => this.handlePreviousOrganizationChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter professional interests'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='activity'
                                            size={24}
                                            color='white'
                                            type='feather'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={professionalInterests}
                                    onChangeText={text => this.handleProfessionalInterestsChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter skills'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='activity'
                                            size={24}
                                            color='white'
                                            type='feather'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={skills}
                                    onChangeText={text => this.handleSkillsChange(text)}
                                />

                                <Button color='white'
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'white' }}
                                    title='Next'
                                    titleStyle={{ fontWeight: 'bold', color: '#404040' }}
                                    onPress={this.handleSubmit} />

                                <Button color='white'
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.50, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: '#404040' }}
                                    title='Skip'
                                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                    onPress={this.handleSkip} />

                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
