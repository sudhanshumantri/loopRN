import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
export default class InformationSharing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: undefined,
            email: undefined,
            fbLink: undefined,
            gender: undefined,
            instaLink: undefined,
            linkedinLink: undefined,
            name: undefined,
            phone: undefined,
            isChanged: false
        }
    }
    componentDidMount() {
        //  console.log('did mount', this.props.sharingInfo)
        this.setState(this.props.sharingInfo);
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            if (this.state.isChanged) {
                this.props.updateUserSharingInfo(this.state)
            }
            // do something
        });
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState(this.props.sharingInfo);
            // do something
        });
    }
    handleInformationChange = (type) => {
        let userSharingInfo = this.state
        if (type == 'name') {
            this.setState({
                name: !userSharingInfo.name,
                isChanged: true
            })
        } else if (type == 'email') {
            this.setState({
                email: !userSharingInfo.email,
                isChanged: true
            })
        } else if (type == 'phone') {
            this.setState({
                phone: !userSharingInfo.phone,
                isChanged: true
            })
        } else if (type == 'fbLink') {
            this.setState({
                fbLink: !userSharingInfo.fbLink,
                isChanged: true
            })
        } else if (type == 'instaLink') {
            this.setState({
                instaLink: !userSharingInfo.instaLink,
                isChanged: true
            })
        } else if (type == 'linkedinLink') {
            this.setState({
                linkedinLink: !userSharingInfo.linkedinLink,
                isChanged: true
            })
        } else if (type == 'gender') {
            this.setState({
                gender: !userSharingInfo.gender,
                isChanged: true
            })
        }else if (type == 'dob') {
            this.setState({
                dob: !userSharingInfo.dob,
                isChanged: true
            })
        }

    }
    renderInformationSharing = () => {
        let userSharingInfo = this.state
        return (
            <View>
                <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', fontWeight: 'bold',marginBottom:20 }}>Manage your sharing preferences</Text>
                
                <CheckBox
                    title='Name*'
                    checked={true}
                    textStyle={{ color:'white'}}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    //onPress={() => this.handleInformationChange('name')}
                    checkedColor='white'
                />
                <CheckBox
                    title='Phone No.*'
                    checked={userSharingInfo.phone}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                 //   onPress={() => this.handleInformationChange('phone')}
                    checkedColor='white'
                />
                <CheckBox
                    title='Personal Email*'
                    checked={true}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                   // onPress={() => this.handleInformationChange('email')}
                    checkedColor='white'
                />
                {/* <CheckBox
                    title='Photo'
                    checked={true}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    // onPress={() => this.props.handleDosageChange(medicineIndex, index, 'morning')}
                    checkedColor='white'
                /> */}
                {/* <CheckBox
                    title='Current Location'
                    // checked={dosage.frequency.morning}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    // onPress={() => this.props.handleDosageChange(medicineIndex, index, 'morning')}
                    checkedColor='white'
                /> */}
                <CheckBox
                    title='Birthday'
                    checked={userSharingInfo.dob}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    onPress={() => this.handleInformationChange('dob')}
                    checkedColor='white'
                />
                <CheckBox
                    title='Gender'
                    checked={userSharingInfo.gender}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    onPress={() => this.handleInformationChange('gender')}
                    checkedColor='white'
                />
                <CheckBox
                    title='LinkedIn Profile'
                    checked={userSharingInfo.linkedinLink}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    onPress={() => this.handleInformationChange('linkedinLink')}
                    checkedColor='white'
                />
                <CheckBox
                    title='Insta Username'
                    checked={userSharingInfo.instaLink}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    onPress={() => this.handleInformationChange('instaLink')}
                    checkedColor='white'
                />
                <CheckBox
                    title='FB Profile Link'
                    checked={userSharingInfo.fbLink}
                    textStyle={{ color:'white' }}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    onPress={() => this.handleInformationChange('fbLink')}
                    checkedColor='white'
                />
            </View>

        )
    }
    render() {
        //   console.log(this.state)
        return (
            <View
                style={{
                    flex: 1,
                    // padding: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: 'white',

                }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 10 }}
                >
                    {this.renderInformationSharing()}
                </ScrollView>
            </View >
        )

    }
}
