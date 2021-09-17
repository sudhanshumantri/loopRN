import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Linking, PermissionsAndroid, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import style from './style';
import Contacts from 'react-native-contacts';
export default class ContactsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            name: undefined,
            dob: undefined,
            profilePicture: '',
            email: undefined,
            fbLink: undefined,
            phone: undefined,
            instaLink: undefined,
            linkedinLink: undefined,
            phone: undefined,
            gender: undefined,
            isDateTimePickerVisible: false

        }
    }
    componentDidMount() {
        this.setState(
            this.props.route.params.user
        )
    }
    openContactPicker = async () => {
        let { profilePicture, name, email, phone } = this.state;
        var newPerson = {
            emailAddresses: [{
                label: "personal",
                email: email,
            },
            ], phoneNumbers: [{
                label: "mobile",
                number: String(phone),
            }],
            displayName: name
        }
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "Loop App Contacts Permission",
                    message:
                        "Loop App needs access to your contacts ",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Contacts.openContactForm(newPerson).then(contact => {
                    this.props.navigation.navigate('Home');
                    showMessage({
                        message: "Contact saved successfully",
                        type: "success",
                    });
                }).catch(error => {
                    console.log(error)
                })
            } else {
                console.log("contacts permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    handLinking = (url, extraurl) => {
        if (extraurl) {
            if (extraurl == 'no-url-provided') {

            } else {
                url = url + extraurl;
                Linking.openURL(url);
            }
        }
        else if (url && url.trim().length > 0) {
            Linking.openURL(url)
        }
    }

    renderProfileImage = () => {
        let { profilePicture, name } = this.state;
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                <Avatar
                    containerStyle={{ marginTop: -10 }}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                    source={{
                        uri:
                            profilePicture ? profilePicture : 'no-img',
                    }}
                    overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                    showEditButton
                    //  onEditPress={this.handleImageChange}
                    // onPress={this.handleImageChange}
                    size={100}
                // onEditPress={this.showEditProfileModal}
                />
                <Text style={{ color: 'black', fontSize: 22, fontWeight: "bold" }}>{name}</Text>
            </View>
        )

    }
    renderBasicInfo = () => {
        let { name, phone, email, dob, gender } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Name</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={name}
                    />
                </View>
                <Text style={style.labelStyle}>Phone</Text>
                <TouchableOpacity onPress={() => { Linking.openURL('tel:' + String(phone)) }}>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={String(phone)}
                    />
                </TouchableOpacity>
                <Text style={style.labelStyle}>Email</Text>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:' + email)}>
                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={email}
                    />
                </TouchableOpacity>
                <Text style={style.labelStyle}>Birthday</Text>
                <View>
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <TextInput
                            style={style.inputStyle}
                            onPress={this.showDateTimePicker}
                            editable={false}
                            value={dob}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={style.labelStyle}>Gender</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: -10
                }}>
                    <CheckBox
                        title='Male'
                        disabled={true}
                        checked={gender == 'male' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        //  onPress={() => this.handleProfileChange('gender', 'male')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Female'
                        disabled={true}
                        checked={gender == 'female' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        //  onPress={() => this.handleProfileChange('gender', 'female')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Other'
                        disabled={true}
                        checked={gender == 'other' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        //   onPress={() => this.handleProfileChange('gender', 'other')}
                        checkedColor='black'
                    />
                </View>
            </View>)
    }
    renderPersonalInfo = () => {
        let { userInfo, } = this.props;
        let { instaLink, fbLink, linkedinLink, relationshipStatus, hobbies } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Intagram username</Text>
                <TouchableOpacity onPress={() => this.handLinking('https://www.instagram.com/', instaLink ? instaLink : 'no-url-provided')}>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={instaLink}

                    />
                </TouchableOpacity>
                <Text style={style.labelStyle}>Facebook profile link</Text>
                <TouchableOpacity onPress={() => this.handLinking(fbLink)}>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={fbLink}
                    />
                </TouchableOpacity>
                <Text style={style.labelStyle}>Hobbies/ Personal interest</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={hobbies}
                    />


                </View>
                <Text style={style.labelStyle}>Relationship Status</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={relationshipStatus}
                    />
                </View>

            </View>)
    }
    renderProfessionalInfo = () => {
        let { userInfo, } = this.props;
        let { linkedinLink, currentOrganization, previousOrganization, professionalEmail, professionalInterests, skills } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Linkedin profile link</Text>
                <TouchableOpacity onPress={() => this.handLinking(linkedinLink)}>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={linkedinLink}

                    />
                </TouchableOpacity>
                <Text style={style.labelStyle}>Professional email</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={professionalEmail}

                    />


                </View>
                <Text style={style.labelStyle}>Current college/company</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={currentOrganization}
                        onChangeText={(text) => this.handleCurrentOrganizationChange(text)}

                    />


                </View>
                <Text style={style.labelStyle}>Previous college/company</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={previousOrganization}

                    />
                </View>
                <Text style={style.labelStyle}>Professional interests</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={professionalInterests}


                    />
                </View>
                <Text style={style.labelStyle}>Skills</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={skills}


                    />
                </View>



            </View>)
    }
    renderOtherInfo = () => {
        let { currentLocation, homeLocation, languages, aboutMe } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Current location</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={currentLocation}

                    />
                </View>
                <Text style={style.labelStyle}>Home location</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={homeLocation}


                    />


                </View>
                <Text style={style.labelStyle}>Languages you speak</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={languages}


                    />
                </View>
                {/* <Text style={style.labelStyle}>About yourself</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={aboutMe}
                        onChangeText={(text) => this.handleAboutMeChange(text)}

                    />
                </View> */}

            </View>)
    }
    render() {
        let { error, isLoading, userInfo, } = this.props;
        return (
            <View
                style={style.conatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                >
                    {this.renderProfileImage()}
                    {this.renderBasicInfo()}
                    {this.renderPersonalInfo()}
                    {this.renderProfessionalInfo()}
                    {this.renderOtherInfo()}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            onPress={() => this.openContactPicker()}
                            title="Add to Contacts"
                            TouchableOpacity={1}
                            buttonStyle={style.buttonStyle}
                        />
                    </View>
                </ScrollView>
            </View >
        )
    }
}
