import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import * as NavigationService from '../../Navigation/navigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class OtherInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            currentLocation: '',
            homeLocation: '',
            languages: '',
            aboutMe: '',

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.error && !this.props.error && !this.props.isLoading && prevProps.isLoading) {
            NavigationService.navigate('App');
        }
    }
    handleCurrentLocationChange = (currentLocation) => {
        this.setState({
            currentLocation,

        })
    }
    handlelHomeLocationChange = (homeLocation) => {
        this.setState({
            homeLocation,

        })
    }
    handleLanguagesChange = (languages) => {
        this.setState({
            languages,

        })
    }
    handleAboutMeChange = (aboutMe) => {
        this.setState({
            aboutMe,

        })
    }

    handleSubmit = () => {
        this.props.updateUserInformation(this.state);
    }
    handleSkip = () => {
        NavigationService.navigate('App');
        //this.props.navigation.navigate('App');
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
        let { isLoading } = this.props;
        let { currentLocation, homeLocation, languages, aboutMe } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"always"}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'white',

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
                                backgroundColor: 'white',
                                width: Dimensions.get('window').width * 0.85,
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}>Other Information </Text>
                                    {/* <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text> */}

                                </View>
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter current location'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='location-arrow'
                                            size={24}
                                            color='black'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={currentLocation}
                                    onChangeText={text => this.handleCurrentLocationChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter Home location'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='location-arrow'
                                            size={24}
                                            color='black'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={homeLocation}
                                    onChangeText={text => this.handlelHomeLocationChange(text)}
                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter languages you speak'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='language'
                                            size={24}
                                            color='black'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={languages}
                                    onChangeText={text => this.handleLanguagesChange(text)}


                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Tell about yourself'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='user'
                                            size={24}
                                            color='black'
                                            type='font-awesome'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={aboutMe}
                                    onChangeText={text => this.handleAboutMeChange(text)}
                                />
                                <Button color='white'
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'black' }}
                                    title='Next'
                                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                    onPress={this.handleSubmit} />

                                <Button color='white'
                                    containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.50, }}
                                    buttonStyle={{ borderRadius: 20, marginTop: 10, backgroundColor: 'white' }}
                                    title='Skip'
                                    titleStyle={{ fontWeight: 'bold', color: 'black' }}
                                    onPress={this.handleSkip} />

                            </View>

                        </View >
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
