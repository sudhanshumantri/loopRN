import React from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, Dimensions, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'
import { showMessage, hideMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import style from './style';
let index = 0;
export default class PermissionSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: undefined,
            showFullSizeImage: false,
            showFullSizeImage: false,
            isConfChanged: false,
            allData: {},
            contactBlocked: false,
            iscontactBlockedChanged: false,
            sharingConfiguration: {
                sharingConfigurations: {
                    socialMediaSharing: {
                        sharingConfigurations: {
                            isShared: false
                        }
                    },
                    personalInfoSharing: {
                        sharingConfigurations: {
                            isShared: false
                        }
                    },
                    professionalInfoSharing: {
                        sharingConfigurations: {
                            isShared: false
                        }
                    }
                }
            }

        }
    }
    static navigationOptions = ({ route, navigation }) => {
        return {
            title: "Permission Settings",
            headerTitleAlign: 'left',
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerRight: () => {
                return (
                    <View style={{ marginRight: 20 }}>
                        <TouchableOpacity onPress={() => {
                            route.params ? route.params.onPressAction() : ''
                        }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ onPressAction: () => this.handleSubmit() })
        this.setState({
            userInfo: this.props.route.params.userInfo.contactId,
            allData: this.props.route.params.userInfo

        })
    }

    handleSubmit() {
        let { isConfChanged, sharingConfiguration, iscontactBlockedChanged, contactBlocked } = this.state;
        if (isConfChanged || iscontactBlockedChanged) {
            let data = {};
            if (iscontactBlockedChanged) {
                data = {
                    contactId: this.state.allData._id,
                    otherUserId: this.state.allData.contactId._id,
                    sharingConfiguration,
                    isBlokedRequest: true,
                    contactBlocked: contactBlocked
                }
            } else {
                data = {
                    contactId: this.state.allData._id,
                    otherUserId: this.state.allData.contactId._id,
                    sharingConfiguration
                }
            }

            this.props.updateContactSharingPreferences(data)
        }

    }
    handleContactExchangeToggle = () => {
        let { iscontactBlockedChanged, contactBlocked, allData } = this.state;
        if (iscontactBlockedChanged) {
            this.setState({
                iscontactBlockedChanged: true,
                contactBlocked: !contactBlocked
            })
        } else {
            this.setState({
                iscontactBlockedChanged: true,
                contactBlocked: !allData.isBlockedByUser
            })
        }
    }
    handleSocialMediaToggle = (type) => {
        let socialMediaSharingObj = {};
        let socialMediaTemp = {};
        let sharingConfiguration = this.state.sharingConfiguration;
        let allData = this.state.allData


        if (!this.state.isConfChanged) {
            if (allData.isSelfCustomSharing) {
                socialMediaSharingObj = allData.selfSharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations
                sharingConfiguration = allData.selfSharingConfiguration;
            }
            else if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing;
                socialMediaSharingObj = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.socialMediaSharing.sharingConfigurations
            } else {
                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.personalInfoSharing;
                socialMediaSharingObj = this.props.userSharingInfo.socialMediaSharing.sharingConfigurations

            }

            //  sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations=this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations;
            // sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations=this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing.sharingConfigurations;

        } else {
            socialMediaSharingObj = this.state.sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations;
        }

        let isShared = true;
        if (type == 'all') {
            let socialMediaSharing = {
                isShared: !socialMediaSharingObj.isShared,
                phone: !socialMediaSharingObj.isShared,
                email: !socialMediaSharingObj.isShared,
                professionalEmail: !socialMediaSharingObj.isShared,
                instaLink: !socialMediaSharingObj.isShared,
                fbLink: !socialMediaSharingObj.isShared,
                linkedinLink: !socialMediaSharingObj.isShared,
                twitterLink: !socialMediaSharingObj.isShared,
                telegramLink: !socialMediaSharingObj.isShared,
                paytmLink: !socialMediaSharingObj.isShared,
                splitwiseLink: !socialMediaSharingObj.isShared
            }
            console.log('socialMediaSharing', socialMediaSharing)

            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing;
            //sharingConfiguration.sharingConfigurations.isShared = true;
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'phone') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.phone = !socialMediaSharing.phone;
            //   let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            sharingConfiguration.sharingConfigurations.isShared = true;
            this.setState({
                isConfChanged: true,
                customInfoSharing: customInfoSharing
            })
        } else if (type == 'email') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.email = !socialMediaSharing.email;
            // let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            sharingConfiguration.sharingConfigurations.isShared = true;
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'professionalEmail') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.professionalEmail = !socialMediaSharing.professionalEmail;
            //    let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            sharingConfiguration.sharingConfigurations.isShared = true;
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'instaLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.instaLink = !socialMediaSharing.instaLink;
            //  let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'fbLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.fbLink = !socialMediaSharing.fbLink;
            //  let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'linkedinLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.linkedinLink = !socialMediaSharing.linkedinLink;
            // let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'twitterLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.twitterLink = !socialMediaSharing.twitterLink;
            //    let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'telegramLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.telegramLink = !socialMediaSharing.telegramLink;
            //   let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'paytmLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.paytmLink = !socialMediaSharing.paytmLink;
            //  let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'splitwiseLink') {
            let socialMediaSharing = socialMediaSharingObj;
            socialMediaSharing.isShared = isShared;
            socialMediaSharing.splitwiseLink = !socialMediaSharing.splitwiseLink;
            //    let customInfoSharing = this.state.customInfoSharing;
            sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations = socialMediaSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
    }
    handlePersonalInfoToggle = (type) => {

        let personalInfoSharingObj = {}
        let sharingConfiguration = this.state.sharingConfiguration;
        let allData = this.state.allData
        if (!this.state.isConfChanged) {
            if (allData.isSelfCustomSharing) {
                personalInfoSharingObj = allData.selfSharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations
                sharingConfiguration = allData.selfSharingConfiguration;

            } else if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing;
                personalInfoSharingObj = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing.sharingConfigurations
            } else {

                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.personalInfoSharing;
                personalInfoSharingObj = this.props.userSharingInfo.personalInfoSharing.sharingConfigurations

            }

            //  sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations=this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations;
            // sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations=this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing.sharingConfigurations;

        } else {
            personalInfoSharingObj = this.state.sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations;
        }

        let isShared = true;
        if (type == 'all') {
            let personalInfoSharing = {
                isShared: !personalInfoSharingObj.isShared,
                dob: !personalInfoSharingObj.isShared,
                gender: !personalInfoSharingObj.isShared,
                relationshipStatus: !personalInfoSharingObj.isShared,
                hobbies: !personalInfoSharingObj.isShared,
                currentLocation: !personalInfoSharingObj.isShared,
                homeLocation: !personalInfoSharingObj.isShared,
            }

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'dob') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.dob = !personalInfoSharing.dob;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'gender') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.gender = !personalInfoSharing.gender;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'relationshipStatus') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.relationshipStatus = !personalInfoSharing.relationshipStatus;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'hobbies') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.hobbies = !personalInfoSharing.hobbies;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'currentLocation') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.currentLocation = !personalInfoSharing.currentLocation;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
        else if (type == 'homeLocation') {
            let personalInfoSharing = personalInfoSharingObj;
            personalInfoSharing.isShared = isShared;
            personalInfoSharing.homeLocation = !personalInfoSharing.homeLocation;

            sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations = personalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
    }
    handleProfessionalInfoToggle = (type) => {
        let professionalInfoSharingObj = {};
        let sharingConfiguration = this.state.sharingConfiguration;
        let allData = this.state.allData
        if (!this.state.isConfChanged) {
            if (allData.isSelfCustomSharing) {
                professionalInfoSharingObj = allData.selfSharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations
                sharingConfiguration = allData.selfSharingConfiguration;
            }
            else if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing;
                professionalInfoSharingObj = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations
            } else {

                sharingConfiguration.sharingConfigurations.socialMediaSharing = this.props.userSharingInfo.socialMediaSharing;
                sharingConfiguration.sharingConfigurations.professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing;
                sharingConfiguration.sharingConfigurations.personalInfoSharing = this.props.userSharingInfo.personalInfoSharing;
                professionalInfoSharingObj = this.props.userSharingInfo.professionalInfoSharing.sharingConfigurations

            }

        } else {
            professionalInfoSharingObj = this.state.sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations;
        }
        let isShared = true;
        if (type == 'all') {
            let professionalInfoSharing = {
                isShared: !professionalInfoSharingObj.isShared,
                currentOrganization: !professionalInfoSharingObj.isShared,
                previousOrganization: !professionalInfoSharingObj.isShared,
                professionalInterests: !professionalInfoSharingObj.isShared,
                skills: !professionalInfoSharingObj.isShared,
                languages: !professionalInfoSharingObj.isShared,

            }
            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'currentOrganization') {
            let professionalInfoSharing = professionalInfoSharingObj;
            professionalInfoSharing.isShared = isShared;
            professionalInfoSharing.currentOrganization = !professionalInfoSharing.currentOrganization;
            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'previousOrganization') {
            let professionalInfoSharing = professionalInfoSharingObj;
            professionalInfoSharing.isShared = isShared;
            professionalInfoSharing.previousOrganization = !professionalInfoSharing.previousOrganization;
            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'professionalInterests') {
            let professionalInfoSharing = professionalInfoSharingObj;
            professionalInfoSharing.isShared = isShared;
            professionalInfoSharing.professionalInterests = !professionalInfoSharing.professionalInterests;

            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'languages') {
            let professionalInfoSharing = professionalInfoSharingObj;
            professionalInfoSharing.isShared = isShared;
            professionalInfoSharing.languages = !professionalInfoSharing.languages;
            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        } else if (type == 'skills') {
            let professionalInfoSharing = professionalInfoSharingObj;
            professionalInfoSharing.isShared = isShared;
            professionalInfoSharing.skills = !professionalInfoSharing.skills;
            sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations = professionalInfoSharing
            this.setState({
                isConfChanged: true,
                sharingConfiguration: sharingConfiguration
            })
        }
    }
    //now complete the personal and professional info sharing man :

    renderContactSharingToggle = () => {
        let { allData, iscontactBlockedChanged } = this.state;
        let contactBlocked = false;
        if (iscontactBlockedChanged) {
            contactBlocked = this.state.contactBlocked
        } else {
            contactBlocked = allData.isBlockedByUser
        }
        return (<View>
            <View style={style.flexToggleRootContainer}>
                <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Icon type='font-awesome' name='exchange' size={30} style={{ marginRight: 10 }} />
                    <Text style={style.titleStyle}>Contact Exchange</Text>
                </View>

                <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={!contactBlocked} color="black" onValueChange={() => this.handleContactExchangeToggle()} /></View>
            </View>
            <Text>Turn off to block this contact</Text>
            <View
                style={style.horizontalDivider}
            />
        </View>)
    }
    renderSharingConfiguration = () => {
        let { userInfo } = this.state
        return (<View>
            <Text style={style.labelStyle}>Choose What to Share with {userInfo.name}</Text>
            {this.renderSocialAndContactInfo()}
            {this.renderPersonalInfo()}
            {this.renderProfessionalInfo()}
        </View>);

    }
    renderUserInfo = () => {
        return (
            <View>
                {this.renderProfileImage()}
                {this.renderContactSharingToggle()}
                {this.renderSharingConfiguration()}
            </View>
        )
    }

    renderProfileImage = () => {
        let { isImageChanged, profImg_imageUrl, userInfo } = this.state;
        //  console.log(isImageChanged, profImg_imageUrl,userInfo.profilePicture);
        return (
            <View>
                <View style={style.profileTopContainer}>
                    <View style={{ flex: 1 / 3 }}>
                        <Avatar
                            containerStyle={{ marginTop: -10 }}
                            rounded
                            icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                            source={{

                                uri: userInfo.profilePicture ? userInfo.profilePicture : 'no-img',
                            }}
                            overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                            // onEditPress={this.handleImageChange}
                            // onPress={this.showImageFullSize}
                            size={100}
                        >
                        </Avatar>
                    </View>
                    <View style={{ flex: 2 / 3 }}>
                        <Text style={style.textBoldStyle}>{userInfo.name}</Text>
                        <Text>{userInfo.name}</Text>
                    </View>

                </View>
                <View
                    style={style.horizontalDivider}
                />
            </View>
        )

    }
    renderSocialAndContactInfo = () => {
        let { isConfChanged, sharingConfiguration, allData } = this.state;
        let socialMediaSharing = {};
        if (isConfChanged) {
            socialMediaSharing = sharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations

        } else {
            if (allData.isSelfCustomSharing) {
                socialMediaSharing = allData.selfSharingConfiguration.sharingConfigurations.socialMediaSharing.sharingConfigurations
            } else {
                if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                    socialMediaSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.socialMediaSharing.sharingConfigurations;
                } else {
                    socialMediaSharing = this.props.userSharingInfo.socialMediaSharing.sharingConfigurations;
                }
            }
        }

        return (
            <View style={{ marginTop: 10 }}>
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Social and Contact Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={socialMediaSharing.isShared} onValueChange={() => this.handleSocialMediaToggle('all')} color="black" /></View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.phone ? require('../../../assets/icons/V_Call.png') : require('../../../assets/icons/BW_V_Call.png'))
                            }
                            onPress={() => this.handleSocialMediaToggle('phone')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Phone</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.email ? require('../../../assets/icons/V_PersonalEmail.png') : require('../../../assets/icons/BW_V_PersonalEmail.png'))

                                // require('../../../assets/icons/PersonalEmail.png')
                            }
                            onPress={() => this.handleSocialMediaToggle('email')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Email</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.professionalEmail ? require('../../../assets/icons/V_WorkEmail.png') : require('../../../assets/icons/BW_V_WorkEmail.png'))

                            }
                            onPress={() => this.handleSocialMediaToggle('professionalEmail')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Work Email</Text>
                    </View>
                    <View style={style.iconContainer}>

                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.instaLink ? require('../../../assets/icons/V_Instagram.png') : require('../../../assets/icons/BW_V_Instagram.png'))
                            }
                            onPress={() => this.handleSocialMediaToggle('instaLink')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Instagram</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.fbLink ? require('../../../assets/icons/V_Facebook.png') : require('../../../assets/icons/BW_V_Facebook.png'))

                            }
                            onPress={() => this.handleSocialMediaToggle('fbLink')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Facebook</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (socialMediaSharing.isShared && socialMediaSharing.linkedinLink ? require('../../../assets/icons/V_LinkedIn.png') : require('../../../assets/icons/BW_V_LinkedIn.png'))

                            }
                            onPress={() => this.handleSocialMediaToggle('linkedinLink')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>LinkedIn</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                socialMediaSharing.isShared && socialMediaSharing.twitterLink ? require('../../../assets/icons/V_Twitter.png') : require('../../../assets/icons/BW_V_Twitter.png')
                            }
                            onPress={() => this.handleSocialMediaToggle('twitterLink')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Twitter</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                socialMediaSharing.isShared && socialMediaSharing.telegramLink ? require('../../../assets/icons/V_Telegram.png') : require('../../../assets/icons/BW_V_Telegram.png')
                            }
                            onPress={() => this.handleSocialMediaToggle('telegramLink')}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Telegram</Text>
                    </View>
                </View>
                <View
                    style={style.horizontalDivider}
                />
            </View>
        )
    }
    renderPersonalInfo = () => {
        let { isConfChanged, sharingConfiguration, allData } = this.state;
        let personalInfoSharing = {};
        if (isConfChanged) {
            personalInfoSharing = sharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations

        } else {
            if (allData.isSelfCustomSharing) {
                personalInfoSharing = allData.selfSharingConfiguration.sharingConfigurations.personalInfoSharing.sharingConfigurations
            } else {
                if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                    personalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.personalInfoSharing.sharingConfigurations;
                } else {
                    personalInfoSharing = this.props.userSharingInfo.personalInfoSharing.sharingConfigurations;
                }
            }
        }


        return (
            <View style={{ marginTop: 10 }}>
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Personal Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={personalInfoSharing.isShared} onValueChange={() => this.handlePersonalInfoToggle('all')} color="orange" /></View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Birthdday'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch value={personalInfoSharing.isShared && personalInfoSharing.dob} onValueChange={() => this.handlePersonalInfoToggle('dob')} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Gender'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handlePersonalInfoToggle('gender')} value={personalInfoSharing.isShared && personalInfoSharing.gender} color="orange" />
                        </View>
                    </View>
                    {/* <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Relationship Status'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handlePersonalInfoToggle('relationshipStatus')} value={personalInfoSharing.isShared && personalInfoSharing.relationshipStatus} color="orange" />
                        </View>
                    </View> */}
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Hobbies/ Personal interest'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handlePersonalInfoToggle('hobbies')} value={personalInfoSharing.isShared && personalInfoSharing.hobbies} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Current location'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handlePersonalInfoToggle('currentLocation')} value={personalInfoSharing.isShared && personalInfoSharing.currentLocation} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Home location'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handlePersonalInfoToggle('homeLocation')} value={personalInfoSharing.isShared && personalInfoSharing.homeLocation} color="orange" />
                        </View>
                    </View>
                    <View
                        style={style.horizontalDivider}
                    />
                </View>
            </View>
        );
    }
    renderProfessionalInfo = () => {

        let { isConfChanged, sharingConfiguration, allData } = this.state;
        let professionalInfoSharing = {};
        if (isConfChanged) {
            professionalInfoSharing = sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations

        } else {
            if (allData.isSelfCustomSharing) {
                professionalInfoSharing = allData.selfSharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations
            } else {
                if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
                    professionalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations;
                } else {
                    professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing.sharingConfigurations;
                }
            }
        }

        // if (allData.isCustomSharing) {
        //     professionalInfoSharing = allData.sharingPreferencesId.sharingConfiguration.sharingConfigurations.professionalInfoSharing.sharingConfigurations
        // } else {
        //     if (this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared) {
        //         professionalInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.professionalInfoSharing.sharingConfigurations;
        //     } else {
        //         professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing.sharingConfigurations;
        //     }
        //     professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing.sharingConfigurations;
        // }
        return (
            <View style={{ marginTop: 10 }}>
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Professional Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch onValueChange={() => this.handleProfessionalInfoToggle('all')} value={professionalInfoSharing.isShared} color="orange" /></View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Current college/company'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handleProfessionalInfoToggle('currentOrganization')} value={professionalInfoSharing.isShared && professionalInfoSharing.currentOrganization} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Previous college/company'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handleProfessionalInfoToggle('previousOrganization')} value={professionalInfoSharing.isShared && professionalInfoSharing.previousOrganization} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Professional interests'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handleProfessionalInfoToggle('professionalInterests')} value={professionalInfoSharing.isShared && professionalInfoSharing.professionalInterests} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Skills'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handleProfessionalInfoToggle('skills')} value={professionalInfoSharing.isShared && professionalInfoSharing.skills} color="orange" />
                        </View>
                    </View>
                    {/* <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Languages you speak'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch onValueChange={() => this.handleProfessionalInfoToggle('languages')} value={professionalInfoSharing.isShared && professionalInfoSharing.languages} color="orange" />
                        </View>
                    </View> */}
                    <View
                        style={style.horizontalDivider}
                    />
                </View>
            </View>
        )
    }
    render() {
        // let { error, , userInfo, } = this.props;
        let { isImageChanged, profImg_imageUrl, userInfo } = this.state;
        let { isContactUpdating } = this.props;
        console.log(isContactUpdating, 'coming here')
        //   console.log(this.state.name);
        return (
            <View
                style={style.conatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                >
                    {userInfo && !this.state.showFullSizeImage &&
                        this.renderUserInfo()
                    }
                    <Spinner color='grey'
                        visible={isContactUpdating}
                    />
                </ScrollView>
            </View >
        )
    }
}
