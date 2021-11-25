import React from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, Dimensions, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'
import { showMessage, hideMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import style from './style';
import ModalPopup from '../Shared/ModalPopup/index';
let index = 0;
const relationshipStatusArray = [
    { key: index++, label: 'Single' },
    { key: index++, label: 'Committed' },
    { key: index++, label: 'Complicated' },
    { key: index++, label: 'Open Relationship', },
    { key: index++, label: 'Not Interested', },
    { key: index++, label: 'Married', },
    { key: index++, label: 'Other', },
];
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            name: undefined,
            dob: undefined,
            email: undefined,
            professionalEmail: undefined,
            fbLink: undefined,
            phone: undefined,
            instaLink: undefined,
            linkedinLink: undefined,
            twitterLink: undefined,
            telegramLink: undefined,
            phone: undefined,
            gender: undefined,
            isDateTimePickerVisible: false,
            showFullSizeImage: false,
            showPopup: false,
            placeholder: '',
            title: '',
            inputType: '',
            modalInputValue: '',
            socialContactUpdateType: ''

        }
    }
    componentDidMount() {

        let data = this.props.userInfo ? this.props.userInfo : {};
        data.isDateTimePickerVisible = false;
        data.isImageChanged = false;
        this.setState(data);
    }
    showPopupModal = (type, value) => {
        let title = '';
        let placeholder = '';
        let inputType = 'email';

        if (type == 'email') {
            title = 'Edit Your Email';
            placeholder = 'Enter email';

        } else if (type == 'work-email') {
            title = 'Edit Your Professional Email';
            placeholder = 'Enter email';

        } else if (type == 'instagram') {
            title = 'Edit Your Intagram Username';
            placeholder = 'Enter Instagram Link';

        } else if (type == 'facebook') {
            title = 'Edit Your Facebook';
            placeholder = 'Enter Facebook Link';

        } else if (type == 'linkedin') {
            title = 'Edit Your Linkedin';
            placeholder = 'Enter Linkedin Link';

        } else if (type == 'twitter') {
            title = 'Edit Your Twitter';
            placeholder = 'Enter Twitter Link';

        } else if (type == 'telegram') {
            title = 'Edit Your Telegram';
            placeholder = 'Enter Telegram Link';

        } else if (type == 'name') {
            title = 'Edit Your Name';
            placeholder = 'Enter Your Name';

        } else if (type == 'aboutMe') {
            title = 'Edit About Me';
            placeholder = '';

        }
        this.setState({
            showPopup: true,
            placeholder,
            socialContactUpdateType: type,
            inputType,
            title,
            modalInputValue: value
        })
    }
    closePopupModal = () => {
        this.setState({
            showPopup: false
        })
    }
    validateInstagramLink = (values) => {
        var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        if (urlregex.test(values)) {
            isValidated = false;
            showMessage({
                message: "Instgram username is not valid",
                type: "danger",
            });
            return false;
        } else {
            return true;
        }
    }
    validatePersonalEmail = (values) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values)) {
            isValidated = false;
            showMessage({
                message: "Email is not valid",
                type: "danger",
            });
            return false
        } else {
            return true
        }
    }
    validateProfessionalEmail = (values) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values)) {
            isValidated = false;
            showMessage({
                message: "Email is not valid",
                type: "danger",
            });
            return false;
        } else {
            return true
        }
    }
    validateFBLink = (values) => {
        if (!/(ftp|http|https):\/\/?(?:www\.)?facebook.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(values)) {
            isValidated = false;
            showMessage({
                message: "Facebook profile is not valid",
                type: "danger",
            });
            return false;
        } else {
            return true
        }
    }
    validateLinkedin = (values) => {
        if (values.trim > 0) {
            if (!/(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(values)) {
                isValidated = false;
                showMessage({
                    message: "Linkedin profile is not valid",
                    type: "danger",
                });
                return false;
            } else {
                return true
            }
        } else {
            return true
        }
    }
    validateUserName = (value) => {
        if (value.trim().length == 0) {
            isValidated = false;
            showMessage({
                message: "Name can't be empty",
                type: "danger",
            });
            return false;
        } else {
            return true
        }
    }
    handleSocialContactUpdate = (values) => {

        this.setState({
            showPopup: false
        })
        let { socialContactUpdateType } = this.state;
        if (socialContactUpdateType == 'email') {
            if (this.validatePersonalEmail(values)) {
                this.setState({
                    email: values
                })
                this.props.updateUserInfo({ email: values })
            }
        }
        else if (socialContactUpdateType == 'work-email') {
            if (this.validateProfessionalEmail(values)) {
                this.setState({
                    professionalEmail: values
                })
                this.props.updateUserInfo({ professionalEmail: values })
            }
        }
        else if (socialContactUpdateType == 'instagram') {
            if (this.validateInstagramLink(values)) {
                this.setState({
                    instaLink: values
                })
                this.props.updateUserInfo({ instaLink: values })
            }
        } else if (socialContactUpdateType == 'facebook') {
            if (this.validateFBLink(values)) {
                this.setState({
                    fbLink: values
                })
                this.props.updateUserInfo({ fbLink: values })
            }
        } else if (socialContactUpdateType == 'linkedin') {
            if (this.validateLinkedin(values)) {
                this.setState({
                    linkedinLink: values
                })
                this.props.updateUserInfo({ linkedinLink: values })
            }
        } else if (socialContactUpdateType == 'name') {
            if (this.validateUserName(values)) {
                this.setState({
                    name: values
                })
                this.props.updateUserInfo({ name: values })
            }
        } else if (socialContactUpdateType == 'aboutMe') {
            this.setState({
                aboutMe: values
            })
            this.props.updateUserInfo({ aboutMe: values })
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
            }, 500);
        })
    }
    validatePersonalInfo = () => {
        let isValidated = true;
        let { name, email,
            professionalEmail,
            emailError,
            linkedinLink,
            instaLink,
            fbLink
        } = this.state;

        if (name.trim().length == 0) {
            isValidated = false;
            showMessage({
                message: "Name can't be empty",
                type: "danger",
            });
            return isValidated;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            isValidated = false;
            showMessage({
                message: "Email is not valid",
                type: "danger",
            });
            return isValidated;
        } if (fbLink && fbLink.trim().length > 0) {
            if (!/(ftp|http|https):\/\/?(?:www\.)?facebook.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(fbLink)) {
                isValidated = false;
                showMessage({
                    message: "Facebook profile is not valid",
                    type: "danger",
                });
                return isValidated;
            }
        }
        if (linkedinLink && linkedinLink.trim().length > 0) {
            if (!/(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(linkedinLink)) {
                isValidated = false;
                showMessage({
                    message: "Linkedin profile is not valid",
                    type: "danger",
                });
                return isValidated;
            }
        } if (professionalEmail && professionalEmail.trim().length > 0) {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(professionalEmail)) {
                isValidated = false;
                showMessage({
                    message: "Professional Email is not valid",
                    type: "danger",
                });
                return isValidated;
            }
        }
        if (instaLink && instaLink.trim().length > 0) {
            var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

            if (urlregex.test(instaLink)) {
                isValidated = false;
                showMessage({
                    message: "Instgram username is not valid",
                    type: "danger",
                });
                return isValidated;
            }
        }
        return isValidated;

    }
    handleSubmit() {
        // console.log(data);
        //  console.log(this.validatePersonalInfo());
        //  if (this.validatePersonalInfo()) {
        this.props.updateUserInfo(this.state)
        //  }

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
            includeBase64: true,
            width: 150,
            height: 150,
            quality: 0.5,
            cropping: true
        }
        ImagePicker.openPicker(options).then(image => {
            if (image && image.data) {
                this.setState({
                    isImageChanged: true,
                    profImg_imageUrl: image
                })
                this.props.updateUserProfilePic({ profilePicture: image.data })
            }
        });
        // ImagePicker.openPicker(options, response => {
        //     // launchImageLibrary(options, response => {
        //     if (response.assets && response.assets[0].uri) {
        //         this.setState({
        //             isImageChanged: true,
        //             profImg_imageUrl: response.assets[0].uri
        //         })
        //         this.props.updateUserProfilePic({ profilePicture: response.assets[0].base64 })
        //     }
        // })
    }
    renderUserInfo = () => {
        return (
            <View>
                {this.renderProfileImage()}
                {this.renderSocialAndContactInfo()}
                {/* {this.renderBasicInfo()} */}
                {this.renderPersonalInfo()}
                {this.renderProfessionalInfo()}
                {/* {this.renderOtherInfo()} */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onPress={() => this.handleSubmit()}
                        title="Save"
                        TouchableOpacity={1}
                        buttonStyle={style.buttonStyle}
                    />
                </View>
            </View>
        )
    }
    renderProfileImage = () => {
        let { isImageChanged, profImg_imageUrl } = this.state;
        let { userInfo, } = this.props;
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

                                uri: isImageChanged ? `data:${profImg_imageUrl.mime};base64,${profImg_imageUrl.data}` : userInfo.profilePicture ? userInfo.profilePicture : 'no-img',
                            }}
                            overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                            showAccessory={true}
                            onEditPress={this.handleImageChange}
                            onPress={this.showImageFullSize}
                            size={100}
                        >
                            <Avatar.Accessory name="edit" onPress={this.handleImageChange}
                                type="font-awesome5"
                                size={20}
                                color={'black'}
                                style={{ backgroundColor: 'white' }}
                                containerStyle={{ backgroundColor: 'transparent' }}
                            />
                        </Avatar>
                    </View>
                    <View style={{ flex: 2 / 3 }}>

                        <TextInput
                            style={style.inputStyle}
                            editable={false}
                            value={userInfo.name}
                            onPressIn={() => this.showPopupModal('name', userInfo.name)}
                            onPressOut={() => this.showPopupModal('name', userInfo.name)}
                        />
                        <TextInput
                            style={style.inputStyle}
                            editable={false}
                            onPressIn={() => this.showPopupModal('aboutMe', userInfo.aboutMe)}
                            onPressOut={() => this.showPopupModal('aboutMe', userInfo.aboutMe)}
                            placeholder="Tell us about yourself "
                            multiline={true}
                            numberOfLines={Platform.OS === 'ios' ? null : 3}
                            minHeight={(Platform.OS === 'ios') ? (5 * 10) : null}
                            value={userInfo.aboutMe}

                        />

                    </View>

                </View>
                <View
                    style={style.horizontalDivider}
                />
            </View>
        )

    }
    renderSocialAndContactInfo = () => {
        let { phone, email, professionalEmail, instaLink, fbLink, linkedinLink, twitterLink, telegramLink } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.sectionHeader}>Social and Contact Info</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/V_Call.png')
                            }
                            // onPress={()=>this.showPopupModal('phone', item.contactId)}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Phone</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (email && email.trim().length) > 0 ? require('../../../assets/icons/V_PersonalEmail.png') : require('../../../assets/icons/BW_V_PersonalEmail.png')

                            }
                            onPress={() => this.showPopupModal('email', email)}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Email</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (professionalEmail && professionalEmail.trim().length) > 0 ? require('../../../assets/icons/V_WorkEmail.png') : require('../../../assets/icons/BW_V_WorkEmail.png')

                            }
                            onPress={() => this.showPopupModal('work-email', professionalEmail)}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Work Email</Text>
                    </View>
                    <View style={style.iconContainer}>

                        <Avatar
                            source={
                                (instaLink && instaLink.trim().length) > 0 ? require('../../../assets/icons/V_Instagram.png') : require('../../../assets/icons/BW_V_Instagram.png')
                            }
                            onPress={() => this.showPopupModal('instagram', instaLink)}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Instagram</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (fbLink && fbLink.trim().length) > 0 ? require('../../../assets/icons/V_Facebook.png') : require('../../../assets/icons/BW_V_Facebook.png')
                            }
                            onPress={() => this.showPopupModal('facebook', fbLink)}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Facebook</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                (linkedinLink && linkedinLink.trim().length) > 0 ? require('../../../assets/icons/V_LinkedIn.png') : require('../../../assets/icons/BW_V_LinkedIn.png')
                            }
                            onPress={() => this.showPopupModal('linkedin', linkedinLink)}
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
                            onPress={() => this.showPopupModal('twitter', twitterLink)}
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
                            onPress={() => this.showPopupModal('telegram', telegramLink)}
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
                        <View pointerEvents='none'>
                            <TextInput
                                style={style.inputStyle}
                                onPress={this.showDateTimePicker}
                                editable={false}
                                value={dob}
                            />
                        </View>
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
        let { dob, gender, homeLocation, currentLocation, relationshipStatus, hobbies } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.sectionHeader}>Personal Info</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={style.labelStyle}>Birthday</Text>
                    <View>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <View pointerEvents='none'>
                                <TextInput
                                    style={style.inputStyle}
                                    onPress={this.showDateTimePicker}
                                    editable={false}
                                    value={dob}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={style.labelStyle}>Gender</Text>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: -10,
                        marginBottom: -10

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
                    <Text style={style.labelStyle}>Relationship Status</Text>
                    <View style={{
                        //  width: Dimensions.get('window').width * 0.80,
                        // paddingLeft: 5,
                        paddingRight: 5,
                        // height: 40,
                        borderRadius: Platform.OS == 'ios' ? 2 : 0,
                        borderWidth: Platform.OS == 'ios' ? 0.1 : 0
                    }}>
                        <ModalSelector
                            data={relationshipStatusArray}
                            initValue="Select relationship status"
                            //   supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleRelationshipStatusChange(option.label) }}>

                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                placeholder="Select relationship status"
                                value={relationshipStatus} />

                        </ModalSelector>
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

                            value={homeLocation}
                            onChangeText={(text) => this.handlelHomeLocationChange(text)}

                        />
                    </View>
                    <View
                        style={style.horizontalDivider}
                    />
                </View>
            </View>
        );

        // return (
        //     <View style={{ marginTop: 10 }}>
        //         <Text style={style.labelStyle}>Intagram username</Text>
        //         <View>
        //             <TextInput
        //                 style={style.inputStyle}
        //                 editable={true}
        //                 value={instaLink}
        //                 onChangeText={(text) => this.handleInstaIDChange(text)}
        //             />
        //         </View>
        //         <Text style={style.labelStyle}>Facebook profile link</Text>
        //         <View>

        //             <TextInput
        //                 style={style.inputStyle}
        //                 editable={true}
        //                 value={fbLink}
        //                 onChangeText={(text) => this.handleFBLinkChange(text)}

        //             />


        //         </View>
        //         <Text style={style.labelStyle}>Hobbies/ Personal interest</Text>
        //         <View>

        //             <TextInput
        //                 style={style.inputStyle}
        //                 //  value={this.props.diagnostic_Tests_Ref}
        //                 editable={true}
        //                 value={hobbies}
        //                 onChangeText={(text) => this.handleHobbiesChange(text)}

        //             />


        //         </View>

        //         <Text style={style.labelStyle}>Relationship Status</Text>
        //         <View style={{
        //             //  width: Dimensions.get('window').width * 0.80,
        //             // paddingLeft: 5,
        //             paddingRight: 5,
        //             // height: 40,
        //             borderRadius: Platform.OS == 'ios' ? 2 : 0,
        //             borderWidth: Platform.OS == 'ios' ? 0.1 : 0
        //         }}>
        //             <ModalSelector
        //                 data={relationshipStatusArray}
        //                 initValue="Select relationship status"
        //                 //   supportedOrientations={['landscape']}
        //                 accessible={true}
        //                 scrollViewAccessibilityLabel={'Scrollable options'}
        //                 cancelButtonAccessibilityLabel={'Cancel Button'}
        //                 onChange={(option) => { this.handleRelationshipStatusChange(option.label) }}>

        //                 <TextInput
        //                     style={style.inputStyle}
        //                     editable={false}
        //                     placeholder="Select relationship status"
        //                     value={relationshipStatus} />

        //             </ModalSelector>
        //         </View>
        //     </View>)
    }
    renderProfessionalInfo = () => {
        let { userInfo, } = this.props;
        let { currentOrganization, previousOrganization, languages, professionalInterests, skills } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.sectionHeader}>Professional Info</Text>
                <View style={{ marginTop: 10 }}>


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
                </View>
            </View>)
    }
    renderOtherInfo = () => {
        let { currentLocation, homeLocation, languages, aboutMe } = this.state;
        return (
            <View style={{ marginTop: 10 }}>

            </View>)
    }
    render() {
        let { error, isLoading, userInfo, } = this.props;
        let { isImageChanged, profImg_imageUrl, email, title, inputType, placeholder, modalInputValue } = this.state;
        //   console.log(userInfo.profilePicture)
        //   console.log(this.state.name);
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                    <Icon type='material-community' name='refresh' size={40} color='black' onPress={() => {
                        this.props.fetchUserInfo()
                    }} />
                </View>

            )
        }
        // else if (isLoading || !this.props.userInfo) {
        //     return (
        //         <View
        //             style={{
        //                 flex: 1,
        //                 // padding: 20,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 backgroundColor: 'white',

        //             }}>
        //             <ActivityIndicator color='black' />
        //         </View >
        //     )
        // }
        else {
            return (
                <View
                    style={style.conatiner}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'handled'}
                        style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                    >
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={'handled'}
                            enableOnAndroid={true}
                            keyboardShouldPersistTaps={'handled'}
                            enableAutomaticScroll={(Platform.OS === 'ios')}
                        >
                            {this.state.showPopup && (
                                <ModalPopup closePopupModal={this.closePopupModal} handleSave={this.handleSocialContactUpdate} title={title} inputType={inputType} placeholder={placeholder} value={modalInputValue} />
                            )}
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
                                            source={{ uri: isImageChanged ? `data:${profImg_imageUrl.mime};base64,${profImg_imageUrl.data}` : userInfo.profilePicture ? userInfo.profilePicture : 'no-img', }}
                                        />
                                    </View>

                                </Modal>


                            }

                            <DateTimePickerModal
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                maximumDate={new Date()}
                            />
                            <Spinner color='grey'
                                visible={isLoading}
                            />

                            {userInfo && !this.state.showFullSizeImage &&
                                this.renderUserInfo()
                            }

                        </KeyboardAwareScrollView>

                    </ScrollView>
                </View >
            )
        }

    }
}
