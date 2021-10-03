import React from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalSelector from 'react-native-modal-selector'
let index = 0;
const relationshipStatusArray = [
    { key: index++,section: true, label: 'Relationship Status' },
    { key: index++, label: 'Single' },
    { key: index++, label: 'Committed' },
    { key: index++, label: 'Complicated' },
    { key: index++, label: 'Open Relationship', },
    { key: index++, label: 'Not Interested', },
    { key: index++, label: 'Married', },
    { key: index++, label: 'Other', },
];
export default class PersonalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            instaLink: '',
            instaLinkError: '',
            fbLink: '',
            fbLinkError: '',
            relationshipStatus: 'Single',
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
            fbLinkError: ''

        })
    }
    handleInstaIDChange = (instaLink) => {
        this.setState({
            instaLink,
            instaLinkError: ''

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
    validateInfo = () => {
        let {
            instaLink,
            fbLink
        } = this.state;
        let isValidated = true;
        if (fbLink && fbLink.trim().length > 0) {
            if (!/(ftp|http|https):\/\/?(?:www\.)?facebook.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(fbLink)) {
                isValidated = false;
                this.setState({
                    fbLinkError: 'Facebook profile is not valid'
                })
                return isValidated;
            }
        }
        if (instaLink && instaLink.trim().length > 0) {
            var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

            if (urlregex.test(instaLink)) {
                isValidated = false;
                this.setState({
                    instaLinkError: 'Instgram username is not valid'
                })
                return isValidated;
            }
        }
        return isValidated;
    }
    handleSubmit = () => {

        if (this.validateInfo()) {
            this.props.updateUserInformation(this.state);
        }
    }
    handleSkip = () => {
        this.props.navigation.navigate('ProfessionalInfo')
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
        let { instaLink, fbLink, fbLinkError, instaLinkError, relationshipStatus, hobbies } = this.state;
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
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}>Personal Information </Text>
                                    {/* <Text style={{ color: 'red', fontSize: 14, }}>{authError} </Text> */}

                                </View>
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter instagram username'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='instagram'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={instaLink}
                                    onChangeText={text => this.handleInstaIDChange(text)}
                                    errorMessage={instaLinkError}


                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter facebook profile link'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='facebook'
                                            size={24}
                                            color='black'
                                            type='material-community'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={fbLink}
                                    onChangeText={text => this.handleFBLinkChange(text)}
                                    errorMessage={fbLinkError}

                                />
                                <Input
                                    containerStyle={{ height: 60, marginTop: 10 }}
                                    placeholder=' Enter your hobbies/ personal interest'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    inputStyle={{ color: 'black' }}
                                    leftIcon={
                                        <Icon
                                            name='activity'
                                            size={24}
                                            color='black'
                                            type='feather'
                                        />
                                    }
                                    leftIconContainerStyle={{ marginLeft: -1 }}
                                    value={hobbies}
                                    onChangeText={text => this.handleHobbiesChange(text)}


                                />
                                <View style={{
                                // width: Dimensions.get('window').width * 0.80,
                                    // paddingLeft: 5,
                                    // paddingRight: 5,
                                    // borderBottomColor: 'black',
                                    // borderBottomWidth: 0.5

                                }}>

                                    {/* <Text style={{ marginTop: 30, }}> Relation</Text> */}

                                    <ModalSelector
                                        data={relationshipStatusArray}
                                        style={{  width: Dimensions.get('window').width * 0.85,}}
                                        initValue="Select relationship status"
                                        //   supportedOrientations={['landscape']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={''}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        onChange={(option) => { this.handleRelationshipStatusChange(option.label) }}>
                                        <Input
                                            containerStyle={{ height: 60, marginTop: 10 }}
                                            placeholder=' Select relationship status '
                                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                            inputStyle={{ color: 'black' }}
                                            editable={false}
                                            leftIcon={
                                                <Icon
                                                    name='clover'
                                                    size={24}
                                                    color='black'
                                                    type='material-community'
                                                />
                                            }
                                            leftIconContainerStyle={{ marginLeft: -1 }}
                                            value={relationshipStatus}
                                            onChangeText={text => this.handleHobbiesChange(text)}


                                        />

                                    </ModalSelector>
                                </View>
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
