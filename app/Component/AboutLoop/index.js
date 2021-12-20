import React from 'react';
import { View, Text, TextInput, Image, Dimensions, TouchableOpacity, Linking, PermissionsAndroid, Platform, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { ListItem, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import style from './style';

export default class AboutLoop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        // let { error, isLoading, userInfo, } = this.props;
        let { expanded } = this.state;
        return (
            <View
                style={style.conatiner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 10, marginTop: 20, paddingLeft: 10, paddingRight: 10 }}
                >
                    <Text style={style.titleStyle}>Our Vision</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>With the introduction of digital technologies and platforms, we have been increasingly moving away from
                        the concept of a ‘society’ and towards ‘individuality’. Social media introduced itself as the panacea that will
                        create an interconnected world but failed to build real connections. Today, we find it difficult to build new
                        relationships and our fast-paced life makes it burdensome to maintain existing ones.</Text>
                    <Text>With Loop, we want to rebuild the society by means of facilitating human connections. As others move to
                        create virtual worlds and metaverses, we want to facilitate real world interactions by leveraging
                        technology only as means to an end and not as end itself.</Text>

                    <Text style={style.titleStyle}>Home</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>The home screen shows your Loop code that can be scanned by other users to “Loop you in”. You can use
                        the options on the side to switch between profiles (All, Personal, Professional or your customized bucket)
                        to ensure you share only what you want to share. Alternatively, you can scan another user’s QR code to
                        Loop them in. Use the bottom bar to navigate through the app and the top-right button takes you to
                        ‘Help’.</Text>

                    <Text style={style.titleStyle}>App Overview</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>This app is the first offering in our attempt to facilitate lasting human connections. We are focusing on
                        quick sharing of contact details so that even a brief interaction creates possibilities for further relations.
                        We do this by encrypting your personal, professional and social media details into a QR code for you to
                        share these in fraction of a second. To ensure you never lose connection, the app automatically updates
                        any change in details that your connections (or Loops, as we call them) make on real time basis.</Text>

                    <Text style={style.titleStyle}>Loops</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text style={style.titleStyle}>Looping In:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>You can scan another user’s Loop code using scanner available on the home screen. You can
                        choose to immediately save their details to phone contact or even otherwise, the details will be saved on
                        the app. You can always save to phone later. The app allows you to ‘Add a Note’ to remember the person
                        and ‘Add a Feeling’ to recall how you felt when you met them. Again, you can choose to fill these later.</Text>
                    <Text style={style.titleStyle}>Search Loops:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>You can type any keyword, which can be name, college, company, skill, etc., to search for
                        relevant Loops.
                    </Text>
                    <Text style={style.titleStyle}>Permission Setting:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>You can choose what details are shared with any of your Loops at any time. Use this
                        option to allow your Loops to get more details about you or restrict some information that you do not
                        want shared anymore. If you had not ‘exchanged’ contact while looping them in, this is how you can share
                        your details later.
                    </Text>
                    <Text>You can individually pick and choose contact details to share/not share or do so with a bucket (such as
                        Personal or Professional) of details. If you want to block the contact from seeing any of your information,
                        just turn ‘Contact Sharing’ off with one tap. And finally, do not forget to tap ‘Save’.</Text>
                    <Text style={style.titleStyle}>Accessing Details:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>Loop works as a one-tap portal for the users’ contact access. Tap on any on the icons to
                        access the respective link. Call them by tapping the Call icon under your Loops’ profiles, visit their
                        Instagram, LinkedIn and so on.
                    </Text>
                    <Text style={style.titleStyle}>Profile:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>You can type any keyword, which can be name, college, company, skill, etc., to search for
                        relevant Loops.
                    </Text>
                    <Text style={style.titleStyle}>Edit Details:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>Loops allows a quick sign-up process with minimum requirements; however, you will unlock
                        the true potential of the app by putting as many details as possible to provide your Loops a single source
                        for all your contact needs. Some of the details will need verification through OTP sent on phone number or
                        email ID. Any contact details that you update will be reflected for anyone who has looped you in – a key
                        feature that ensures you never lose a connection. Contact details may change but once you update the
                        same in Loop, all your Loops can see the update.
                    </Text>
                    <Text style={style.titleStyle}>Qualitative Info:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>For qualitative information such as personal interests and skills, please mention one after
                        the other separated by a comma. And again, remember to save the details.</Text>

                    <Text style={style.titleStyle}>Settings</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text style={style.titleStyle}>Contact Exchange:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>Keeping this on will reduce a few steps for you. If turned on, your contact details will
                        automatically get shared with anyone whose Loop code you scan. If turned off, you will get an ‘Exchange
                        Contact’ option once you scan someone’s Loop code and by clicking you can share your contact details.
                        Remember to select the appropriate bucket before scanning a Loop code or asking someone to scan yours.
                        The exchange will work on the bucket that is selected.</Text>
                    <Text style={style.titleStyle}>Customize a Profile:</Text>
                    <View style={style.horizontalDivider}></View>
                    <Text>Apart from All, Personal and Professional buckets, the app allows you to create a
                        bucket of your own. Please add the details of your choice here to share as and when needed.</Text>
                </ScrollView>
            </View >
        )
    }
}
