import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import styles from './style';
import style from './style';
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
                <Text style={style.headerText}>Manage your sharing preferences</Text>
                
                <CheckBox
                    title='Name*'
                    checked={true}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    //onPress={() => this.handleInformationChange('name')}
                     checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='Phone No.*'
                    checked={true}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                 //   onPress={() => this.handleInformationChange('phone')}
                     checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='Personal Email*'
                    checked={true}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                   // onPress={() => this.handleInformationChange('email')}
                     checkedColor={styles.checkedColor}
                />
                {/* <CheckBox
                    title='Photo'
                    checked={true}
                    textStyle={styles.checkTextColor}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    // onPress={() => this.props.handleDosageChange(medicineIndex, index, 'morning')}
                     checkedColor={styles.checkedColor}
                /> */}
                {/* <CheckBox
                    title='Current Location'
                    // checked={dosage.frequency.morning}
                    textStyle={styles.checkTextColor}
                    containerStyle={{ backgroundColor: 'black', borderWidth: 0, }}
                    // onPress={() => this.props.handleDosageChange(medicineIndex, index, 'morning')}
                     checkedColor={styles.checkedColor}
                /> */}
                <CheckBox
                    title='Birthday'
                    checked={userSharingInfo.dob}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    onPress={() => this.handleInformationChange('dob')}
                    checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='Gender'
                    checked={userSharingInfo.gender}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    onPress={() => this.handleInformationChange('gender')}
                     checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='LinkedIn Profile'
                    checked={userSharingInfo.linkedinLink}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    onPress={() => this.handleInformationChange('linkedinLink')}
                     checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='Insta Username'
                    checked={userSharingInfo.instaLink}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    onPress={() => this.handleInformationChange('instaLink')}
                     checkedColor={styles.checkedColor}
                />
                <CheckBox
                    title='FB Profile Link'
                    checked={userSharingInfo.fbLink}
                    textStyle={styles.checkTextColor}
                    containerStyle={styles.checkboxesContainerStyle}
                    onPress={() => this.handleInformationChange('fbLink')}
                    checkedColor={styles.checkedColor}
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
