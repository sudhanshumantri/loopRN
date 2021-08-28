import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
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
    }
    handleSubmit() {
        let data = {
            phone: this.state.phone,
            name: this.state.name,
            email: this.state.email,
            dob: this.state.dob,
            gender: this.state.gender,
            instaLink: this.state.instaLink,
            fbLink: this.state.fbLink,
            linkedinLink: this.state.linkedinLink
        }

        // console.log(data);
        this.props.updateUserInfo({
            phone: this.state.phone,
            name: this.state.name,
            email: this.state.email,
            dob: this.state.dob,
            gender: this.state.gender,
            instaLink: this.state.instaLink,
            fbLink: this.state.fbLink,
            linkedinLink: this.state.linkedinLink
        })
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

    renderProfileImage = () => {
        let { userInfo, } = this.props;
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                <Avatar
                    containerStyle={{ marginTop: -10 }}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                    // source={{
                    //     uri:
                    //         // 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                    //         userInfo.userbasicinfo ? imageBaseurl + userInfo.userbasicinfo.profile_photo_path : '',
                    // }}
                    overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                    showEditButton
                    //  onEditPress={this.handleImageChange}
                    // onPress={this.handleImageChange}
                    size={100}
                // onEditPress={this.showEditProfileModal}
                />
                <Text style={{ color: 'white', fontSize: 22, fontWeight: "bold" }}>{userInfo.name}</Text>
            </View>
        )

    }
    renderPersonalInfo = () => {
        let { userInfo, } = this.props;
        let { name, phone, email, dob, gender, linkedinLink, fbLink, instaLink } = this.state;
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, color: 'white', }}>Name*</Text>
                <View>
                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            borderColor: 'white',
                            color: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        editable={true}
                        value={name ? name : userInfo.name}
                        onChangeText={(text) => this.handleProfileChange('name', text)}
                    />
                </View>
                <Text style={{ fontSize: 18, color: 'white', }}>Phone*</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            borderColor: 'white',
                            color: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        editable={true}
                        value={String(phone ? phone : userInfo.phone)}
                        onChangeText={(text) => this.handleProfileChange('phone', text)}

                    />


                </View>
                <Text style={{ fontSize: 18, color: 'white', }}>Email*</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={email ? email : userInfo.email}
                        onChangeText={(text) => this.handleProfileChange('email', text)}

                    />


                </View>
                <Text style={{ fontSize: 18, color: 'white', }}>Birthday*</Text>
                <View>
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <TextInput
                            style={{
                                height: 40,
                                marginTop: 3,
                                borderRadius: 3,
                                color: 'white',
                                borderColor: 'white',
                                borderWidth: 0.5,
                                paddingLeft: 5
                            }}
                            onPress={this.showDateTimePicker}
                            editable={false}
                            value={dob ? dob : userInfo.dob}

                        //   onTouchStart={() => this.showSearchModal('care_Plans_Suggested')}
                        // onChangeText={(text) => this.props.handleDiaganosticTestReferenceChange(text)}
                        />
                    </TouchableOpacity>


                </View>

                <Text style={{ fontSize: 18, color: 'white', }}>Gender*</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: -10
                }}>
                    <CheckBox
                        title='Male'
                        checked={gender ? (gender == 'male' ? true : false) : (userInfo.gender == 'male' ? true : false)}
                        textStyle={{ marginLeft: -1, color: 'white' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'male')}
                        checkedColor='#2DB38D'
                    />
                    <CheckBox
                        title='Female'
                        checked={gender ? (gender == 'female' ? true : false) : (userInfo.gender == 'female' ? true : false)}
                        textStyle={{ marginLeft: -1, color: 'white' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'female')}
                        checkedColor='#2DB38D'
                    />
                    <CheckBox
                        title='Other'
                        checked={gender ? (gender == 'other' ? true : false) : (userInfo.gender == 'other' ? true : false)}
                        textStyle={{ marginLeft: -1, color: 'white' }}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -1 }}
                        onPress={() => this.handleProfileChange('gender', 'other')}
                        checkedColor='#2DB38D'
                    />
                </View>
                {/* <Text style={{ fontSize: 18, color: 'white', }}>Current Location*</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value="Sudhanshu Kumar"
                        //   onTouchStart={() => this.showSearchModal('care_Plans_Suggested')}
                        // onChangeText={(text) => this.props.handleDiaganosticTestReferenceChange(text)}
                        placeholder='Enter Diagnostic Test Reference'
                    />


                </View> */}
                <Text style={{ fontSize: 18, color: 'white', }}>LinkedIn Profile</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            borderColor: 'white',
                            color: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}

                        value={linkedinLink ? linkedinLink : userInfo.linkedinLink}
                        onChangeText={(text) => this.handleProfileChange('linkedinLink', text)}
                    />


                </View>
                <Text style={{ fontSize: 18, color: 'white', }}>Insta Username</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            borderColor: 'white',
                            color: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={userInfo.instaLink}
                        value={instaLink ? instaLink : userInfo.instaLink}
                        onChangeText={(text) => this.handleProfileChange('instaLink', text)}
                    />


                </View>
                <Text style={{ fontSize: 18, color: 'white', }}>FB Profile Link</Text>
                <View>

                    <TextInput
                        style={{
                            height: 40,
                            marginTop: 3,
                            borderRadius: 3,
                            borderColor: 'white',
                            color: 'white',
                            borderWidth: 0.5,
                            paddingLeft: 5
                        }}
                        //  value={this.props.diagnostic_Tests_Ref}
                        editable={true}
                        value={userInfo.fbLink}
                        value={fbLink ? fbLink : userInfo.fbLink}
                        onChangeText={(text) => this.handleProfileChange('fbLink', text)}
                    />


                </View>

            </View>)
    }
    render() {
        let { error, isLoading, userInfo, } = this.props;
        console.log(isLoading)
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    <Icon type='material-community' name='refresh' size={40} color='white' onPress={() => {
                        this.props.fetchUserInfo()
                    }} />
                </View>

            )
        }
        // else if (isLoading) {
        //     return (
        //         <View
        //             style={{
        //                 flex: 1,
        //                 // padding: 20,
        //                 justifyContent: 'center',
        //                 backgroundColor: '#2DB38D',

        //             }}>
        //             <ActivityIndicator color='white' />
        //         </View >
        //     )
        // } 
        else {
            return (
                <View
                    style={{
                        flex: 1,
                        // padding: 20,
                        paddingLeft: 5,
                        paddingRight: 5,
                        backgroundColor: '#6b3871',
                        justifyContent: 'center'

                    }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 10 }}
                    >
                        <DateTimePickerModal
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            maximumDate={new Date()}
                        />
                        {this.renderProfileImage()}
                        {this.renderPersonalInfo()}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                onPress={() => this.handleSubmit()}
                                title="Save"
                                TouchableOpacity={1}
                                buttonStyle={{ width: 300, marginTop: 20 }}
                            />
                        </View>
                    </ScrollView>
                </View >
            )
        }

    }
}
