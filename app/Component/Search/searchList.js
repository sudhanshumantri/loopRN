import React from 'react';
import { View, StyleSheet, ScrollView, Picker, FlatList, Text, ActivityIndicator, TouchableOpacity, SafeAreaView, Dimensions, Modal, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { Rating, Input, Card, Icon, Avatar, CheckBox, Divider, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import OutgoingRequestModal from '../Modal/outGoingRequestModal';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import store from '../../Store';
import { outGoingCallRequest } from '../../Actions/chat';
const imageBaseurl = 'https://aapkadoctorbs.blob.core.windows.net/files/'

import FilteringModal from './filter';

const styles = StyleSheet.create({
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        //   fontWeight: 'bold',
        //  width:200
    },
    picker: {
        width: 100
    },
})
//import Icon from "react-native-vector-icons/MaterialIcons";
export default class SearchList extends React.Component {
    constructor() {
        super()
        this.state = {

            rel_type: 'Father',
            //personal info start
            firstName: '',
            firstNameError: '',
            middleName: '',
            lastName: '',
            lastNameError: '',
            dob: '',
            dobError: '',
            age: '',
            ageError: '',
            gender: 'male',
            height: '',
            heightError: '',
            weight: '',
            weightError: '',
            dobResponse: '',
            showFilteringModal: false,
            selectedFilterView: 'price',
            type: 'all',
            showOutgoingModal: false,
            showRelativesModal: false,
            showAddRelativesModal: false,
            showMembershipModal: false,
            relativeId: 'self',
            membershipId: 'online',
            serviceType: null,
            cost: '',
            doctorId: null,
            isBookingRequested: false,
            userId: null,
            token: '',
            filters: {
                minfees: null,
                maxfees: null,
                minrating: null,
                maxrating: null
            }

        }
    }
    componentDidMount() {
        let config = this.props.navigation.state.params.config;
        //  console.log('-serach consultants ', config);
        this.setState({
            config
        })
        this.bootstrapAsyncUserToken().then(info => {
            this.setState({
                userId: info.guid,
                token: info.token
            })
        });
        let data = {
            config,
            filters: this.state.filters
        }
        this.props.fetchResults(data);
        //  this.fetchConsultants(null);
        this.props.fetchUserRelative();
        this.props.fetchUserMembershipPlan();
    }
    fetchConsultants = (appliedFilters) => {
        let filters = {};
        if (appliedFilters) {
            filters = appliedFilters;
        } else {
            filters = this.state.filters;
        }
        let { config } = this.state;
        let data = {
            config,
            filters
        }
        this.props.fetchResults(data);
    }
    bootstrapAsyncUserToken = async () => {
        return {
            guid: await AsyncStorage.getItem('guid'),
            token: await AsyncStorage.getItem('token')

        };
    };
    //relative modal
    closeRelativeModal = () => {
        this.setState({
            showRelativesModal: false,
            relativeId: 'self'
        })
    }
    hanldeBookingProcessing = (serviceType, guid, cost) => {
        this.setState({
            // showRelativesModal: true,
            serviceType,
            doctorId: guid,
            cost
        })
        let { userRelativesInfo, userMembershipPlan } = this.props;

        //  if (userRelativesInfo && userRelativesInfo.length > 0) {
        this.showRelativeModal();
        // } else {
        //     if (userMembershipPlan && userMembershipPlan.length) {

        //         this.showMemberShipModal();

        //     } else {
        //         this.bookAppointment()
        //     }
        //     //check for membership,if its there then ask them to 
        // }
        //open relative modal only if user has relatives
    }
    showRelativeModal = () => {

        //check for relative,if its not there,show member ship modal
        //if membership is also not there,proceed to pay online 
        this.setState({
            showRelativesModal: true,

        })
    }
    handleNext = () => {
        this.setState({
            showRelativesModal: false,
            showMembershipModal: true
        })
    }
    selectRelative = (id) => {
        this.setState({
            relativeId: id,
        })
    }
    showAddFamilyMemberModal = () => {
        this.setState({
            showAddRelativesModal: true,
            showRelativesModal: false,
        })
    }
    closeAddFamilyMemberModal = () => {
        this.setState({
            showAddRelativesModal: false,
            showRelativesModal: true,
        })
    }

    validatePersonalInfo = () => {
        let isValidated = true;
        let { firstName,
            lastName, middleName,
            userId,
            dob,
            age,
            height, weight } = this.state;
        if (firstName == '') {
            isValidated = false;
            this.setState({
                firstNameError: 'Please Enter First Name'
            })
        }
        if (lastName == '') {
            isValidated = false;
            this.setState({
                lastNameError: 'Please Enter Last Name'
            })
        }

        if (dob == '') {
            isValidated = false;
            this.setState({
                dobError: 'Please Enter DOB'
            })
        }
        if (age == '') {
            isValidated = false;
            this.setState({
                ageError: 'Please Enter Age'
            })
        }
        if (weight == '') {
            isValidated = false;
            this.setState({
                weightError: 'Please Enter Weight'
            })
        }
        if (height == '') {
            isValidated = false;
            this.setState({
                heightError: 'Please Enter Height'
            })
        }
        return isValidated;
    }
    handleAddFamilyMembers = () => {
        if (this.validatePersonalInfo()) {
            let { firstName,
                lastName, middleName,
                dob,
                age,
                personal_info_id,
                rel_type,
                gender,
                height, weight,
                dobResponse
            } = this.state;
            let data = {}
            data = {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                gender,
                dob: dobResponse,
                height: parseInt(height),
                weight: parseInt(weight),
                rel_type

            }
            this.props.addFamilyMember({ data, type: 'updateRelatives' });
            this.setState({
                showAddRelativesModal: false,
                showRelativesModal: true
            })
            // console.log(data);
            //  this.props.updateUserPersonalInfo({ data });
            //  this.closePersonalInfoModal();
        }
    }


    handleFirstNameChange = (firstName) => {
        this.setState({
            firstName,
            firstNameError: ''
        })
    }
    handleMiddleNameChange = (middleName) => {
        this.setState({
            middleName
        })
    }
    handleLastNameChange = (lastName) => {
        this.setState({
            lastName,
            lastNameError: ''
        })
    }

    handleMobileChange = (altenate_Mobile) => {
        if (/^[\d]+$/.test(altenate_Mobile) || altenate_Mobile === '') {
            this.setState({
                altenate_Mobile,
                altenate_MobileError: ''
            })
        }
        else {
            this.setState({

                altenate_MobileError: ''
            })
        }
    }
    handleGenderChange = (gender) => {
        this.setState({
            gender
        })
    }
    showDateTimePicker = (index) => {
        this.setState({
            isDateTimePickerVisible: true,
            selectedQualificationIndex: index
        });

    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        let dob = moment(date).format('D-MM-YYYY');
        let dobResponse = moment(date).format('YYYY/MM/D');
        let ageCalculated = moment().diff(moment(date), 'years');
        this.setState({
            dob,
            age: ageCalculated.toString(),
            ageError: '',
            dobError: '',
            focusNext: true,
            dobResponse

        })

        this.hideDateTimePicker();
        // this.secondTextInput.focus();
    };
    calculateDOB = () => {
        let { age } = this.state
        let dob = moment().subtract(age, 'years').format('D-MM-YYYY');
        //  console.log(dob);
        let dobResponse = moment().subtract(age, 'years').format('YYYY/MM/D');

        this.setState({
            dob: dob,
            dobError: '',
            dobResponse: dobResponse
        })
    }
    handleAgeChange = (age) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(age) || age === '') {
            this.setState({
                age: age,
                ageError: ''
            })
        }
    }
    handleWeightChange = (weight) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(weight) || weight === '') {
            this.setState({
                weight: weight,
                weightError: ''
            })
        }
    }

    handleHeightChange = (height) => {
        //  let dob = moment(date).format('D-MM-YYYY');
        if (/^[\d .]+$/.test(height) || height === '') {
            this.setState({
                height: height,
                heightError: ''
            })
        }
    }
    handleAadharNumberChange = (adharNo) => {
        if (/^[\d]+$/.test(adharNo) || adharNo === '') {
            this.setState({
                adharNo, adharNoError: ''
            })

        } else {
            this.setState({
                adharNoError: ''
            })
        }
    }
    renderAddfamilyMemberModal = () => {
        let {
            firstName,
            firstNameError,
            lastName,
            lastNameError,
            middleName,
            dob,
            dobError,
            age,
            ageError,
            height,
            weight,
            heightError,
            weightError,
            gender,
            personal_info_id,
            focusNext,
        } = this.state;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showAddRelativesModal}
                onRequestClose={this.closeAddFamilyMemberModal}
            >
                <SafeAreaView style={{}}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}
                    >
                        <ScrollView>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                maximumDate={new Date()}
                            />
                            <View style={{ flexDirection: 'row', marginBottom: 10, padding: 20 }}>
                                <Icon size={22} color="grey" name="close" type='material-community' onPress={this.closeAddFamilyMemberModal} />
                                <Text style={{ fontWeight: 'bold', color: '#2DB38D', fontSize: 20, paddingLeft: 20 }}> {personal_info_id ? 'Update Family Member' : 'Add Family Member'}</Text>

                            </View>

                            <Divider />
                            <View style={{
                                padding: 5,
                                marginBottom: 5
                            }}>
                                <Input
                                    containerStyle={{
                                        height: 60,
                                        marginTop: 10
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder='Enter First Name '
                                    value={firstName}
                                    label='First Name'
                                    onChangeText={text => this.handleFirstNameChange(text)}
                                    errorMessage={firstNameError}

                                />
                                <Input
                                    containerStyle={{
                                        height: 60, marginTop: 30,

                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder='Enter Middle Name'
                                    value={middleName}
                                    label='Middle Name'
                                    onChangeText={text => this.handleMiddleNameChange(text)}
                                />
                                <Input
                                    containerStyle={{
                                        height: 60, marginTop: 30,
                                        //   width: Math.round(Dimensions.get('window').width / 3) 
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder='Enter Last Name '
                                    label='Last Name'
                                    value={lastName}
                                    onChangeText={text => this.handleLastNameChange(text)}
                                    errorMessage={lastNameError}

                                />

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5
                                    // alignItems:'center'
                                }}>
                                    <TouchableOpacity onPress={this.showDateTimePicker}>

                                        <Input
                                            containerStyle={{
                                                height: 60, marginTop: 30,
                                                width: Math.round(Dimensions.get('window').width / 2.3)
                                            }}
                                            disabled={true}
                                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                            placeholder='Select DOB '
                                            label='DOB'
                                            value={dob}
                                            disabled={true}

                                            errorMessage={dobError}
                                            rightIcon={<Icon
                                                name='menu-down'
                                                size={24}
                                                color='#2DB38D'
                                                type='material-community'
                                            />}

                                        />
                                    </TouchableOpacity>
                                    <Input

                                        containerStyle={{ height: 60, marginTop: 30, width: Math.round(Dimensions.get('window').width / 2) }}
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        placeholder='Enter Age'
                                        label='Age'
                                        //   focus={focusNext}
                                        value={age}
                                        onChangeText={text => this.handleAgeChange(text)}
                                        keyboardType={'decimal-pad'}
                                        errorMessage={ageError}
                                        onBlur={this.calculateDOB}
                                    />

                                </View>
                                <View style={{
                                    //   flexDirection: 'row',
                                    //  justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5
                                    // alignItems:'center'
                                }}>

                                    <Text style={{ marginTop: 30, }}> Relation</Text>
                                    <Picker
                                        selectedValue={this.state.rel_type}
                                        itemStyle={styles.itemStyle}
                                        //     style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ rel_type: itemValue })
                                        }>
                                        <Picker.Item label="Father" value="Father" />
                                        <Picker.Item label="Mother" value="Mother" />
                                        <Picker.Item label="Wife" value="Wife" />
                                        <Picker.Item label="Children" value="Children" />
                                        <Picker.Item label="Other" value="Other" />
                                    </Picker>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5
                                    // alignItems:'center'
                                }}>

                                    <Input
                                        containerStyle={{
                                            height: 60, marginTop: 30,
                                            width: Math.round(Dimensions.get('window').width / 2.3)
                                        }}
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        placeholder='Enter Weight in KGS'
                                        label='Weight (KGS)'
                                        value={weight}
                                        keyboardType={'decimal-pad'}

                                        onChangeText={text => this.handleWeightChange(text)}
                                        errorMessage={weightError}
                                    />

                                    <Input
                                        containerStyle={{ height: 60, marginTop: 30, width: Math.round(Dimensions.get('window').width / 2) }}
                                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                        placeholder='Enter Height in CNM'
                                        label='Height (CNM)'
                                        keyboardType={'decimal-pad'}
                                        value={height}
                                        onChangeText={text => this.handleHeightChange(text)}
                                        errorMessage={heightError}
                                        onBlur={this.calculateDOB}
                                    />

                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    //  justifyContent: 'space-evenly',
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    alignItems: 'center'
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 30,
                                    }}>
                                        <CheckBox
                                            title='Male'
                                            checked={gender == 'male' ? true : false}
                                            textStyle={{ marginLeft: -1 }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('male')}
                                            checkedColor='#2DB38D'
                                        />
                                        <CheckBox
                                            title='Female'
                                            checked={gender === 'female' ? true : false}
                                            textStyle={{ marginLeft: -1 }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('female')}
                                            checkedColor='#2DB38D'
                                        />
                                        <CheckBox
                                            title='Other'
                                            checked={gender === 'other' ? true : false}
                                            textStyle={{ marginLeft: -1 }}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                            onPress={() => this.handleGenderChange('other')}
                                            checkedColor='#2DB38D'
                                        />

                                    </View>
                                </View>

                                <Button
                                    buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 10 }}
                                    title='Add'
                                    onPress={this.handleAddFamilyMembers}
                                />

                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Modal>
        )
    }




    renderRelativeModal = () => {
        let { userRelativesInfo } = this.props;
        let { relativeId } = this.state
        //     console.log('renderRelativeModal')
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showRelativesModal}
                onRequestClose={this.closeRelativeModal}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View
                        style={{
                            borderWidth: 2, backgroundColor: 'white',
                            borderColor: '#2DB38D', borderRadius: 5, marginBottom: 10, paddingBottom: 5
                        }}

                    >
                        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: '#2DB38D', fontSize: 18, marginLeft: 10 }}>Booking For </Text>
                            <Icon
                                name='close'
                                type='material-community'
                                color='red'
                                raised
                                size={15}
                                onPress={this.closeRelativeModal}
                            />

                        </View>
                        <Divider style={{ backgroundColor: '#2DB38D' }} />
                        <CheckBox
                            title='Yourself'
                            checked={relativeId == 'self' ? true : false}

                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                            onPress={() => this.selectRelative('self')}
                            checkedColor='#2DB38D'
                        />
                        {(userRelativesInfo.map(relative => (
                            <CheckBox
                                title={relative.first_name + ' ' + relative.last_name + '(' + relative.rel_type + ')'}
                                checked={relativeId == relative.personal_info_id ? true : false}
                                //    textStyle={{ marginLeft: -1 }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                onPress={() => this.selectRelative(relative.personal_info_id)}
                                checkedColor='#2DB38D'
                            />
                        )))}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon
                                raised
                                //  containerStyle={{ }}
                                name='plus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.showAddFamilyMemberModal()}
                            />
                            <Text>Add a Family Member</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                buttonStyle={{
                                    backgroundColor: '#2DB38D',
                                    width: Dimensions.get('window').width / 2,
                                    borderRadius: 50, marginTop: 10
                                }}
                                onPress={this.handleNext}
                                title='Next' />
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }
    //membership plan
    closeMemberShipModal = () => {
        this.setState({
            showMembershipModal: false,
            relativeId: 'self',
            membershipId: 'online',
        })
    }
    showMemberShipModal = () => {
        this.setState({
            showMembershipModal: true
        })
    }
    bookAppointment = () => {
        let { serviceType, relativeId, doctorId, membershipId } = this.state;
        //   console.log('bookAppointment', membershipId)
        if (serviceType == 'chat') {
            let data = {}
            if (membershipId != 'online') {
                //         console.log('coming inside if')
                if (relativeId == 'self') {
                    //check for payment  type:
                    data = {
                        to_guid: doctorId,
                        membership_id: membershipId,
                        service_id: serviceType
                    }
                } else {
                    data = {
                        to_guid: doctorId,
                        membership_id: membershipId,
                        service_id: serviceType,
                        patient_id: relativeId
                    }
                }
                this.setState({
                    isBookingRequested: true,
                    showMembershipModal: false
                })
                return fetch('https://svcaapkadoctor.azurewebsites.net/api/userservicebookings/membership', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.token
                    },
                    body: JSON.stringify(data)
                }).then((response) => {
                    //    console.log(response)
                    this.props.fetchChatList();
                    if (response.status == 200 || response.status == 201) {
                        let { doctorId, userId } = this.state;
                        this.setState({
                            isBookingRequested: false,
                        });
                        this.props.navigation.navigate('Chat', {
                            fromId: userId,
                            toId: doctorId
                        })

                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {

                this.setState({
                    isBookingRequested: true,
                    showMembershipModal: false
                })
                //call the payment gateay
                if (relativeId == 'self') {
                    //check for payment  type:
                    data = {
                        to_guid: doctorId,
                        // membership_id: membershipId,
                        service_id: serviceType
                    }
                } else {
                    data = {
                        to_guid: doctorId,
                        // membership_id: membershipId,
                        service_id: serviceType,
                        patient_id: relativeId
                    }
                }
                //   console.log('online payment data', data);
                return fetch('https://svcaapkadoctor.azurewebsites.net/api/userservicebookings/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.token
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => response.json())
                    .then((response) => {
                        //    console.log(response.sevice_booking_id);
                        //use this id and pass it to the online payment thing babes :
                        //next 10 minutes and it would be done babes:  
                        //  console.log('online payment data response', this.props.userInfo);
                        let data = {
                            transactionfor: this.state.serviceType,
                            transaction_for_unique_id: response.sevice_booking_id,
                            mobile: this.props.userInfo.userbasicinfo.mobile,
                            to_guid: this.state.doctorId,
                            guid: this.state.userId,
                            price: this.state.cost
                        }
                        //    console.log(data);
                        this.setState({
                            isBookingRequested: false,
                            showMembershipModal: false
                        })
                        this.props.navigation.navigate('PaytmIntegration', data)

                        // if (response.status == 200 || response.status == 201) {
                        //     let { doctorId, userId } = this.state;
                        //     this.setState({
                        //         isBookingRequested: false,
                        //     })
                        //     this.props.navigation.navigate('Chat', {
                        //         fromId: userId,
                        //         toId: doctorId
                        //     })

                        // }
                    }).catch((error) => {
                        console.error(error);
                    });
            }


        }
    }
    selectMemberShip = (id) => {
        this.setState({
            membershipId: id
        })

    }
    renderMemberShipModal = () => {
        let { userMembershipPlan } = this.props;
        let { membershipId } = this.state;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showMembershipModal}
                onRequestClose={this.closeMemberShipModal}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View
                        style={{


                            borderWidth: 2, backgroundColor: 'white',
                            borderColor: '#2DB38D', borderRadius: 5, marginBottom: 10, paddingBottom: 5
                        }}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: '#2DB38D', fontSize: 18, marginLeft: 10 }}>Payment Method  </Text>
                            <Icon
                                name='close'
                                type='material-community'
                                color='red'
                                raised
                                size={15}
                                onPress={this.closeMemberShipModal}
                            />

                        </View>
                        <Divider style={{ backgroundColor: '#2DB38D' }} />
                        <CheckBox
                            title='Online Payment'
                            checked={membershipId == 'online' ? true : false}

                            containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                            onPress={() => this.selectMemberShip('online')}
                            checkedColor='#2DB38D'
                        />
                        {(userMembershipPlan.map(plan => (
                            <CheckBox
                                title={plan.plan_name}
                                checked={membershipId == plan.membership_id ? true : false}
                                //    textStyle={{ marginLeft: -1 }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                onPress={() => this.selectMemberShip(plan.membership_id)}
                                checkedColor='#2DB38D'
                            />
                        )))}
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                buttonStyle={{
                                    backgroundColor: '#2DB38D',
                                    width: Dimensions.get('window').width / 2,
                                    borderRadius: 50, marginTop: 10
                                }}
                                onPress={this.bookAppointment}
                                title='Proceed To Book' />

                        </View>
                    </View>

                </View>
            </Modal >
        )
    }

    handleOutgoingRequest = () => {
        this.setState({
            showOutgoingModal: true
        })
    }
    closeRequest = () => {
        this.setState({
            showOutgoingModal: false
        })
    }

    handleFilterSubmit = (data) => {
        this.setState({
            filters: data,
            showFilteringModal: false
        })
        this.fetchConsultants(data);

    }

    closeFilteringModal = () => {
        this.setState({
            showFilteringModal: false,
        })
    }
    showFilteringModal = () => {
        this.setState({
            showFilteringModal: true,
        })

    }
    setActiveFilterWindow = (screenName) => {
        this.setState({
            selectedFilterView: screenName
        })
    }
    handleYetToCome = (type) => {
        showMessage({
            message: type + " coming soon!!",
            type: "success"
        })

    }

    // handleCallThread = (remoteUserId, remoteUserName, callType) => {
    //     store.dispatch(outGoingCallRequest({ remoteUserId, remoteUserName, callType }))
    //     this.props.navigation.navigate('Streaming')
    // }
    renderQualification = (qualifications) => {
        if (qualifications.length > 0) {
            return (
                <Text style={{ color: '#202748', marginTop: 5 }}>{qualifications[0].expirence} in {qualifications[0].qualified_name}</Text>

            )
        }
        // return qualifications.map((qualification, index) => {

        //     return (
        //         <Text style={{ color: '#202748', marginTop: 5 }}>{qualification.expirence} in {qualification.qualified_name + index}</Text>
        //     )
        // })

    }
    renderFilterHeader = () => {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'flex-end', marginRight: 10
            }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Filter</Text>
                <Icon
                    //  raised
                    name='filter'
                    type='material-community'
                    color='red'
                    size={30}
                    onPress={this.showFilteringModal} />
            </View>
        )
    }
    keyExtractor = (item, id) => id.toString()
    renderDoctorList = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DoctorDetails', { guid: item.guid })}
                activeOpacity={1}
            >
                <Card containerStyle={{
                    borderRadius: 5,
                    borderWidth: 0.5,
                    margin: 5

                }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.6 }}>
                            <Avatar
                                overlayContainerStyle={{ backgroundColor: '#202748' }}
                                rounded
                                icon={{ name: 'user', type: 'font-awesome', }}
                                source={{
                                    uri:
                                        item.profile_photo_path ? imageBaseurl + item.profile_photo_path : '',
                                }}
                                size='medium' />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ color: '#2DB38D', fontWeight: 'bold', fontSize: 18, lineHeight: 20 }}>{item.fullname}</Text>

                            </View>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                            <Rating
                                type='star'
                                readonly
                                ratingCount={5}
                                startingValue={item.rating}
                                imageSize={20}
                            />
                        </View>
                    </View>
                    {this.renderQualification(item.qualification)}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                name='chat'
                                raised
                                type='material-community'
                                color='#339933'
                                size={20}
                                onPress={() => this.hanldeBookingProcessing('chat', item.guid, item.chat_fees)}
                            />
                            <Text style={{ color: 'grey' }}>Chat</Text>
                            <Text style={{ color: '#2DB38D', fontWeight: 'bold' }}>Rs {item.chat_fees}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                name='phone'
                                raised
                                //   disabled
                                type='material-community'
                                color='#5170FF'
                                // reverse={true}
                                size={20}
                                onPress={() => this.handleYetToCome('Voice call')}
                            />
                            <Text style={{ color: 'grey' }}>Voice Call</Text>
                            {item.voice_fees && item.voice_fees > 0 && (
                                <Text style={{ color: '#2DB38D', fontWeight: 'bold' }}>Rs {item.voice_fees}</Text>
                            )}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                raised
                        //    /     disabled
                                name='video'
                                type='material-community'
                                color='#20A7F7'
                                //  reverse={true}
                                size={20}
                                onPress={() => this.handleYetToCome('Video call')}
                            //   onPress={() => this.handleCallThread(32, 'Sudhanshu', 'Video')}
                            />
                            <Text style={{ color: 'grey' }}>Video Call</Text>
                            {item.video_fees && item.video_fees > 0 && (
                                <Text style={{ color: '#2DB38D', fontWeight: 'bold' }}>Rs {item.video_fees}</Text>
                            )}
                        </View>
                    </View>

                </Card>
            </TouchableOpacity>
        )
    }
    renderEmpty = () => {
        return (
            <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
                <Text style={{ color: 'white', fontWeight: "bold" }}>
                    No Results Found Matching your criteria
                </Text>
            </View>
        )
    }
    render() {
        let { data, loading, error, isUpdateRequested, userMembershipPlanLoading, relativesInfoLoading, userRelativesInfo, userMembershipPlan } = this.props;
        let { isBookingRequested } = this.state;
        //      console.log('render')
        if (isBookingRequested) {
            return (
                <SafeAreaView
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: '#2DB38D',
                        alignItems: 'center'

                    }}>
                    <ActivityIndicator color='white' />
                    <Text style={{ color: 'white' }}>Connecting with the consulatnt</Text>
                </SafeAreaView >
            )
        }
        else if (((loading || userMembershipPlanLoading))) {
            return (
                <SafeAreaView
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: '#2DB38D',
                        alignItems: 'center'

                    }}>
                    <ActivityIndicator color='white' />
                    <Text style={{ color: 'white' }}>Fetching Consultants for you</Text>

                </SafeAreaView >
            )
        } else if (isUpdateRequested) {
            return (
                <SafeAreaView
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: '#2DB38D',
                        alignItems: 'center'

                    }}>
                    <ActivityIndicator color='white' />
                    <Text style={{ color: 'white' }}>Adding family member</Text>

                </SafeAreaView >
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#2DB38D' }}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}
                    >
                        <View style={{ justifyContent: 'center', marginTop: 30 }}>

                            <FilteringModal appliedFilters={this.state.filters} handleFilterSubmit={this.handleFilterSubmit} setActiveFilterWindow={this.setActiveFilterWindow} selectedFilterView={this.state.selectedFilterView} showFilteringModal={this.state.showFilteringModal} closeFilteringModal={this.closeFilteringModal} />
                            {/* {this.state.showOutgoingModal && (
                            <OutgoingRequestModal showOutgoingRequest={this.state.showOutgoingModal} closeRequest={this.closeRequest} />
                        )} */}
                            {/* {userRelativesInfo && userRelativesInfo.length > 0 && */}
                            {this.renderRelativeModal()
                            }
                            {/* {userMembershipPlan && userMembershipPlan.length > 0 && */}
                            {this.renderMemberShipModal()
                            }
                            {this.renderAddfamilyMemberModal()}
                            {this.renderFilterHeader()}
                            <FlatList
                                //    ListHeaderComponent={this.renderHeader}
                                keyExtractor={this.keyExtractor}
                                data={data}
                                initialNumToRender={50}
                                renderItem={this.renderDoctorList}
                                ListEmptyComponent={this.renderEmpty()}
                                //extraData={this.state}
                                //ListFooterComponent={this.props.renderFooter}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps={"always"}
                            // refreshing={this.props.isLeadRefresh || this.props.isFeedRefresh}
                            // onRefresh={this.refreshDashboard}
                            />



                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView >
            )
        }
    }
}