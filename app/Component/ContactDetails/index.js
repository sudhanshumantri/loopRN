import React from 'react';
import { View, Text, TextInput, Image, Dimensions, TouchableOpacity, Linking, PermissionsAndroid, Platform, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import style from './style';

export default class ContactsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            name: undefined,
            bio: '',
            dob: undefined,
            profilePicture: '',
            twitterLink: undefined,
            telegramLink: undefined,
            email: undefined,
            professionalEmail: undefined,
            fbLink: undefined,
            phone: undefined,
            instaLink: undefined,
            linkedinLink: undefined,
            phone: undefined,
            gender: undefined,
            isDateTimePickerVisible: false,
            userInfo: '',
            allData: '',
            showFullSizeImage: false,



        }
    }
    componentDidMount() {
        this.setState({
            userInfo: this.props.route.params.user.contactId,
            allData: this.props.route.params.user

        })
    }

    handLinking = (url, extraurl) => {
        if (extraurl && extraurl.trim().length>0) {
            if (extraurl == 'no-url-provided') {

            } else {
                url = url + extraurl;
                Linking.openURL(url);
            }
        }
        else if (url && url.trim().length > 0) {
          //  console.log(url)
            Linking.openURL(url.trim())
        }
    }
    handleGpayRedirection = (upiId) => {
        if (upiId == 'no-url-provided') {

        } else {
            let { profilePicture, name, aboutMe } = this.state.userInfo;
            // upiId='sudhanshusingh787-1@okaxis';
            let link = 'tez://upi/pay?pa='+upiId+'&pn='+name+'&tn=&mc=&tr=&am=5&cu=INR';
            console.log(link);
            const supported = Linking.canOpenURL(link);
            if (supported) {
                Linking.openURL(link);
            }
        }


    }
    handlePaytmRedirection = (upiId) => {
        if (upiId == 'no-url-provided') {

        } else {
            let { profilePicture, name, aboutMe } = this.state.userInfo;
            let link = 'paytmmp://pay?pa=' + upiId + '&pn=' + name + '&tn=&am=5&cu=INR';
            const supported = Linking.canOpenURL(link);
            if (supported) {
             //   console.log('inside man');
                Linking.openURL(link);
            } else {
                console.log('paytm app not found');
            }
        }

    }
    showImageFullSize = () => {
        this.setState({
            showFullSizeImage: true
        }, () => {
            let timer = setTimeout(() => {
                this.setState({
                    showFullSizeImage: false
                });
            }, 1000);
        })
    }

    renderProfileImage = () => {
        let { profilePicture, name, aboutMe } = this.state.userInfo;
        return (
            <View>
                <View style={style.profileTopContainer}>
                    <View style={{ flex: 1.5 / 6 }}>
                        <Avatar
                            containerStyle={{ marginTop: -10 }}
                            rounded
                            icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                            source={{

                                uri: profilePicture ? profilePicture : 'no-img',
                            }}
                            overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                            onPress={this.showImageFullSize}
                            size={70}
                        >
                        </Avatar>
                    </View>
                    <View style={{ flex: 5.5 / 6, marginLeft: 10 }}>
                        <Text style={style.textBoldStyle}>{name}</Text>
                        <Text>{aboutMe}</Text>
                    </View>

                </View>
                <View
                    style={style.horizontalDivider}
                />
            </View>
        )

    }
    renderSocialAndContactInfo = () => {
        let { name, phone, email, paytmLink, gpay, professionalEmail, instaLink, fbLink, linkedinLink, telegramLink, twitterLink } = this.state.userInfo;
        let allData = this.state.allData;
        let socialMediaSharing = {};
        if (allData) {
            if (allData.isCustomSharing) {
                socialMediaSharing = allData.sharingConfiguration.socialMediaSharing.sharingConfigurations
                //select from the sharingConfigurationf
            } else {
                //get the data from the sharingPreferencesId
                if (allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.isShared) {

                    socialMediaSharing = allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.socialMediaSharing.sharingConfigurations
                } else {
                    socialMediaSharing = allData.sharingPreferencesId.socialMediaSharing.sharingConfigurations
                    //find the shared info and do that shared needs
                }
            }
        //   console.log(fbLink,lin);
            return (
                <View>{socialMediaSharing.isShared && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={style.sectionHeader}>Social and Contact Info</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.phone) ?
                                            require('../../../assets/icons/V_Call.png') : require('../../../assets/icons/BW_V_Call.png')
                                    }
                                    onPress={() => (socialMediaSharing.isShared && socialMediaSharing.phone) ? Linking.openURL(`tel:${phone}`) : ''}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Phone</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.phone) ?
                                            require('../../../assets/icons/V_WhatsApp.png') : require('../../../assets/icons/BW_V_WhatsApp.png')
                                    }
                                    onPress={() => (socialMediaSharing.isShared && socialMediaSharing.phone) ? this.handLinking('https://wa.me/91' + phone) : ''}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Whatsapp</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.email && email && email.trim().length) > 0 ? require('../../../assets/icons/V_PersonalEmail.png') : require('../../../assets/icons/BW_V_PersonalEmail.png')

                                    }
                                    onPress={() => (socialMediaSharing.isShared && socialMediaSharing.email && email && email.trim().length) > 0 ? Linking.openURL('mailto:' + email) : ''}

                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Email</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.professionalEmail && professionalEmail && professionalEmail.trim().length) > 0 ? require('../../../assets/icons/V_WorkEmail.png') : require('../../../assets/icons/BW_V_WorkEmail.png')

                                    }
                                    onPress={() => (socialMediaSharing.isShared && socialMediaSharing.professionalEmail && professionalEmail && professionalEmail.trim().length) > 0 ? Linking.openURL('mailto:' + professionalEmail) : ''}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Work Email</Text>
                            </View>
                            <View style={style.iconContainer}>

                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.instaLink && instaLink && instaLink.trim().length > 0) ? require('../../../assets/icons/V_Instagram.png') : require('../../../assets/icons/BW_V_Instagram.png')

                                    }
                                    onPress={() => this.handLinking('https://www.instagram.com/', (socialMediaSharing.isShared && socialMediaSharing.instaLink && instaLink && instaLink.trim().length > 0) ? instaLink : 'no-url-provided')}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Instagram</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.fbLink && fbLink && fbLink.trim().length) > 0 ? require('../../../assets/icons/V_Facebook.png') : require('../../../assets/icons/BW_V_Facebook.png')

                                    }
                                    onPress={() => this.handLinking(fbLink, (socialMediaSharing.isShared && socialMediaSharing.fbLink && fbLink && fbLink.trim().length > 0) ? '' : 'no-url-provided')}

                                    // onPress={() => this.handLinking(fbLink)}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Facebook</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (socialMediaSharing.isShared && socialMediaSharing.linkedinLink && linkedinLink && linkedinLink.trim().length) > 0 ? require('../../../assets/icons/V_LinkedIn.png') : require('../../../assets/icons/BW_V_LinkedIn.png')

                                    }
                                    onPress={() => this.handLinking(linkedinLink, (socialMediaSharing.isShared && socialMediaSharing.linkedinLink && linkedinLink && linkedinLink.trim().length > 0) ? '' : 'no-url-provided')}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>LinkedIn</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (twitterLink && twitterLink.trim().length) > 0 ? require('../../../assets/icons/V_Twitter.png') : require('../../../assets/icons/BW_V_Twitter.png')

                                    }
                                    onPress={() => this.handLinking('https://twitter.com/', (socialMediaSharing.isShared && socialMediaSharing.twitterLink && twitterLink && twitterLink.trim().length > 0) ? twitterLink : 'no-url-provided')}

                                    // onPress={this.handleImageChange}
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Twitter</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (telegramLink && telegramLink.trim().length) > 0 ? require('../../../assets/icons/V_Telegram.png') : require('../../../assets/icons/BW_V_Telegram.png')

                                    }
                                    onPress={() => this.handLinking('https://t.me/', (socialMediaSharing.isShared && socialMediaSharing.telegramLink && telegramLink && telegramLink.trim().length > 0) ? telegramLink : 'no-url-provided')}

                                    // 
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Telegram</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (paytmLink && paytmLink.trim().length) > 0 ? require('../../../assets/icons/V_Paytm.png') : require('../../../assets/icons/BW_V_Paytm.png')

                                    }
                                    onPress={() => this.handlePaytmRedirection((paytmLink && paytmLink.trim().length) > 0 ? paytmLink : 'no-url-provided')}

                                    // 
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Paytm</Text>
                            </View>
                            <View style={style.iconContainer}>
                                <Avatar
                                    source={
                                        (gpay && gpay.trim().length) > 0 ? require('../../../assets/icons/V_GPay.png') : require('../../../assets/icons/BW_V_GPay.png')

                                    }
                                    onPress={() => this.handleGpayRedirection((gpay && gpay.trim().length) > 0 ? gpay : 'no-url-provided')}
                                    // 
                                    size={60}
                                >
                                </Avatar>
                                <Text style={style.iconLabel}>Gpay</Text>
                            </View>
                        </View>
                        <View
                            style={style.horizontalDivider}
                        />

                    </View>
                )}</View>);
        }
    }
    renderPersonalInfo = () => {
        let { userInfo, } = this.props;
        let { dob, gender, homeLocation, currentLocation, relationshipStatus, hobbies } = this.state.userInfo;
        let allData = this.state.allData;
        let formattedDob = dob;
        let personalInfoSharing = {};
        if (allData) {
            if (allData.isCustomSharing) {
                personalInfoSharing = allData.sharingConfiguration.personalInfoSharing.sharingConfigurations

                //select from the sharingConfiguration
            } else {
                //get the data from the sharingPreferencesId
                if (allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.isShared) {
                    personalInfoSharing = allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.personalInfoSharing.sharingConfigurations
                } else {
                    personalInfoSharing = allData.sharingPreferencesId.personalInfoSharing.sharingConfigurations
                    //find the shared info and do that shared needs
                }
            }
            if (dob && dob != '') {
                var d = moment(dob, 'DD-MM-YY');
                formattedDob = d.format('MMM DD');
            }
            return (
                <View>
                    {personalInfoSharing.isShared && (
                        <View style={{ marginTop: 10 }}>
                            <Text style={style.sectionHeader}>Personal Info</Text>
                            <View style={{ marginTop: 10 }}>
                                {personalInfoSharing.isShared && personalInfoSharing.dob && (
                                    <View>
                                        <Text style={style.labelStyle}>Birthday</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}

                                                editable={false}
                                                value={formattedDob}
                                            />
                                        </View>
                                    </View>
                                )}
                                {personalInfoSharing.isShared && personalInfoSharing.gender && (
                                    <View>
                                        <Text style={style.labelStyle}>Gender</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}
                                                editable={false}
                                                value={gender}

                                            />
                                        </View>
                                    </View>
                                )}
                                {/* {personalInfoSharing.isShared && personalInfoSharing.relationshipStatus && (
                                    <View>
                                        <Text style={style.labelStyle}>Relationship Status</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}
                                                editable={false}
                                                value={relationshipStatus}
                                            />
                                        </View>
                                    </View>
                                )} */}
                                {personalInfoSharing.isShared && personalInfoSharing.hobbies && (
                                    <View>
                                        <Text style={style.labelStyle}>Hobbies/ Personal interest</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}
                                                //  value={this.props.diagnostic_Tests_Ref}
                                                editable={false}
                                                value={hobbies}
                                                editable={false}

                                            />
                                        </View>
                                    </View>
                                )}
                                {personalInfoSharing.isShared && personalInfoSharing.currentLocation && (
                                    <View>
                                        <Text style={style.labelStyle}>Current location</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}
                                                editable={false}
                                                value={currentLocation}

                                            />
                                        </View>
                                    </View>
                                )}
                                {personalInfoSharing.isShared && personalInfoSharing.homeLocation && (
                                    <View>
                                        <Text style={style.labelStyle}>Home location</Text>
                                        <View>
                                            <TextInput
                                                style={style.inputStyle}
                                                editable={false}
                                                value={homeLocation}


                                            />
                                        </View>
                                    </View>
                                )}
                                <View
                                    style={style.horizontalDivider}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )
        }
    }
    renderProfessionalInfo = () => {
        let { userInfo, } = this.props;
        let { currentOrganization, previousOrganization, languages, professionalInterests, skills } = this.state.userInfo;
        let professionalInfoSharing = {};
        let allData = this.state.allData;
        if (allData) {
            if (allData.isCustomSharing) {
                professionalInfoSharing = allData.sharingConfiguration.professionalInfoSharing.sharingConfigurations

                //select from the sharingConfiguration
            } else {
                //get the data from the sharingPreferencesId
                if (allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.isShared) {
                    professionalInfoSharing = allData.sharingPreferencesId.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations
                } else {
                    professionalInfoSharing = allData.sharingPreferencesId.professionalInfoSharing.sharingConfigurations
                    //find the shared info and do that shared needs
                }
            }
            return (
                <View>
                    {professionalInfoSharing.isShared && (
                        <View style={{ marginTop: 10 }}>
                            {professionalInfoSharing.isShared && professionalInfoSharing.currentOrganization && (
                                <View>
                                    <Text style={style.sectionHeader}>Professional Info</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={style.labelStyle}>Current college/company</Text>

                                        <TextInput
                                            style={style.inputStyle}
                                            editable={false}
                                            value={currentOrganization}

                                        />
                                    </View>
                                </View>

                            )}
                            {professionalInfoSharing.isShared && professionalInfoSharing.previousOrganization && (
                                <View>
                                    <Text style={style.labelStyle}>Previous college/company</Text>
                                    <View>
                                        <TextInput
                                            style={style.inputStyle}
                                            editable={false}
                                            value={previousOrganization}
                                        />
                                    </View>
                                </View>
                            )}
                            {professionalInfoSharing.isShared && professionalInfoSharing.professionalInterests && (
                                <View>
                                    <Text style={style.labelStyle}>Professional interests</Text>
                                    <View>
                                        <TextInput
                                            style={style.inputStyle}
                                            //  value={this.props.diagnostic_Tests_Ref}
                                            editable={false}
                                            value={professionalInterests}
                                        />
                                    </View>
                                </View>
                            )}
                            {professionalInfoSharing.isShared && professionalInfoSharing.skills && (
                                <View>
                                    <Text style={style.labelStyle}>Skills</Text>
                                    <View>
                                        <TextInput
                                            style={style.inputStyle}
                                            //  value={this.props.diagnostic_Tests_Ref}
                                            editable={false}
                                            value={skills}
                                        />
                                    </View>
                                </View>
                            )}
                            {/* {professionalInfoSharing.isShared && professionalInfoSharing.languages && (
                                <View>
                                    <Text style={style.labelStyle}>Languages you speak</Text>
                                    <View>
                                        <TextInput
                                            style={style.inputStyle}
                                            //  value={this.props.diagnostic_Tests_Ref}
                                            editable={false}
                                            value={languages}

                                        />
                                    </View>
                                </View>
                            )} */}
                        </View>)}
                </View>
            )
        }
    }
    renderOtherInfo = () => {
        let { currentLocation, homeLocation, languages, aboutMe } = this.state.userInfo;
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
        let { profilePicture, name, aboutMe } = this.state.userInfo;
        return (
            <View
                style={style.conatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                >
                    {this.state.showFullSizeImage &&
                        <Modal
                            visible={this.state.showFullSizeImage}
                            transparent={true}
                        >
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 22
                            }}>
                                <Image
                                    style={{ width: Dimensions.get('window').width, height: 300, resizeMode: 'contain', }}
                                    source={{

                                        uri: profilePicture ? profilePicture : 'no-img',
                                    }}
                                />
                            </View>

                        </Modal>


                    }
                    {this.renderProfileImage()}
                    {this.renderSocialAndContactInfo()}
                    {this.renderPersonalInfo()}
                    {this.renderProfessionalInfo()}
                    {/* 
                   
                    {this.renderOtherInfo()} */}
                </ScrollView>
            </View >
        )
    }
}
