import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class PersonalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            instaLink: '',
            fbLink: '',
            relationshipStatus: 'single',
            hobbies: ''

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.error && !this.props.error && !this.props.isLoading && prevProps.isLoading) {
            //navigate to professional information
            this.props.navigation.navigate('ProfessionalInfo')
            //this.props.navigation.navigate('BasicInfo', { phone: mobile })
        }
    }
    handleFBLinkChange = (fbLink) => {
        this.setState({
            fbLink,

        })
    }
    handleInstaIDChange = (instaLink) => {
        this.setState({
            instaLink,

        })
    }
    handleRelationshipStatusChange = (relationshipStatus) => {
        this.setState({
            relationshipStatus

        })
    }
    handleHobbiesChange = (hobbies) => {
        this.setState({
            hobbies

        })
    }
    handleSubmit = () => {
        this.props.updateUserInformation(this.state);
    }
    handleSkip = () => {
        this.props.navigation.navigate('ProfessionalInfo')
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
        let { instaLink, fbLink, linkedinLink, relationshipStatus, hobbies } = this.state;
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
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>Personal Information </Text>
                                    {/* <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text> */}

                                </View>
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter instagram username'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='instagram'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={instaLink}
                                    onChangeText={text => this.handleInstaIDChange(text)}


                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter facebook profile link'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'white' }}
                                    leftIcon={
                                        <Icon
                                            name='facebook'
                                            size={24}
                                            color='white'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={fbLink}
                                    onChangeText={text => this.handleFBLinkChange(text)}


                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter your hobbies/ personal interest'
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
                                    value={hobbies}
                                    onChangeText={text => this.handleHobbiesChange(text)}


                                />
                                <View style={{
                                    flexDirection: 'row',
                                    //  justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    alignItems: 'center'
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                        <CheckBox
                                            title='Single'
                                            checked={relationshipStatus == 'single' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'white' }}
                                            containerStyle={{ backgroundColor: '#404040', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleRelationshipStatusChange('single')}
                                            checkedColor='white'
                                        />
                                        <CheckBox
                                            title='Married'
                                            checked={relationshipStatus === 'married' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'white' }}
                                            containerStyle={{ backgroundColor: '#404040', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleRelationshipStatusChange('married')}
                                            checkedColor='white'
                                        />
                                        <CheckBox
                                            title='Other'
                                            checked={relationshipStatus === 'other' ? true : false}
                                            textStyle={{ marginLeft: -1, color: 'white' }}
                                            containerStyle={{ backgroundColor: '#404040', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleRelationshipStatusChange('other')}
                                            checkedColor='white'
                                        />

                                    </View>


                                </View>
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
