import React from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, Dimensions, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
            showFullSizeImage: false

        }
    }
    componentDidMount() {
        console.log(this.props.route.params.userInfo);
        this.setState({
            userInfo: this.props.route.params.userInfo
        })

    }

    handleSubmit() {
        // console.log(data);
        //  console.log(this.validatePersonalInfo());
        if (this.validatePersonalInfo()) {
            this.props.updateUserInfo(this.state)
        }

    }
    renderContactSharingToggle = () => {
        return (<View>
            <View style={style.flexToggleRootContainer}>
                <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Icon type='font-awesome' name='exchange' size={30} style={{ marginRight: 10 }} />
                    <Text style={style.titleStyle}>Contact Exchange</Text>
                </View>

                <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={false} color="orange" /></View>
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
                        <Text>(Bio) Hey! My first name is FirstName and last name is LastName. Text me on WhatsApp for quick response.</Text>
                    </View>

                </View>
                <View
                    style={style.horizontalDivider}
                />
            </View>
        )

    }
    renderSocialAndContactInfo = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Social and Contact Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={false} color="orange" /></View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/Call.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Phone</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/PersonalEmail.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Email</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/WorkEmail.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Work Email</Text>
                    </View>
                    <View style={style.iconContainer}>

                        <Avatar
                            source={
                                require('../../../assets/icons/Instagram.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Instagram</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/Facebook.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Facebook</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/LinkedIn.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>LinkedIn</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/Twitter.png')
                            }
                            // onPress={this.handleImageChange}
                            size={60}
                        >
                        </Avatar>
                        <Text style={style.iconLabel}>Twitter</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <Avatar
                            source={
                                require('../../../assets/icons/Telegram.png')
                            }
                            // onPress={this.handleImageChange}
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
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Social and Contact Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={false} color="orange" /></View>
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
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Relationship Status'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch value={false} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Hobbies/ Personal interest'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
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
        let { userInfo, } = this.props;
        let { currentOrganization, previousOrganization, languages, professionalInterests, skills } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <View style={style.flexToggleRootContainer}>
                    <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.titleStyle}>Professional Info</Text>
                    </View>

                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={false} color="orange" /></View>
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
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
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
                            <Switch value={false} color="orange" />
                        </View>
                    </View>
                    <View style={style.flexToggleRootContainer}>
                        <View style={{ flex: 4 / 5 }}>
                            <TextInput
                                style={style.inputStyle}
                                editable={false}
                                value='Languages you speak'
                            />
                        </View>
                        <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Switch value={false} color="orange" />
                        </View>
                    </View>
                    <View
                        style={style.horizontalDivider}
                    />
                </View>
            </View>
        )
    }
    render() {
        // let { error, , userInfo, } = this.props;
        let { isImageChanged, profImg_imageUrl, userInfo, isLoading } = this.state;
        console.log(userInfo)
        //   console.log(this.state.name);
        return (
            <View
                style={style.conatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}
                >
                    {/* {this.state.showFullSizeImage &&
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
                                    source={{ uri: isImageChanged ? profImg_imageUrl : userInfo.profilePicture ? userInfo.profilePicture : 'no-img', }}
                                />
                            </View>

                        </Modal>


                    } */}
                    <Spinner color='grey'
                        visible={isLoading}
                    />

                    {userInfo && !this.state.showFullSizeImage &&
                        this.renderUserInfo()
                    }
                </ScrollView>
            </View >
        )
    }
}
