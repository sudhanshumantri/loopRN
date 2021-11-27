import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Input, Avatar, Button, CheckBox, Icon, } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
import Contacts from 'react-native-contacts';
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

export default class QRCodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: true,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        this.props.validateQRCode({ phone: e.data })

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
        let userInfo = this.props.qrCodeData;
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
    renderProfileImage = () => {
        let userInfo = this.props.qrCodeData;
        return (
            <View style={{ alignItems: 'center',marginBottom:10  }}>
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
                <Text style={{ color: 'black', fontSize: 22, fontWeight: "bold" }}>{userInfo.name}</Text>
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
                <Text style={style.textTitle}>Loop In</Text>
                {this.renderProfileImage()}
                <View style={{ flexDirection: 'row',justifyContent:'space-around',marginBottom:10}}>
                    <Button
                        onPress={() => this.openContactPicker()}
                        title="Exchange Contact"
                        TouchableOpacity={1}
                        buttonStyle={style.buttonStyle} 
                        titleStyle={{ fontWeight:'600', fontSize: 12 }}
                        />
                    <Button
                        onPress={() => this.openContactPicker()}
                        title="Add To Phone Contact"
                        TouchableOpacity={1}
                        buttonStyle={style.buttonStyle} 
                        titleStyle={{ fontWeight:'600', fontSize: 12 }}
                        />

                </View>
                <View style={style.horizontalDivider}/>

            </View>
            <View style={{ flexDirection: 'row',marginTop:30  }}>
                    <Button
                        type="outline"
                        onPress={() => this.openContactPicker()}
                        title="Add A Note"
                        buttonStyle={style.personalNoteButtonStyle} 
                        titleStyle={{ fontWeight:'600', color:'black' }}
                        />
                    <Button
                        type="outline"
                        onPress={() => this.openContactPicker()}
                        title="Add A Feeling"
                       
                        buttonStyle={style.personalNoteButtonStyle} 
                        titleStyle={{ fontWeight:'600', color:'black' }}
                        />

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
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{error}</Text>
            <Button onPress={this.activeQR} title="Click to Scan again!" buttonStyle={{ width: 200, backgroundColor: 'black', borderRadius: 5 }} />
            {/* <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
            </TouchableOpacity> */}
        </View>)
    }

    render() {
        const { scan, ScanResult, result } = this.state;
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

                {scan &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={style.textTitle}>
                            Scan a Loop Code</Text>
                        <View style={style.horizontalDivider} />
                        <QRCodeScanner
                            cameraStyle={{ width: 'auto', height: 300, margin: 'auto' }}
                            reactivate={true}
                            cameraProps={{ captureAudio: false }}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                        // topContent={
                        //     <View>
                        //         <Text >
                        //             Scan a Loop Code</Text>
                        //         <View style={style.horizontalDivider}/>  
                        //     </View>
                        // }

                        />
                    </View>
                }

                {/* </ScrollView> */}
            </SafeAreaView>


        );
    }
}
