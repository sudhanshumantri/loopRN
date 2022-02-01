import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Input, Avatar, Button, CheckBox, Icon, } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
import Contacts from 'react-native-contacts';
import ModalPopup from '../Shared/ModalPopup/index';
import ModalSelector from 'react-native-modal-selector'
import style from './scanStyle'
import {
    TouchableOpacity,
    Text,
    SafeAreaView,
    Platform,
    View,
    TextInput,
    ScrollView,
    PermissionsAndroid
} from 'react-native';

import {
    Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';
let index = 0;
const feelingtatusArray = [
    { key: index++, label: 'Happy' },
    { key: index++, label: 'Excited' },
    { key: index++, label: 'Motivating' },
    { key: index++, label: 'Boring', },
    { key: index++, label: 'Not Interested', },
];
Geocoder.init("AIzaSyChteq7t9y3jVwV3_4zHkNHiGS5xecp1xM");
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
export default class QRCodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: true,
            ScanResult: false,
            result: null,
            showPopup: false,
            placeholder: '',
            title: '',
            inputType: '',
            modalInputValue: '',
            location: ''
        };
    }
    componentDidMount() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
               // console.log(location.latitude, location.longitude);
                Geocoder.from(location.latitude, location.longitude)
                    .then(json => {
                        let locationName = json.results[0].address_components[0].short_name + ',' + json.results[0].address_components[1].short_name
                        this.setState({
                            location: locationName
                        })
                        // console.log(json.results[0].address_components[1].short_name);
                        // var addressComponent = json.results[0].address_components[0].short_name;
                        // console.log(addressComponent);
                    })
                    .catch(error => console.warn(error));
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    showPopupModal = (type, value) => {
        let title = '';
        let placeholder = '';
        let inputType = 'email';

        if (type == 'notes') {
            title = 'Enter Notes';
            placeholder = 'Enter Notes';

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
    handleContactUpdates = (values) => {
        this.setState({
            showPopup: false
        })
    }
    closePopupModal = () => {
        this.setState({
            showPopup: false
        })
    }
    onSuccess = (e) => {
        // const check = e.data.substring(0, 4);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true,
            location: this.state.location
        })
    this.props.validateQRCode({ phone: e.data,location:this.state.location })
        //this.props.validateQRCode({ phone: '8861909294',location: this.state.location })

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    openContactPicker = async () => {
        let userInfo = this.props.qrCodeData.userDetails
        var newPerson = {
            emailAddresses: [{
                label: "personal",
                email: userInfo.email,
            },
            ], phoneNumbers: [{
                label: "mobile",
                number: String(userInfo.phone),
            }],
            displayName: userInfo.name,
            givenName: userInfo.name
        }
        try {
            
            if (Platform.OS === 'android') {
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
                        if (contact) {
                            this.props.navigation.navigate('Home');
                            showMessage({
                                message: "Contact saved successfully",
                                type: "success",
                            });
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                } else {
                    console.log("contacts permission denied");
                }
            } else {
                Contacts.openContactForm(newPerson).then(contact => {
                    if (contact) {
                        this.props.navigation.navigate('Home');
                        showMessage({
                            message: "Contact saved successfully",
                            type: "success",
                        });
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
        catch (err) {
            console.warn(err);
        }
    };

    exchangeContact = () => {
        this.props.exchangeContact({ userDetailsId: this.props.qrCodeData.userDetails._id })
    }
    showFeelingModal = () => {
        this.setState({
            showFeelingModal: true
        })
    }
    handleNotesUpdate = () => {
        this.props.updateContactInfo()
    }
    handleModalInfoSave = (type, value) => {
        let contactInfo = this.props.qrCodeData.contactDetails
        let data = {
            contactId: contactInfo._id,
            type,
            val: value
        }
        this.props.updateContactInfo(data)
        this.setState({
            showPopup: false
        })

    }
    renderProfileImage = () => {
        let userInfo = this.props.qrCodeData.userDetails;
        console.log(this.props.qrCodeData);
        return (
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <Avatar
                    //  containerStyle={{ marginTop: -10 }}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                    icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                    source={{
                        uri:
                            userInfo.profilePicture ? userInfo.profilePicture : 'no-img',
                    }}
                    overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                    showEditButton
                    //  onEditPress={this.handleImageChange}
                    // onPress={this.handleImageChange}
                    size={100}
                // onEditPress={this.showEditProfileModal}
                />
                <Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>{userInfo.name}</Text>
                <Text>{userInfo.aboutMe}</Text>
            </View>
        )

    }
    renderPersonalInfo = () => {
        let userInfo = this.props.qrCodeData;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={style.labelStyle}>Phone*</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        editable={false}
                        value={String(userInfo.phone)}
                    />
                </View>
                <Text style={style.labelStyle}>Email*</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={userInfo.email}

                    />
                </View>
                <Text style={style.labelStyle}>Birthday*</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}

                        editable={false}
                        value={userInfo.dob}
                    />
                </View>

                <Text style={style.labelStyle}>Gender*</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: -10
                }}>
                    <CheckBox
                        title='Male'
                        checked={userInfo.gender == 'male' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}

                        checkedColor='black'
                    />
                    <CheckBox
                        title='Female'
                        checked={userInfo.gender == 'female' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}

                        checkedColor='black'
                    />
                    <CheckBox
                        title='Other'
                        checked={userInfo.gender == 'other' ? true : false}
                        textStyle={{ marginLeft: -1, color: 'black' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        // onPress={() => this.handleProfileChange('gender', 'other')}
                        checkedColor='black'
                    />
                </View>
                <Text style={style.labelStyle}>LinkedIn Profile</Text>
                <View>
                    <TextInput
                        style={style.inputStyle}
                        value={userInfo.linkedinLink}

                    />
                </View>
                <Text style={style.labelStyle}>Insta Username</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={userInfo.instaLink}
                    />


                </View>
                <Text style={style.labelStyle}>FB Profile Link</Text>
                <View>

                    <TextInput
                        style={style.inputStyle}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={false}
                        value={userInfo.fbLink}
                        value={userInfo.fbLink}

                    />


                </View>

            </View>)
    }
    renderQRCodeSuccessData = () => {
        return (<View style={style.postScanContainer}>
            <View style={style.postScannerHolder}>
                <Text style={style.textTitle}>Looped In</Text>
                {this.renderProfileImage()}
                <View style={style.horizontalDivider} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    {!this.props.userSharingInfo.contactExchange && (
                        <Button
                            onPress={() => this.exchangeContact()}
                            title="Exchange Contact"
                            TouchableOpacity={1}
                            buttonStyle={style.buttonStyle}
                            titleStyle={{ fontWeight: '600', fontSize: 12 }}
                        />
                    )}
                    <Button
                        onPress={() => this.openContactPicker()}
                        title="Add To Phone Contact"
                        TouchableOpacity={1}
                        buttonStyle={style.buttonStyle}
                        titleStyle={{ fontWeight: '600', fontSize: 12 }}
                    />

                </View>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Button
                    type="outline"
                    onPress={() => this.showPopupModal('notes')}
                    title="Add A Note"
                    buttonStyle={style.personalNoteButtonStyle}
                    titleStyle={{ fontWeight: '600', color: 'black' }}
                />
                <ModalSelector
                    data={feelingtatusArray}
                    // visible={this.state.showFeelingModal}
                    initValue="Select how you feeling about this connect"
                    //   supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.handleModalInfoSave('feeling', option.label) }}>

                    <Button
                        type="outline"
                        // onPress={() => this.openContactPicker()}
                        title="Add A Feeling"

                        buttonStyle={style.personalNoteButtonStyle}
                        titleStyle={{ fontWeight: '600', color: 'black' }}
                    />
                </ModalSelector>

            </View>
            {/* {this.renderPersonalInfo()} */}
            {/* <View>
                <Button
                    onPress={() => this.openContactPicker()}
                    title="Add to Contacts"
                    TouchableOpacity={1}
                    buttonStyle={style.buttonStyle}
                />
            </View> */}

        </View>)
    }
    renderQRCodeFailureData = () => {
        let { qrCodeData, isLoading, error } = this.props;
        return (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>{error}</Text>
            <Button onPress={this.activeQR} title="Scan Again" buttonStyle={{ width: 200, backgroundColor: 'black', borderRadius: 5 }} />
            {/* <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
            </TouchableOpacity> */}
        </View>)
    }

    render() {
        // let { isImageChanged, profImg_imageUrl, email, title, inputType, placeholder, modalInputValue } = this.state;
        const { scan, ScanResult, result, itle, inputType, placeholder, modalInputValue, title } = this.state;
        let { qrCodeData, isLoading, error } = this.props;
        return (

            <SafeAreaView style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',

            }}>
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 10 }}
                > */}

                <Spinner color='grey'
                    visible={isLoading}
                />
                {!scan && !error && qrCodeData && !isLoading && (
                    this.renderQRCodeSuccessData()
                )}
                {!scan && error && !qrCodeData && (
                    this.renderQRCodeFailureData()
                )}
                {this.state.showPopup && (
                    <ModalPopup closePopupModal={this.closePopupModal} handleSave={(text) => this.handleModalInfoSave('notes', text)} title={title} inputType={inputType} placeholder={placeholder} value={modalInputValue} />
                )}
                {scan &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={style.textTitle}>
                            Scan a Loop Code</Text>

                        <View style={style.horizontalDivider} />
                        {/* <Button title='click me' onPress={this.onSuccess} /> */}
                        <QRCodeScanner
                            cameraStyle={{ width: 'auto', height: 300, margin: 'auto' }}
                            reactivate={true}
                            cameraProps={{ captureAudio: false }}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                        />
                    </View>
                }

                {/* </ScrollView> */}
            </SafeAreaView>


        );
    }
}
