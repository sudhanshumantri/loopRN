import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import style from './style';
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            name: undefined,
            dob: undefined,
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

        let data = this.props.userInfo ? this.props.userInfo : {};
        data.isDateTimePickerVisible = false;
        data.isImageChanged = false;
        this.setState(data)

    }
    validatePersonalInfo = () => {
        let isValidated = true;
        let { name, email,
            nameError,
            emailError,
        } = this.state;
        if (name == '') {
            isValidated = false;
            showMessage({
                message: "Name can't be empty",
                type: "danger",
            });
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            console.log()
            isValidated = false;
            showMessage({
                message: "Email is not valid",
                type: "danger",
            });
        }
        return isValidated;
    }
    handleSubmit() {
        // console.log(data);
        if (this.validatePersonalInfo()) {
            this.props.updateUserInfo(this.state)
        }

    }
    handleProfileChange = (type, value) => {
        if (type == 'name') {
            this.setState({
                name: value
            })
        } else if (type == 'email') {
            this.setState({
                email: value
            })
        } else if (type == 'phone') {
            this.setState({
                phone: value
            })
        } else if (type == 'fbLink') {
            this.setState({
                fbLink: value
            })
        } else if (type == 'instaLink') {
            this.setState({
                instaLink: value
            })
        } else if (type == 'linkedinLink') {
            this.setState({
                linkedinLink: value
            })
        } else if (type == 'gender') {
            this.setState({
                gender: value
            })
        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {

        let dob = moment(date).format('DD-MM-YYYY');
        this.setState({
            dob,
        })

        this.hideDateTimePicker();
        // this.secondTextInput.focus();
    };

    //personal information change
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
    //professional information
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
    handleImageChange = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true
        }
        launchImageLibrary(options, response => {
            //console.log('launchImageLibrary', response.assets[0].base64)
            if (response.assets[0].uri) {
                //   console.log(response);
                this.setState({
                    isImageChanged: true,
                    //  profImg_image: response.data,
                    profImg_imageUrl: response.assets[0].uri

                })
                // console.log(response.assets[0].uri)
                //  console.log({ profilePicture: response.assets[0].base64 })
                //  console.log(data);
                this.props.updateUserProfilePic({ profilePicture: response.assets[0].base64 })
            }
        })
    }
    renderProfileImage = () => {
        let { isImageChanged, profImg_imageUrl } = this.state;
        let { userInfo, } = this.props;
        console.log(userInfo);
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                <Avatar
                    containerStyle={{ marginTop: -10 }}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                    source={{
                        uri:
                            userInfo.profilePicture ? userInfo.profilePicture : isImageChanged ? profImg_imageUrl : 'no-img',
                    }}
                    overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                    showAccessory={true}
                    onEditPress={this.handleImageChange}
                    onPress={this.handleImageChange}
                    size={100}
                // onEditPress={this.showEditProfileModal}
                >
                    <Avatar.Accessory name="edit" onPress={this.handleImageChange}
                        type="font-awesome5"
                        size={20}
                        color={'black'}
                        style={{ backgroundColor: 'white' }}
                        containerStyle={{ backgroundColor: 'transparent' }}
                    />
                </Avatar>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: "bold" }}>{userInfo.name}</Text>
            </View>
        )

    }
    renderBasicInfo = () => {
        let { name, phone, email, dob, gender } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Name*</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        editable={true}
                        value={name}
                        onChangeText={(text) => this.handleProfileChange('name', text)}
                    />
                </View>
                <Text style={style.labelStyle}>Phone*</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={String(phone)}
                        onChangeText={(text) => this.handleProfileChange('phone', text)}
                        keyboardType='phone-pad'
                    />


                </View>
                <Text style={style.labelStyle}>Email*</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={email}
                        onChangeText={(text) => this.handleProfileChange('email', text)}
                        keyboardType='email-address'
                    />


                </View>
                <Text style={style.labelStyle}>Birthday*</Text>
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

                <Text style={style.labelStyle}>Gender*</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: -10
                }}>
                    <CheckBox
                        title='Male'
                        checked={gender == 'male' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'male')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Female'
                        checked={gender == 'female' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'female')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Other'
                        checked={gender == 'other' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'other')}
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
                <View>
                    <TextInput
                        style={style.inputStyle}
                        editable={true}
                        value={instaLink}
                        onChangeText={(text) => this.handleInstaIDChange(text)}
                    />
                </View>
                <Text style={style.labelStyle}>Facebook profile link</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={fbLink}
                        onChangeText={(text) => this.handleFBLinkChange(text)}

                    />


                </View>
                <Text style={style.labelStyle}>Hobbies/ Personal interest</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={hobbies}
                        onChangeText={(text) => this.handleHobbiesChange(text)}

                    />


                </View>

                <Text style={style.labelStyle}>Relationship Status</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: -10
                }}>
                    <CheckBox
                        title='Single'
                        checked={relationshipStatus == 'single' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleRelationshipStatusChange('single')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Married'
                        checked={relationshipStatus == 'married' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleRelationshipStatusChange('married')}
                        checkedColor='black'
                    />
                    <CheckBox
                        title='Other'
                        checked={relationshipStatus == 'other' ? true : false} textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleRelationshipStatusChange('other')}
                        checkedColor='black'
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
                <View>
                    <TextInput
                        style={style.inputStyle}
                        editable={true}
                        value={linkedinLink}
                        onChangeText={(text) => this.handleLinkedinChange(text)}
                    />
                </View>
                <Text style={style.labelStyle}>Professional email</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={professionalEmail}
                        onChangeText={(text) => this.handlelProfessionalEmailChange(text)}
                        keyboardType='email-address'
                    />


                </View>
                <Text style={style.labelStyle}>Current college/company</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={currentOrganization}
                        onChangeText={(text) => this.handleCurrentOrganizationChange(text)}

                    />


                </View>
                <Text style={style.labelStyle}>Previous college/company</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={previousOrganization}
                        onChangeText={(text) => this.handlePreviousOrganizationChange(text)}

                    />
                </View>
                <Text style={style.labelStyle}>Professional interests</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={professionalInterests}
                        onChangeText={(text) => this.handleProfessionalInterestsChange(text)}

                    />
                </View>
                <Text style={style.labelStyle}>Skills</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={skills}
                        onChangeText={(text) => this.handleSkillsChange(text)}

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
                        editable={true}
                        value={currentLocation}
                        onChangeText={(text) => this.handleCurrentLocationChange(text)}
                    />
                </View>
                <Text style={style.labelStyle}>Home location</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={homeLocation}
                        onChangeText={(text) => this.handlelHomeLocationChange(text)}

                    />


                </View>
                <Text style={style.labelStyle}>Languages you speak</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={languages}
                        onChangeText={(text) => this.handleLanguagesChange(text)}

                    />
                </View>
                <Text style={style.labelStyle}>About yourself</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={aboutMe}
                        onChangeText={(text) => this.handleAboutMeChange(text)}

                    />
                </View>

            </View>)
    }
    render() {
        let { error, isLoading, userInfo, } = this.props;
        //   console.log(this.state.name);
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                    <Icon type='material-community' name='refresh' size={40} color='black' onPress={() => {
                        this.props.fetchUserInfo()
                    }} />
                </View>

            )
        } else if (isLoading || !this.props.userInfo) {
            return (
                <View
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',

                    }}>
                    <ActivityIndicator color='black' />
                </View >
            )
        }
        else {
            return (
                <View
                    style={style.conatiner}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                    >
                        <DateTimePickerModal
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            maximumDate={new Date()}
                        />
                        {this.renderProfileImage()}
                        {this.renderBasicInfo()}
                        {this.renderPersonalInfo()}
                        {this.renderProfessionalInfo()}
                        {this.renderOtherInfo()}

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                onPress={() => this.handleSubmit()}
                                title="Save"
                                TouchableOpacity={1}
                                buttonStyle={style.buttonStyle}
                            />
                        </View>
                    </ScrollView>
                </View >
            )
        }

    }
}
