import React from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class PersonalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            instaLink: '',
            fbLink: '',
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
                    source={require('../../../assets/loopLogoBlack.png')}
                />
            </View>
        );
    }

    render() {
        let { isLoading } = this.props;
        let { instaLink, fbLink, linkedinLink, relationshipStatus, hobbies } = this.state;
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
                                    width: Dimensions.get('window').width * 0.80,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 0.5
                                    
                                }}>

                                    {/* <Text style={{ marginTop: 30, }}> Relation</Text> */}
                                    
                                    <Picker
                                        selectedValue={relationshipStatus}
                                        itemStyle={{ color: 'black' }}
                                        style={{ height: 60, borderBottomWidth: 1, border: 1, borderBottomColor: 'black', color: 'black' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.handleRelationshipStatusChange(itemValue)
                                        }>
                                        <Picker.Item label="Single" value="Single" />
                                        <Picker.Item label="Committed" value="Committed" />
                                        <Picker.Item label="Complicated" value="Complicated" />
                                        <Picker.Item label="Open Relationship" value="Open Relationship" />
                                        <Picker.Item label="Not Interested" value="Not Interested" />
                                        <Picker.Item label="Married" value="Married" />
                                        <Picker.Item label="Other" value="Other" />
                                    </Picker>
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
