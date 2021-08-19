import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Picker, Dimensions, ActivityIndicator, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Card, Input, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSelector from 'react-native-modal-selector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { findIndex, remove } from 'lodash';
import moment from 'moment';
let index = 0;
const data = [
    { key: index++, section: true, label: 'Select KMS' },
    { key: index++, label: '0-5' },
    { key: index++, label: '5-10' },
    { key: index++, label: '10-20' },
    { key: index++, label: '20-50', },
    { key: index++, label: '<50', },
];
const locumTypeArray = [

    { key: index++, label: 'OPD' },
    { key: index++, label: 'IPD' },
    { key: index++, label: 'ICU' },
];
const locumSubType = [

    { key: index++, label: 'HOSPITAL' },
    { key: index++, label: 'CLINIC' },
];
const locumICUSubType = [

    { key: index++, label: 'HOSPITAL' },
    { key: index++, label: 'HOME' },
];

const opeartingDays = [

    { key: 0, label: 'DAILY' },
    { key: 1, label: 'MONDAY' },
    { key: 2, label: 'TUESDAY' },
    { key: 3, label: 'WEDNESDAY' },
    { key: 4, label: 'THURSDAY' },
    { key: 5, label: 'FRIDAY' },
    { key: 6, label: 'SATURDAY' },
    { key: 7, label: 'SUNDAY' },

];
export default class ProfileRegistrationHealthcareProfessionalInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            user: {},
            contact: {},
            selectedQualificationIndex: '',
            healthcareProfessional: true,
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            istime_available_fromSelected: false,
            servicesArrayIndex: '',
            frequencyIndex: '',
            workingWithUs: false,
            onlineConsulationSaveStatus: false,
            onlineConsulationStatus: false,
            voiceError: '',
            videoError: '',
            chatError: '',
            homeVisit: false,
            ambulanceService: false,
            locum: false,
            tpa: false,
            other: false,
            appointment: false,
            selectedRoles: '',
            selectedRolesError: '',
            role_id: 0,
            selectedStream: '',
            selectedStreamError: '',
            month: '',
            year: '',
            selectedSpeciality: '',
            selectedSpecialityId: '',
            selectedSpecialityError: '',
            practicingSince: '',
            practicingSinceError: '',
            userId: '',
            adharNumber: '',
            adharNumberError: null,
            servicesState: [],
            stream: [{
                stream_id: '',
                streamName: ''
            }],
            specialities: [{
                speciality_id: '',
                specialityName: '',
                specialityError: ''
            }],
            superspecialities: [{
                super_speciality_id: '',
                superSpecialityName: '',
                superSpecialityError: ''
            }],
            qualificationArray: [
                {
                    qualification: '',
                    qualificationError: '',
                    reg_number: '',
                    reg_numberError: '',
                    qualification_id: '',
                    month: '',
                    year: '',
                    practicingSince: '',
                    practicingSinceError: '',

                }
            ],
            qualificationArrayEror: '',

            onlineConsulation:
            {
                userId: '',
                chat_fees: '',
                chatStatus: 0,
                voice_fees: '',
                voiceStatus: 0,
                video_fees: '',
                videoStatus: 0,
                onlineCId: '',
            }
            ,
            servicesArray: [
                // {
                //     service_id: 5,
                //     hospitalName: '',
                //     hospitalNameError: '',
                //     addressLine1: '',
                //     addressLine1Error: '',
                //     addressLine2: '',
                //     isOwner: 0,
                //     shopactNo: '',
                //     shopactNoError: '',
                //     gstNo: '',
                //     business_type: 'hospital',
                //     //    gstNoError: '',
                //     daysType: 'Daily',
                //     frequencyArray: [{
                //         service_id: '',
                //         frequency: 1,
                //         frequencyName: 'MONDAY',
                //         time_available_from: '8:00',
                //         time_available_to: '20:00',
                //         average_opd: '',
                //         averageOPDError: '',
                //         fee: '',
                //         cFeesError: '',
                //         subtype: null

                //     }]
                // }
            ],

            homeVisitArray: [
                {
                    userId: '',
                    homevisitType: '',
                    homevisitTypeId: '',
                    homeVisitTypeError: null,
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    homeVisitSaveStatus: false,
                    //if saved,then set this id from response
                    homevisitId: ''
                }
            ],
            ambulanceServiceArray: [
                {
                    userId: '',
                    ambservicetype: '',
                    ambservicetypeId: '',
                    ambservicetypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    ambulanceSaveStatus: false,
                    userambserviceId: ''
                }
            ],
            tpaArray: [
                {
                    userId: '',
                    tpatype: '',
                    tpatypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    tpaSaveStatus: false,
                    tpatypeId: '',
                    usertpaId: '',
                    tpaSaveStatus: false
                }
            ],
            locumArray: [
                {
                    userId: '',
                    locumtype: '',
                    locumtypeError: '',
                    locumsubtype: '',
                    locumsubtypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    locumSaveStatus: false,
                    userlocumId: ''
                }
            ],


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateGeoLocation = this.calculateGeoLocation.bind(this);
    }
    componentDidMount() {
        // let userObject = this.props.navigation.state.params.user;
        // let contactObject = this.props.navigation.state.params.contact;
        // this.setState({
        //     user: userObject,
        //     contact: contactObject
        // })
        this.props.fetchRoles();
        this.props.fetchStream()
        this.props.fetchQualificationa();
        this.props.fetchSpeciality();
        this.props.fetchSuperSpeciality();
        this.props.fetchServices();
        Geocoder.init("AIzaSyA8GzpKhVAWkGzrVQGKgc2SyeTaLRtHk7w");
        //   this.props.fetchHomeVisit();
        //   this.props.fetchAmbulance();
        //   this.props.fetchTPA();
        //   this.props.fetchLocum()
        // this.bootstrapAsyncUserToken().then(info => {
        //     this.setState({
        //         userId: parseInt(info.userId)
        //     })

        // });
    }

    bootstrapAsyncUserToken = async () => {
        return {
            userId: await AsyncStorage.getItem('userId'),
            token: await AsyncStorage.getItem('token')
        };
    }
    validateSumbitProfessionalRegistration = () => {
        let isValidated = true;
        let { selectedRoles,
            selectedRolesError,
            superspecialities,
            specialities,
            selectedStream,
            servicesArray,
            selectedStreamError,
            month,
            year,
            selectedSpeciality,
            selectedSpecialityId,
            selectedSpecialityError,
            practicingSince,
            practicingSinceError,
            userId,
            adharNumber,
            adharNumberError,
            qualificationArray,
            qualificationArrayEror } = this.state;
        if (selectedRoles == '') {
            isValidated = false;
            this.setState({
                selectedRolesError: 'Select Professional'
            })
        }
        if (selectedStream == '') {
            isValidated = false;
            this.setState({
                selectedStreamError: 'Select Stream'
            })
        }
        //  let specialityArrayObject = specialities;
        specialities.map((specaility, index) => {

            if (specaility.speciality_id == '') {
                isValidated = false;
                specaility.specialityError = 'Select Speciality';
                specialities.splice(index, 1, specaility)

            }
        })
        this.setState({
            specialities: specialities
        })
        // superspecialities.map((superSpecaility, index) => {

        //     if (superSpecaility.super_speciality_id == '') {
        //         isValidated = false;
        //         superSpecaility.superSpecialityError = 'Select Super Speciality';
        //         superspecialities.splice(index, 1, superSpecaility)

        //     }
        // })
        // this.setState({
        //     superspecialities: superspecialities
        // })


        qualificationArray.map((qualification, index) => {

            if (qualification.qualification == '') {
                isValidated = false;
                qualification.qualificationError = 'Select Qualification';
            }
            if (qualification.reg_number == '') {
                isValidated = false;
                qualification.reg_numberError = 'Enter Reg No.';

            }
            if (qualification.practicingSince == '') {
                isValidated = false;
                qualification.practicingSinceError = 'Select Practising Year';

            }

            qualificationArray.splice(index, 1, qualification)
        })
        this.setState({
            qualificationArray: qualificationArray
        })
        if (this.state.workingWithUs) {
            let { onlineConsulation, onlineConsulationStatus, appointment, servicesArray } = this.state;
            if (onlineConsulationStatus) {
                if (onlineConsulation.chatStatus == 1 && onlineConsulation.chat_fees == '') {
                    validation = false
                    this.setState({
                        chatError: 'Enter Fees'

                    })
                }
                if (onlineConsulation.videoStatus == 1 && onlineConsulation.video_fees == '') {
                    validation = false
                    this.setState({
                        videoError: 'Enter Fees'

                    })
                }
                if (onlineConsulation.voiceStatus == 1 && onlineConsulation.voice_fees == '') {
                    validation = false
                    this.setState({
                        voiceError: 'Enter Fees'

                    })
                }
            }
            if (appointment) {
                servicesArray.map((appointment, index) => {

                    if (appointment.hospitalName == '') {
                        isValidated = false;
                        appointment.hospitalNameError = 'Enter Clinic / Hospital name ';
                        servicesArray.splice(index, 1, appointment)

                    }
                    if (appointment.addressLine1 == '') {
                        isValidated = false;
                        appointment.addressLine1Error = 'Enter address';
                        servicesArray.splice(index, 1, appointment)

                    }
                    frequencyObject = appointment.frequencyArray;

                    frequencyObject.map((frequency, frequencyIndex) => {
                        if (frequency.average_opd == '') {
                            isValidated = false;
                            frequency.averageOPDError = 'Enter avg. OPD ';
                            frequencyObject.splice(frequencyIndex, 1, frequency)
                            servicesArray.splice(index, 1, appointment)
                        }
                        if (frequency.fee == '') {
                            isValidated = false;
                            frequency.cFeesError = 'Enter fees';
                            frequencyObject.splice(frequencyIndex, 1, frequency);
                            servicesArray.splice(index, 1, appointment)
                        }


                    })

                })
                this.setState({
                    servicesArray: servicesArray
                })
            }
            // if (homeVisitObject.homevisitType === '') {
            //     validated = false
            //     homeVisitObject.homeVisitTypeError = 'Select Home Visit Type';
            //     homeVisitArray.splice(index, 1, homeVisitObject);
            //     this.setState({
            //         homeVisitArray
            //     })
            // }
            // if (homeVisitObject.fees === '') {
            //     validated = false
            //     homeVisitObject.feesError = 'Select Fees';
            //     homeVisitArray.splice(index, 1, homeVisitObject);
            //     this.setState({
            //         homeVisitArray
            //     })
            // }
            // if (homeVisitObject.distance === '') {
            //     validated = false
            //     homeVisitObject.distanceError = 'Select Distance';
            //     homeVisitArray.splice(index, 1, homeVisitObject);
            //     this.setState({
            //         homeVisitArray
            //     })
            // }
        }



        // if (practicingSince == '') {
        //     isValidated = false;
        //     this.setState({
        //         practicingSinceError: 'Select Practicing Year'
        //     })
        // }
        // if (adharNumber == '') {
        //     isValidated = false;
        //     this.setState({
        //         adharNumberError: 'Enter Aadhar Number'
        //     })
        // } if (adharNumber != '') {

        //     if (adharNumber.length != 12) {
        //         isValidated = false;
        //         this.setState({
        //             adharNumberError: 'Invalid Aadhar Number'
        //         })
        //     }
        // }
        return isValidated;
    }
    async handleSubmit() {
        //validate the required field and then show the error message 
        if (this.validateSumbitProfessionalRegistration()) {
            let {
                role_id,
                stream,
                qualificationArray,
                specialities,
                onlineConsulation,
                servicesArray,
                appointment,
                user,
                contact,
                superspecialities,
                onlineConsulationStatus
            } = this.state
            let businessArray = [];
            let services = [];
            if (appointment) {
                Promise.all(servicesArray.map((appointment, index) => {
                    let contact = {
                        contact_type: "Business",
                        addressline_1: appointment.addressLine1,
                        addressline_2: appointment.addressLine2,
                        phone: "7350588512",
                        city_code: '',
                        state_code: '',
                        country_code: ''

                    }
                    let availability = [];
                    frequencyObject.map((frequency, frequencyIndex) => {
                        let frequencyObject = {
                            service_id: 5,
                            frequency: frequency.frequency.toString(),
                            time_available_from: frequency.time_available_from,
                            average_opd: frequency.average_opd,
                            fee: frequency.fee,
                            time_available_to: frequency.time_available_to,
                        }
                        availability.push(frequencyObject);
                    });
                    let fullAddress = appointment.addressLine1 + ' ' + appointment.addressLine2;
                    let businessObject = {
                        name: appointment.hospitalName,
                        shop_act_no: appointment.shopactNo,
                        service_id: 5,
                        latitude: "18.51522",
                        longitude: "73.9466451",
                        business_type: "hospital",
                        //latitude: location.lat.toString(),
                        //longitude: location.lng.toString(),
                        availability: availability,
                        contact: contact
                    }
                    console.log('businessObject', businessObject);
                    businessArray.push(businessObject);
                    // Geocoder.from(fullAddress).then(json => {
                    //     var location = json.results[0].geometry.location;
                    //     let businessObject = {
                    //         name: appointment.hospitalName,
                    //         shop_act_no: appointment.shopactNo,
                    //         service_id: 5,
                    //         latitude:"18.51522",
                    //         longitude:"73.9466451",
                    //         //latitude: location.lat.toString(),
                    //         //longitude: location.lng.toString(),
                    //         availability: availability,
                    //         contact: contact
                    //     }
                    //     console.log('businessObject', businessObject);
                    //     businessArray.push(businessObject);
                    // })
                    //     .catch(error => console.warn(error));

                }));
                console.log('businessArray', businessArray);
                services.push({
                    businesses: businessArray
                })
            }
            let data = {
                user,
                contact,
                superspecialities,
                role_id,
                streams: stream,
                qualifications: qualificationArray,
                specialities: specialities,
                online_Consultations: onlineConsulationStatus ? onlineConsulation : null,
                services: services
            }
            console.log('data', data);
            this.props.saveUserProfile(data);
        }


    }
    async  calculateGeoLocation() {
        const coordinates = await Geocoder.from(fullAddress);
        return coordinates.results[0].geometry.location;
        // .then(json => {
        //     var location = json.results[0].geometry.location;
        //     let businessObject = {
        //         name: appointment.hospitalName,
        //         shop_act_no: appointment.shopactNo,
        //         service_id: 5,
        //         latitude: location.lat.toString(),
        //         longitude: location.lng.toString(),
        //         availability: availability,
        //         contact: contact
        //     }
        //     console.log('businessObject', businessObject);
        //     businessArray.push(businessObject);
        // })
        // .catch(error => console.warn(error));
    }
    toggleWorking = () => {
        this.setState({
            workingWithUs: !this.state.workingWithUs
        })
    }
    //date time picker
    showDateTimePicker = (index) => {
        this.setState({
            isDateTimePickerVisible: true,
            selectedQualificationIndex: index
        });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };


    handleRoleChange = (option) => {
        let { userId } = this.state
        this.setState({
            selectedRoles: option.label,
            selectedRolesError: '',
            role_id: option.key
        })
        //   this.props.updateRole({ userId, roleId: option.key })
    }
    addStream = () => {
        let { stream } = this.state;
        let streamObject = {
            stream_id: '',
            streamName: ''
        }
        stream.push(streamObject)
        this.setState({
            stream: stream
        })
    }
    handleRemoveStream = (index) => {
        let { stream } = this.state;
        let streamObject = stream[index];
        stream.splice(index, 1)
        this.setState({
            stream: stream
        });
    }
    handleStreamChange = (index, option) => {
        let { stream } = this.state;
        streamObject = stream[index];
        streamObject.stream_id = option.key;
        streamObject.streamName = option.label;
        stream.splice(index, 1, streamObject);
        this.setState({
            stream: stream,
            selectedStreamError: '',
            selectedStream: option.label
        })
        // console.log(stream)
        //     this.props.updateStream({ userId, streamId: option.key })
    }
    renderQualificationList = () => {
        return this.props.qualifications.map((qualification) => {
            return ({ label: qualification.qualified_name, key: qualification.qualification_id })

        })
    }

    handleRegitrationIdChange = (regId, index) => {
        let { userId, qualificationArray } = this.state;
        qualificationObject = qualificationArray[index];
        qualificationObject.reg_number = regId;
        qualificationObject.reg_numberError = '',
            qualificationArray.splice(index, 1, qualificationObject);
        this.setState({
            qualificationArray
        })
    }
    handleDatePicked = date => {
        let dateFomatted = moment(date).format('D-MM-YYYY');
        let month = moment(date).format('M');
        let year = moment(date).format('YYYY');
        let { qualificationArray, selectedQualificationIndex } = this.state;
        qualificationObject = qualificationArray[selectedQualificationIndex];
        qualificationObject.practicingSince = dateFomatted;
        qualificationObject.practicingSinceError = '',
            qualificationObject.year = parseInt(year);
        qualificationObject.month = parseInt(month);
        qualificationArray.splice(selectedQualificationIndex, 1, qualificationObject);
        this.setState({
            qualificationArray
        })

        this.hideDateTimePicker();

        // this.secondTextInput.focus();
    };
    handleQualificationChange = (option, index) => {
        let { userId, qualificationArray } = this.state;
        qualificationObject = qualificationArray[index];
        qualificationObject.qualification = option.label;
        qualificationObject.qualification_id = option.key;
        qualificationObject.qualificationError = ''
        qualificationArray.splice(index, 1, qualificationObject);
        this.setState({
            qualificationArray
        })
    }
    addQualification = () => {
        let { qualificationArray } = this.state;
        let qualificationObject = {
            qualification: '',
            qualificationError: '',
            reg_number: '',
            reg_numberError: '',
            qualification_id: '',
            month: '',
            year: '',
            practicingSince: '',
            practicingSinceError: '',
        }
        qualificationArray.push(qualificationObject)
        this.setState({
            qualificationArray
        })
    }

    handleRemoveQualification = (index) => {
        let { qualificationArray } = this.state;
        let qualificationObject = qualificationArray[index];
        qualificationArray.splice(index, 1)
        this.setState({
            qualificationArray
        });
    }
    renderStream = () => {
        let { stream } = this.state;
        return stream.map((stream, index) => {
            return (
                <View>
                    <ModalSelector
                        data={this.renderStreamsList()}
                        initValue="Allopathy"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => this.handleStreamChange(index, option)}>

                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                //    width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select Stream"
                            label='Stream'
                            value={stream.streamName}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                            />}
                            errorMessage={this.state.selectedStreamError}
                        />

                    </ModalSelector>
                    {index != 0 && (
                        <Icon
                            raised
                            containerStyle={{ marginTop: 10 }}
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => this.handleRemoveStream(index)} />
                    )}
                </View>
            )

        })
    }

    renderQualification = () => {
        let { qualificationArray } = this.state;
        // console.log()
        return qualificationArray.map((qualification, index) => {
            return (
                <View>

                    <ModalSelector
                        data={this.renderQualificationList()}
                        initValue="Qualification"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => this.handleQualificationChange(option, index)}>

                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                //     width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select Qualification"
                            label='Qualification'
                            value={qualification.qualification}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                            />}
                            errorMessage={qualification.qualificationError}

                        />

                    </ModalSelector>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            onChangeText={((text) => this.handleRegitrationIdChange(text, index))}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            placeholder="Enter Reg. Id"
                            label='Reg. Id'
                            value={qualification.regId}
                            errorMessage={qualification.reg_numberError}

                        />
                        <TouchableOpacity onPress={() => this.showDateTimePicker(index)}>
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                disabled={true}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Practicing"
                                label='Practicing since'
                                inputStyle={{ color: 'black' }}

                                value={qualification.practicingSince}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={qualification.practicingSinceError}

                            />

                        </TouchableOpacity>
                    </View>
                    {index != 0 && (
                        <Icon
                            raised
                            containerStyle={{ marginTop: 10 }}
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => this.handleRemoveQualification(index)} />
                    )}
                </View>
            )
        })
    }
    renderRoles = () => {

        return this.props.roles.map((role) => {
            return ({ label: role.name, key: role.role_id })

        })
    }
    renderStreamsList = () => {
        return this.props.streams.map((stream) => {
            return ({ label: stream.name, key: stream.stream_id })

        })
    }
    renderSpecialityList = () => {
        return this.props.specialities.map((speciality) => {
            return ({ label: speciality.name, key: speciality.speciality_id })

        })
    }

    addSpeciality = () => {
        let { specialities } = this.state;
        let specialityObject = {
            speciality_id: '',
            specialityName: '',
            specialityError: '',
        }
        specialities.push(specialityObject)
        this.setState({
            specialities: specialities
        })
    }

    handleRemoveSpeciality = (index) => {
        let { specialities } = this.state;
        let specialityObject = specialities[index];
        specialities.splice(index, 1)
        this.setState({
            specialities: specialities
        });
    }

    /**
       * handleStreamChange = (index, option) => {
      let { stream } = this.state;
      streamObject = stream[index];
      streamObject.stream_id = option.key;
      streamObject.streamName = option.label;
      stream.splice(index, 1, streamObject);
      this.setState({
          stream: stream
      })
      // console.log(stream)
      //     this.props.updateStream({ userId, streamId: option.key })
  }
       * 
       */
    handleSpecialityChange = (index, option) => {
        let { specialities } = this.state;
        let specialityObject = specialities[index];
        specialityObject.speciality_id = option.key;
        specialityObject.specialityName = option.label;
        specialityObject.specialityError = '';
        specialities.splice(index, 1, specialityObject);
        this.setState({
            specialities: specialities,
            selectedSpeciality: option.label,
            selectedSpecialityError: ''
        })
    }


    renderSpecialities = () => {
        let { specialities } = this.state;
        return specialities.map((speciality, index) => {
            return (
                <View>
                    <ModalSelector
                        data={this.renderSpecialityList()}
                        //   initValue="Allopathy"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => this.handleSpecialityChange(index, option)}>

                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                //    width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select Speciality"
                            label='Speciality'
                            value={speciality.specialityName}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                            />}
                            errorMessage={speciality.specialityError}
                        />

                    </ModalSelector>
                    {index != 0 && (
                        <Icon
                            raised
                            containerStyle={{ marginTop: 10 }}
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => this.handleRemoveSpeciality(index)} />
                    )}
                </View>
            )
        })
    }
    renderSuperSpecialityList = () => {
        return this.props.superSpeciality.map((superSpeciality) => {
            return ({ label: superSpeciality.name, key: superSpeciality.super_speciality_id })

        })
    }
    addSuperSpeciality = () => {
        let { superspecialities } = this.state;
        let superspecialitiesObject = {
            super_speciality_id: '',
            superSpecialityName: '',
            superSpecialityError: '',
        }
        superspecialities.push(superspecialitiesObject)
        this.setState({
            superspecialities: superspecialities
        })
    }

    handleRemoveSuperSpeciality = (index) => {
        let { superspecialities } = this.state;
        let superspecialitiesObject = superspecialities[index];
        superspecialities.splice(index, 1)
        this.setState({
            superspecialities: superspecialities
        });
    }
    handleSuperSpecialityChange = (index, option) => {
        let { superspecialities } = this.state;
        let superspecialitiesObject = superspecialities[index];
        superspecialitiesObject.super_speciality_id = option.key;
        superspecialitiesObject.superSpecialityName = option.label;
        superspecialitiesObject.superSpecialityError = '';
        superspecialities.splice(index, 1, superspecialitiesObject);
        this.setState({
            superspecialities: superspecialities,

        })
    }
    renderSuperSpecialities = () => {
        let { superspecialities } = this.state;
        return superspecialities.map((superSpeciality, index) => {
            return (
                <View>
                    <ModalSelector
                        data={this.renderSuperSpecialityList()}
                        //   initValue="Allopathy"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => this.handleSuperSpecialityChange(index, option)}>

                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                //    width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select Super Speciality"
                            label='Super speciality'
                            value={superSpeciality.superSpecialityName}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                            />}
                            errorMessage={superSpeciality.superSpecialityError}
                        />

                    </ModalSelector>
                    {index != 0 && (
                        <Icon
                            raised
                            containerStyle={{ marginTop: 10 }}
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => this.handleRemoveSuperSpeciality(index)} />
                    )}
                </View>
            )
        })
    }

    renderHealthCareprofessional = () => {
        if (this.state.healthcareProfessional) {
            return (
                <View style={{
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: 'grey',
                    padding: 5,
                    marginTop: 5
                }}>
                    <View style={{ backgroundColor: '#F7F7F7', }}>
                        <Text>Professional Info</Text>
                    </View>
                    <View style={{
                        //  flexDirection: 'row',
                        // justifyContent: 'space-evenly'
                    }}>
                        <ModalSelector
                            data={this.renderRoles()}
                            initValue="Medical Practitioner"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => this.handleRoleChange(option)}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //  width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                editable={false}
                                placeholder="Select Professional "
                                label='Professional'
                                value={this.state.selectedRoles}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={this.state.selectedRolesError}
                            />

                        </ModalSelector>

                    </View>
                    {this.renderStream()}
                    {/* <Icon
                        raised
                        containerStyle={{ marginTop: 10 }}
                        name='plus'
                        type='font-awesome'
                        color='#2DB38D'
                        size={12}
                        onPress={this.addStream} /> */}
                    {this.renderQualification()}

                    <Icon
                        raised
                        containerStyle={{ marginTop: 10 }}
                        name='plus'
                        type='font-awesome'
                        color='#2DB38D'
                        size={12}
                        onPress={this.addQualification} />

                    {this.renderSpecialities()}
                    <Icon
                        raised
                        containerStyle={{ marginTop: 10 }}
                        name='plus'
                        type='font-awesome'
                        color='#2DB38D'
                        size={12}
                        onPress={this.addSpeciality} />

                    {this.renderSuperSpecialities()}
                    <Icon
                        raised
                        containerStyle={{ marginTop: 10 }}
                        name='plus'
                        type='font-awesome'
                        color='#2DB38D'
                        size={12}
                        onPress={this.addSuperSpeciality} />

                </View>
            )
        }

    }
    resetOnlineConsulatationState = () => {
        this.setState({
            onlineConsulation:
            {
                userId: '',
                chat_fees: '',
                chatStatus: 0,
                voice_fees: '',
                voiceStatus: 0,
                video_fees: '',
                videoStatus: 0,
                onlineCId: '',
            }
        })
    }

    /**Working with us rendering  */
    handleOnlineConsulationToggle = () => {
        if (this.state.onlineConsulationStatus) {
            this.resetOnlineConsulatationState()
            //delete the entry and reset the state
        }
        this.setState({
            onlineConsulationStatus: !this.state.onlineConsulationStatus
        })
    }
    handleChatToggle = () => {
        this.setState({
            chat_fees: '',
            onlineConsulationSaveStatus: false,
            onlineConsulation: {
                ...this.state.onlineConsulation,
                chatStatus: this.state.onlineConsulation.chatStatus == 1 ? 0 : 1,

            }

        })
    }
    handleVoiceToggle = () => {
        this.setState({
            onlineConsulationSaveStatus: false,
            voice_fees: '',
            onlineConsulation: {

                ...this.state.onlineConsulation,
                voiceStatus: this.state.onlineConsulation.voiceStatus == 1 ? 0 : 1,

            }

        })
    }
    handleVideoToggle = () => {
        this.setState({
            video_fees: '',
            onlineConsulationSaveStatus: false,
            onlineConsulation: {
                onlineConsulationSaveStatus: false,
                ...this.state.onlineConsulation,
                videoStatus: this.state.onlineConsulation.videoStatus == 1 ? 0 : 1,


            }

        })
    }
    handleChatFeeChange = (text) => {
        this.setState({
            chatError: '',
            onlineConsulationSaveStatus: false,
            onlineConsulation: { ...this.state.onlineConsulation, chat_fees: text, }

        })
    }
    handleVoiceFeeChange = (text) => {
        this.setState({
            voiceError: '',
            onlineConsulationSaveStatus: false,
            onlineConsulation: { ...this.state.onlineConsulation, voice_fees: text }

        })
    }
    handleVideoFeeChange = (text) => {
        this.setState({
            videoError: '',
            onlineConsulationSaveStatus: false,
            onlineConsulation: { ...this.state.onlineConsulation, video_fees: text }

        })
    }
    validateOnlineConsulation = () => {
        let { onlineConsulation, onlineConsulationStatus } = this.state;
        let validation = true;
        if (onlineConsulationStatus) {
            if (onlineConsulation.chatStatus == 1 && onlineConsulation.chat_fees == '') {
                validation = false
                this.setState({
                    chatError: 'Enter Fees'

                })
            }
            if (onlineConsulation.videoStatus == 1 && onlineConsulation.video_fees == '') {
                validation = false
                this.setState({
                    videoError: 'Enter Fees'

                })
            }
            if (onlineConsulation.voiceStatus == 1 && onlineConsulation.voice_fees == '') {
                validation = false
                this.setState({
                    voiceError: 'Enter Fees'

                })
            }
        }
        return validation;
    }



    renderOnlineConsulation = () => {
        let {
            onlineConsulationStatus,
            onlineConsulation,
            chatError,
            videoError,
            voiceError,
            onlineConsulationSaveStatus } = this.state;
        //   console.log(onlineConsulation);
        if (onlineConsulationStatus)
            return (
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'

                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <CheckBox
                                title='Chat'
                                checked={onlineConsulation.chatStatus == 1 ? true : false}
                                textStyle={{ marginLeft: -1 }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                onPress={this.handleChatToggle}
                                checkedColor='#2DB38D'
                            />
                            {onlineConsulation.chatStatus == 1 && (
                                <Input
                                    label='Fees'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    value={onlineConsulation.chat_fees}
                                    onChangeText={(text) => this.handleChatFeeChange(text)}
                                    errorMessage={chatError}
                                    keyboardType='numeric'
                                />
                            )}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <CheckBox
                                title='Voice'
                                checked={onlineConsulation.voiceStatus == 1 ? true : false}
                                textStyle={{ marginLeft: -1 }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                onPress={this.handleVoiceToggle}
                                checkedColor='#2DB38D'
                            />
                            {onlineConsulation.voiceStatus == 1 && (
                                <Input
                                    label='Fees'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    value={onlineConsulation.voice_fees}
                                    onChangeText={(text) => this.handleVoiceFeeChange(text)}
                                    errorMessage={voiceError}
                                    keyboardType='numeric'
                                />
                            )}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <CheckBox
                                title='Video'
                                checked={onlineConsulation.videoStatus == 1 ? true : false}
                                textStyle={{ marginLeft: -1 }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                                onPress={this.handleVideoToggle}
                                checkedColor='#2DB38D'
                            />
                            {onlineConsulation.videoStatus == 1 && (
                                <Input
                                    label='Fees'
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    value={onlineConsulation.video_fees}
                                    onChangeText={(text) => this.handleVideoFeeChange(text)}
                                    errorMessage={videoError}
                                    keyboardType='numeric'
                                />
                            )}
                        </View>
                    </View>



                </View>
            )
    }
    resetHomeVisit = () => {
        this.setState({
            homeVisitArray: [
                {
                    userId: '',
                    homevisitType: '',
                    homevisitTypeId: '',
                    homeVisitTypeError: null,
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    homeVisitSaveStatus: false,
                    //if saved,then set this id from response
                    homevisitId: ''
                }
            ],
        })
    }
    handleHomeVisitToggle = () => {
        if (this.state.homeVisit) {
            //     this.props.deleteUserAllHomeVisit(this.state.userId)
            this.resetHomeVisit();
        }

        this.setState({
            homeVisit: !this.state.homeVisit
        })
    }
    renderHomeVisitType = () => {
        return this.props.homeVisitType.map((visit) => {
            return ({ label: visit.homevisitType, key: visit.homevisitId })

        })

    }
    handleHomeVisitTypeChange = (option, index) => {

        let { homeVisitArray } = this.state;
        let homeaVisitObject = homeVisitArray[index];
        homeaVisitObject.homevisitType = option.label;
        homeaVisitObject.homevisitTypeId = option.key
        homeaVisitObject.homeVisitTypeError = null;
        homeaVisitObject.homeVisitSaveStatus = false;
        homeVisitArray.splice(index, 1, homeaVisitObject);
        this.setState({
            homeVisitArray
        })

    }
    handleHomeVisitFeesChange = (text, index) => {
        let { homeVisitArray } = this.state;
        let homeaVisitObject = homeVisitArray[index];
        homeaVisitObject.fees = text;
        homeaVisitObject.feesError = null;
        homeaVisitObject.homeVisitSaveStatus = false;
        homeVisitArray.splice(index, 1, homeaVisitObject);
        this.setState({
            homeVisitArray
        })
    }
    handleHomeVisitKMChange = (option, index) => {
        let { homeVisitArray } = this.state;
        let homeaVisitObject = homeVisitArray[index];
        homeaVisitObject.distance = option.label;
        homeaVisitObject.distanceError = null;
        homeaVisitObject.homeVisitSaveStatus = false;
        homeVisitArray.splice(index, 1, homeaVisitObject);
        this.setState({
            homeVisitArray
        })
    }
    addHomeVisitType = () => {
        let { homeVisitArray } = this.state
        let homeVisitObject = {
            userId: '',
            homevisitType: '',
            homevisitTypeId: '',
            homeVisitTypeError: null,
            distance: '',
            distanceError: null,
            fees: '',
            feesError: null,
            homeVisitSaveStatus: false,
            homevisitId: ''
        }
        homeVisitArray.push(homeVisitObject)
        this.setState({
            homeVisitArray
        })
    }
    removeHomeVisit = (index) => {
        let { homeVisitArray } = this.state;
        let homeVisitObject = homeVisitArray[index];
        //check for it,if there then we need to delete from database : 

        homeVisitArray.splice(index, 1)
        this.setState({
            homeVisitArray
        });
        // this.props.deleteQualification(qualificationObject.qualificationId);
    }
    validateHomeVisitSave = (index) => {
        let { homeVisitArray } = this.state;
        let validated = true;

        let homeVisitObject = homeVisitArray[index];
        if (homeVisitObject.homevisitType === '') {
            validated = false
            homeVisitObject.homeVisitTypeError = 'Select Home Visit Type';
            homeVisitArray.splice(index, 1, homeVisitObject);
            this.setState({
                homeVisitArray
            })
        }
        if (homeVisitObject.fees === '') {
            validated = false
            homeVisitObject.feesError = 'Select Fees';
            homeVisitArray.splice(index, 1, homeVisitObject);
            this.setState({
                homeVisitArray
            })
        }
        if (homeVisitObject.distance === '') {
            validated = false
            homeVisitObject.distanceError = 'Select Distance';
            homeVisitArray.splice(index, 1, homeVisitObject);
            this.setState({
                homeVisitArray
            })
        }
        return validated;
    }

    renderHomeVisit = () => {
        if (this.state.homeVisit) {
            let { homeVisitArray } = this.state

            return homeVisitArray.map((homeVisit, index) => {
                return (
                    <View >
                        <ModalSelector
                            data={this.renderHomeVisitType()}
                            initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleHomeVisitTypeChange(option, index) }}>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Type"
                                label='Home Visit Type'
                                value={homeVisit.homevisitType}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={homeVisit.homeVisitTypeError}
                            />
                        </ModalSelector>
                        <View style={{ flexDirection: 'row' }}>
                            <ModalSelector
                                data={data}
                                //  initValue="Allopathy"
                                // supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => { this.handleHomeVisitKMChange(option, index) }}>

                                <Input

                                    containerStyle={{
                                        height: 60, marginTop: 30,
                                        width: Math.round(Dimensions.get('window').width / 2.3)
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder="Select KMS"
                                    label='Kilometer'
                                    value={homeVisit.distance}
                                    rightIcon={<Icon
                                        name='menu-down'
                                        size={24}
                                        color='#2DB38D'
                                        type='material-community'
                                    />}
                                    errorMessage={homeVisit.distanceError}
                                />

                            </ModalSelector>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Fees"
                                label='Fees'
                                onChangeText={(text) => this.handleHomeVisitFeesChange(text, index)}
                                value={homeVisit.fees}
                                errorMessage={homeVisit.feesError}

                            />
                        </View>

                        {index != 0 && (
                            <Icon
                                raised
                                name='minus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.removeHomeVisit(index)} />
                        )}

                    </View>
                )
            })
        }
    }
    resetAmbulanceService = () => {
        this.setState({
            ambulanceServiceArray: [
                {
                    userId: '',
                    ambservicetype: '',
                    ambservicetypeId: '',
                    ambservicetypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    ambulanceSaveStatus: false,
                    userambserviceId: ''
                }
            ],
        })
    }
    handleAmbulanceServiceToggle = () => {
        if (this.state.ambulanceService) {
            this.props.deleteUserAllAmbulanceService(this.state.userId);
            this.resetAmbulanceService()
        }
        this.setState({
            ambulanceService: !this.state.ambulanceService
        })
    }
    renderAmbulanceType = () => {

        return this.props.ambulanceType.map((amb) => {
            return ({ label: amb.ambservicetype, key: amb.ambserviceId })

        })
    }

    handleAmbulanceTypeChange = (option, index) => {

        let { ambulanceServiceArray } = this.state;
        let ambulanceObject = ambulanceServiceArray[index];
        ambulanceObject.ambservicetype = option.label;
        ambulanceObject.ambservicetypeId = option.key;
        ambulanceObject.ambservicetypeError = null;
        ambulanceObject.ambulanceSaveStatus = false
        ambulanceServiceArray.splice(index, 1, ambulanceObject);
        this.setState({
            ambulanceServiceArray
        })

    }
    handleAmbulanceFeesChange = (text, index) => {
        let { ambulanceServiceArray } = this.state;
        let ambulanceObject = ambulanceServiceArray[index];
        ambulanceObject.fees = text;
        ambulanceObject.feesError = null;
        ambulanceObject.ambulanceSaveStatus = false
        ambulanceServiceArray.splice(index, 1, ambulanceObject);
        this.setState({
            ambulanceServiceArray
        })
    }
    handleAmbulanceKMChange = (option, index) => {
        let { ambulanceServiceArray } = this.state;
        let ambulanceObject = ambulanceServiceArray[index];
        ambulanceObject.distance = option.label;
        ambulanceObject.distanceError = null;
        ambulanceObject.ambulanceSaveStatus = false
        ambulanceServiceArray.splice(index, 1, ambulanceObject);
        this.setState({
            ambulanceServiceArray
        })
    }
    addAmbulanceType = () => {
        let { ambulanceServiceArray } = this.state
        let ambulanceObject = {
            userId: '',
            ambservicetype: '',
            ambservicetypeId: '',
            ambservicetypeError: '',
            distance: '',
            distanceError: null,
            fees: '',
            feesError: null,
            ambulanceSaveStatus: false,
            userambserviceId: ''
        }
        ambulanceServiceArray.push(ambulanceObject)
        this.setState({
            ambulanceServiceArray
        })
    }
    validateAmbulanceServiceSave = (index) => {
        let { ambulanceServiceArray } = this.state;
        let validated = true;

        let ambulanceObject = ambulanceServiceArray[index];
        if (ambulanceObject.ambservicetype === '') {
            validated = false
            ambulanceObject.ambservicetypeError = 'Select Ambulance Type';
            ambulanceServiceArray.splice(index, 1, ambulanceObject);
            this.setState({
                ambulanceServiceArray
            })
        }
        if (ambulanceObject.fees === '') {
            validated = false
            ambulanceObject.feesError = 'Select Fees';
            ambulanceServiceArray.splice(index, 1, ambulanceObject);
            this.setState({
                ambulanceServiceArray
            })
        }
        if (ambulanceObject.distance === '') {
            validated = false
            ambulanceObject.distanceError = 'Select Distance';
            ambulanceServiceArray.splice(index, 1, ambulanceObject);
            this.setState({
                ambulanceServiceArray
            })
        }
        return validated;
    }
    handleAmbulanceSave = (index) => {
        if (this.validateAmbulanceServiceSave(index)) {
            let { ambulanceServiceArray, userId } = this.state;
            let ambulanceObject = ambulanceServiceArray[index];
            ambulanceObject.ambulanceSaveStatus = true;
            ambulanceServiceArray.splice(index, 1, ambulanceObject);
            if (ambulanceObject.userambserviceId && ambulanceObject.userambserviceId != '') {
                this.props.updateAmbulanceService({
                    userId,
                    userambserviceId: ambulanceObject.userambserviceId,
                    ambservicetypeId: ambulanceObject.ambservicetypeId.toString(),
                    distance: ambulanceObject.distance,
                    fees: parseInt(ambulanceObject.fees)
                })
            } else {
                this.props.createAmbulanceService({
                    ambulanceInfo: {
                        userId,
                        ambservicetypeId: ambulanceObject.ambservicetypeId.toString(),
                        distance: ambulanceObject.distance,
                        fees: parseInt(ambulanceObject.fees)
                    },
                    ambulanceArrayIndex: index

                })
            }
            this.setState({
                ambulanceServiceArray
            })
        }

    }
    removeAmbulanceService = (index) => {
        let { ambulanceServiceArray } = this.state;
        let ambulanceObject = ambulanceServiceArray[index];
        if (ambulanceObject.userambserviceId && ambulanceObject.userambserviceId != '') {
            this.props.deleteAmbulanceService(ambulanceObject.userambserviceId)
        }
        //check for it,if there then we need to delete from database : 

        ambulanceServiceArray.splice(index, 1);
        this.setState({
            ambulanceServiceArray
        });
    }
    renderAmbulanceService = () => {
        if (this.state.ambulanceService) {
            let { ambulanceServiceArray } = this.state
            return ambulanceServiceArray.map((ambulance, index) => {
                return (
                    <View>
                        <ModalSelector
                            data={this.renderAmbulanceType()}
                            initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleAmbulanceTypeChange(option, index) }}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //  width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Amabulance Type"
                                label='Ambulance Type'
                                value={ambulance.ambservicetype}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={ambulance.ambservicetypeError}
                            />

                        </ModalSelector>
                        <View style={{ flexDirection: 'row' }}>
                            <ModalSelector
                                data={data}
                                initValue="Allopathy"
                                // supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => { this.handleAmbulanceKMChange(option, index) }}>

                                <Input

                                    containerStyle={{
                                        height: 60, marginTop: 30,
                                        width: Math.round(Dimensions.get('window').width / 2.3)
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder="Select KMS"
                                    label='Kilometer'
                                    value={ambulance.distance}
                                    rightIcon={<Icon
                                        name='menu-down'
                                        size={24}
                                        color='#2DB38D'
                                        type='material-community'
                                    />}
                                    errorMessage={ambulance.distanceError}
                                />



                            </ModalSelector>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Fees"
                                label='Fees'
                                value={ambulance.fees}
                                onChangeText={(text) => this.handleAmbulanceFeesChange(text, index)}
                                errorMessage={ambulance.feesError}

                            />
                        </View>
                        <Button
                            buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 40 }}
                            title='Save'
                            onPress={() => this.handleAmbulanceSave(index)}
                            disabled={ambulance.ambulanceSaveStatus}
                        />
                        {index != 0 && (
                            <Icon
                                raised
                                name='minus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.removeAmbulanceService(index)} />
                        )}
                    </View>
                )
            })
        }
    }
    resetLocumState = () => {
        this.setState({
            locumArray: [
                {
                    userId: '',
                    locumtype: '',
                    locumtypeError: '',
                    locumsubtype: '',
                    locumsubtypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    locumSaveStatus: false,
                    userlocumId: ''
                }
            ],
        })
    }
    handleLocumToggle = () => {
        if (this.state.locum) {
            this.props.deleteUserAllLocum(this.state.userId);
            this.resetLocumState()
        }

        this.setState({
            locum: !this.state.locum
        })
    }
    renderLocumSubType = (index) => {
        let { locumArray } = this.state;
        let locumObject = locumArray[index];
        if (locumObject.locumtype === 'ICU') {
            return locumICUSubType;
        } else if (locumObject.locumtype != '') {
            return locumSubType
        }
    }
    handleLocumSubTypeChange = (option, index) => {

        let { locumArray } = this.state;
        let locumObject = locumArray[index];
        locumObject.locumsubtype = option.label;
        locumObject.locumsubtypeError = null;
        locumObject.locumSaveStatus = false;
        locumArray.splice(index, 1, locumObject);
        this.setState({
            locumArray
        })

    }
    handleLocumTypeChange = (option, index) => {
        let { locumArray } = this.state;
        let locumObject = locumArray[index];
        locumObject.locumtype = option.label;
        locumObject.locumtypeError = null;
        locumObject.locumSaveStatus = false;
        locumObject.locumsubtype = '',
            locumArray.splice(index, 1, locumObject);
        this.setState({
            locumArray
        })

    }
    handleLocumFeesChange = (text, index) => {
        let { locumArray } = this.state;
        let locumObject = locumArray[index];
        locumObject.fees = text;
        locumObject.feesError = null;
        locumObject.locumSaveStatus = false;
        locumArray.splice(index, 1, locumObject);
        this.setState({
            locumArray
        })
    }
    handleLocumKMChange = (option, index) => {
        let { locumArray } = this.state;
        let locumObject = locumArray[index];
        locumObject.distance = option.label;
        locumObject.distanceError = null;
        locumObject.locumSaveStatus = false;
        locumArray.splice(index, 1, locumObject);
        this.setState({
            locumArray
        })
    }
    addLocumType = () => {
        let { locumArray } = this.state
        let locumObject = {
            userId: '',
            locumtype: '',
            locumtypeError: '',
            locumsubtype: '',
            locumsubtypeError: '',
            distance: '',
            distanceError: null,
            fees: '',
            feesError: null,
            userlocumId: '',
            locumSaveStatus: false
        }
        locumArray.push(locumObject)
        this.setState({
            locumArray
        })
    }
    removeLocum = (index) => {
        let { locumArray } = this.state
        let locumObject = locumArray[index];
        if (locumObject.userlocumId && locumObject.userlocumId != '') {
            this.props.deleteLocum(locumObject.userlocumId)
        }

        locumArray.splice(index, 1)
        this.setState({
            locumArray
        });
        // this.props.deleteQualification(qualificationObject.qualificationId);
    }
    validateLocumSave = (index) => {
        let { locumArray } = this.state;
        let validated = true;

        let locumObject = locumArray[index];
        if (locumObject.locumtype === '') {
            validated = false
            locumObject.locumtypeError = 'Select Locum Type';
            locumArray.splice(index, 1, locumObject);
            this.setState({
                locumArray
            })
        }
        if (locumObject.locumsubtype === '') {
            validated = false
            locumObject.locumsubtypeError = 'Select Locum Sub Type';
            locumArray.splice(index, 1, locumObject);
            this.setState({
                locumArray
            })
        }
        if (locumObject.fees === '') {
            validated = false
            locumObject.feesError = 'Select Fees';
            locumArray.splice(index, 1, locumObject);
            this.setState({
                locumArray
            })
        }
        if (locumObject.distance === '') {
            validated = false
            locumObject.distanceError = 'Select Distance';
            locumArray.splice(index, 1, locumObject);
            this.setState({
                locumArray
            })
        }
        return validated;
    }
    handleLocumSave = (index) => {
        if (this.validateLocumSave(index)) {
            let { locumArray, userId } = this.state;
            let locumObject = locumArray[index];
            locumObject.locumSaveStatus = true;
            locumArray.splice(index, 1, locumObject);
            if (locumObject.userlocumId && locumObject.userlocumId != '') {
                this.props.updateLocum({
                    userId,
                    userlocumId: locumObject.userlocumId,
                    locumtype: locumObject.locumtype,
                    locumsubtype: locumObject.locumsubtype,
                    distance: locumObject.distance,
                    fees: parseInt(locumObject.fees)
                })
            } else {
                this.props.createLocum({
                    locumInfo: {
                        userId,
                        locumtype: locumObject.locumtype,
                        locumsubtype: locumObject.locumsubtype,
                        distance: locumObject.distance,
                        fees: parseInt(locumObject.fees)
                    }, locumArrayIndex: index

                })
            }
            this.setState({
                locumArray
            })

        }

    }


    renderLocum = () => {

        if (this.state.locum) {
            let { locumArray } = this.state
            return locumArray.map((locum, index) => {

                return (
                    <View>
                        <ModalSelector
                            data={locumTypeArray}
                            initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleLocumTypeChange(option, index) }}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Loucm Services"
                                label='Loucm Services'
                                value={locum.locumtype}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={locum.locumtypeError}
                            />

                        </ModalSelector>
                        <ModalSelector
                            data={this.renderLocumSubType(index)}
                            //   initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleLocumSubTypeChange(option, index) }}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Locum Type"
                                label='Locum SubType'
                                value={locum.locumsubtype}
                                errorMessage={locum.locumsubtypeError}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                            />

                        </ModalSelector>
                        <View style={{ flexDirection: 'row' }}>
                            <ModalSelector
                                data={data}
                                initValue="Allopathy"
                                // supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => { this.handleLocumKMChange(option, index) }}>

                                <Input

                                    containerStyle={{
                                        height: 60, marginTop: 30,
                                        width: Math.round(Dimensions.get('window').width / 2.3)
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder="Select KMS"
                                    label='Kilometer'
                                    value={locum.distance}
                                    rightIcon={<Icon
                                        name='menu-down'
                                        size={24}
                                        color='#2DB38D'
                                        type='material-community'
                                    />}
                                    errorMessage={locum.distanceError}
                                />

                            </ModalSelector>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Fees"
                                label='Fees'
                                value={locum.fees}
                                onChangeText={(text) => { this.handleLocumFeesChange(text, index) }}
                                errorMessage={locum.feesError}

                            />
                        </View>
                        <Button
                            buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 40 }}
                            title='Save'
                            onPress={() => this.handleLocumSave(index)}
                            disabled={locum.locumSaveStatus}
                        />
                        {index != 0 && (
                            <Icon
                                raised
                                name='minus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.removeLocum(index)} />
                        )}
                    </View>
                )
            })
        }


    }
    resetTPAArray = () => {
        this.setState({
            tpaArray: [
                {
                    userId: '',
                    tpatype: '',
                    tpatypeError: '',
                    distance: '',
                    distanceError: null,
                    fees: '',
                    feesError: null,
                    tpaSaveStatus: false,
                    tpatypeId: '',
                    usertpaId: '',
                    tpaSaveStatus: false
                }
            ],
        })
    }
    handleTPAToggle = () => {

        if (this.state.tpa) {
            this.props.deleteUserAllTPA(this.state.userId);
            this.resetTPAArray()
        }
        this.setState({
            tpa: !this.state.tpa
        })

    }
    renderTPAType = () => {

        return this.props.TPAType.map((tpa) => {
            return ({ label: tpa.tpatype, key: tpa.tpaId })

        })
    }

    handleTPATypeChange = (option, index) => {

        let { tpaArray } = this.state;
        let tpaObject = tpaArray[index];
        tpaObject.tpatype = option.label;
        tpaObject.tpatypeId = option.key
        tpaObject.tpatypeError = null;
        tpaObject.tpaSaveStatus = false;
        tpaArray.splice(index, 1, tpaObject);
        this.setState({
            tpaArray
        })

    }
    handleTPAFeesChange = (text, index) => {
        let { tpaArray } = this.state;
        let tpaObject = tpaArray[index];
        tpaObject.fees = text;
        tpaObject.feesError = null;
        tpaObject.tpaSaveStatus = false;
        tpaArray.splice(index, 1, tpaObject);
        this.setState({
            tpaArray
        })
    }
    handleTPAKMChange = (option, index) => {
        let { tpaArray } = this.state;
        let tpaObject = tpaArray[index];
        tpaObject.distance = option.label;
        tpaObject.distanceError = null;
        tpaObject.tpaSaveStatus = false;
        tpaArray.splice(index, 1, tpaObject);
        this.setState({
            tpaArray
        })
    }
    addTPAType = () => {
        let { tpaArray } = this.state
        let tpaObject = {
            userId: '',
            tpatype: '',
            tpatypeError: '',
            distance: '',
            distanceError: null,
            fees: '',
            feesError: null,
            tpatypeId: '',
            usertpaId: '',
            tpaSaveStatus: false
        }
        tpaArray.push(tpaObject)
        this.setState({
            tpaArray
        })
    }
    removeTPA = (index) => {

        let { tpaArray } = this.state;
        let tpaObject = tpaArray[index];
        if (tpaObject.usertpaId && tpaObject.usertpaId != '') {
            this.props.deleteTPA(tpaObject.usertpaId)
        }
        //check for it,if there then we need to delete from database : 

        tpaArray.splice(index, 1)
        this.setState({
            tpaArray
        });
        // this.props.deleteQualification(qualificationObject.qualificationId);

    }
    validateTPASave = (index) => {
        let { tpaArray } = this.state;
        let validated = true;

        let tpaObject = tpaArray[index];
        if (tpaObject.tpatype === '') {
            validated = false
            tpaObject.tpatypeError = 'Select TPAa Type';
            tpaArray.splice(index, 1, tpaObject);
            this.setState({
                tpaArray
            })
        }
        if (tpaObject.fees === '') {
            validated = false
            tpaObject.feesError = 'Select Fees';
            tpaArray.splice(index, 1, tpaObject);
            this.setState({
                tpaArray
            })
        }
        if (tpaObject.distance === '') {
            validated = false
            tpaObject.distanceError = 'Select Distance';
            tpaArray.splice(index, 1, tpaObject);
            this.setState({
                tpaArray
            })
        }
        return validated;
    }
    handleTPASave = (index) => {
        if (this.validateTPASave(index)) {
            let { tpaArray, userId } = this.state;
            let tpaObject = tpaArray[index];
            tpaObject.tpaSaveStatus = true;
            tpaArray.splice(index, 1, tpaObject);
            if (tpaObject.usertpaId && tpaObject.usertpaId != '') {
                this.props.updateTPA({
                    usertpaId: tpaObject.usertpaId,
                    userId,
                    tpatypeId: tpaObject.tpatypeId.toString(),
                    distance: tpaObject.distance,
                    fees: parseInt(tpaObject.fees)
                })

            } else {
                this.props.createTPA({
                    tpaInfo: {
                        userId,
                        tpatypeId: tpaObject.tpatypeId.toString(),
                        distance: tpaObject.distance,
                        fees: parseInt(tpaObject.fees)
                    },
                    tpaArrayIndex: index

                })
            }
            this.setState({
                tpaArray
            })
        }

    }

    renderTPA = () => {
        if (this.state.tpa) {
            let { tpaArray } = this.state
            return tpaArray.map((tpa, index) => {
                return (
                    <View>
                        <ModalSelector
                            data={this.renderTPAType()}
                            initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleTPATypeChange(option, index) }}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Services"
                                label='Services'
                                value={tpa.tpatype}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                errorMessage={tpa.tpatypeError}
                            />

                        </ModalSelector>
                        <View style={{ flexDirection: 'row' }}>
                            <ModalSelector
                                data={data}
                                initValue="Allopathy"
                                // supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => this.handleTPAKMChange(option, index)}>

                                <Input

                                    containerStyle={{
                                        height: 60, marginTop: 30,
                                        width: Math.round(Dimensions.get('window').width / 2.3)
                                    }}
                                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                    placeholder="Select KMS"
                                    label='Kilometer'
                                    value={tpa.distance}
                                    rightIcon={<Icon
                                        name='menu-down'
                                        size={24}
                                        color='#2DB38D'
                                        type='material-community'
                                    />}
                                    errorMessage={tpa.distanceError}
                                />

                            </ModalSelector>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Fees"
                                label='Fees'
                                value={tpa.fees}
                                onChangeText={(text) => this.handleTPAFeesChange(text, index)}
                                errorMessage={tpa.feesError}
                            />
                        </View>
                        <Button
                            buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 40 }}
                            title='Save'
                            disabled={tpa.tpaSaveStatus}
                            onPress={() => this.handleTPASave(index)}
                        />
                        {index != 0 && (
                            <Icon
                                raised
                                name='minus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.removeTPA(index)} />
                        )}
                    </View>
                )
            })
        }
    }
    handleOtherToggle = () => {
        this.setState({
            other: !this.state.other
        })
    }
    renderOther = () => {
        if (this.state.other) {
            return (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <ModalSelector
                            data={data}
                            initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.setState({ textInputValue: option.label }) }}>

                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Services"
                                label='Services'
                                value={this.state.textInputValue}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                            />

                        </ModalSelector>
                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            placeholder="Enter Fees"
                            label='Fees'
                            value={this.state.textInputValue}

                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={this.renderQualification} />
                        <Icon
                            raised
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => console.log('hello')} />
                    </View>
                </View>
            )
        }
    }
    resetAppointmentState = () => {
        this.setState({
            servicesArray: [
                {
                    userId: '',
                    service_id: '',
                    hospitalName: '',
                    hospitalNameError: '',
                    addressLine1: '',
                    addressLine1Error: '',
                    addressLine2: '',
                    isOwner: 0,
                    shopactNo: '',
                    shopactNoError: '',
                    gstNo: '',
                    //    gstNoError: '',
                    appointmentSaveStatus: false,
                    timeStart: '',
                    timeEnd: '',
                    averageOPD: '',
                    averageOPDError: '',
                    cFees: '',
                    cFeesError: '',
                    daysType: 'Daily',
                    frequencyArray: [{
                        service_id: '',
                        frequency: 1,
                        frequencyName: 'MONDAY',
                        time_available_from: '8:00',
                        time_available_to: '20:00'
                    }]
                }
            ],
        })
    }
    handleAppointmentToggle = () => {
        if (this.state.appointment) {
            this.props.deleteDoctorAllAppointment(this.state.userId);
            this.resetAppointmentState()
        }

        this.setState({
            appointment: !this.state.appointment
        })
    }
    removeAppointment = (index) => {

        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        servicesArray.splice(index, 1)
        this.setState({
            servicesArray
        });
        // this.props.deleteQualification(qualificationObject.qualificationId);

    }

    addAppointment = () => {
        let { servicesArray } = this.state;
        let appointmentObject = {
            userId: '',
            service_id: '',
            appointmentSaveStatus: false,
            hospitalName: '',
            addressLine1: '',
            addressLine2: '',
            isOwner: '',
            shopactNo: '',
            gstNo: '',
            timeStart: '',
            timeEnd: '',
            roleId: '',
            averageOPD: '',
            cFees: '',
            daysType: 'Daily',
            frequencyArray: [{
                service_id: '',
                frequency: 0,
                frequencyName: 'DAILY',
                time_available_from: '8:00',
                time_available_fromError: null,
                time_available_toError: null,
                time_available_to: '20:00',
                average_opd: '',
                averageOPDError: '',
                fee: '',
                cFeesError: '',
            }]
        }
        servicesArray.push(appointmentObject)
        this.setState({
            servicesArray
        })
    }
    handleClinicNameChnage = (text, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.hospitalName = text;
        appointmentObject.hospitalNameError = '';
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleAddressLine1change = (text, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.addressLine1 = text;
        appointmentObject.addressLine1Error = '';
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleAddressLine2change = (text, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.addressLine2 = text;
        appointmentObject.appointmentSaveStatus = true,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleGstChange = (text, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.gstNo = text;
        appointmentObject.appointmentSaveStatus = false,

            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleShopActChange = (text, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.shopactNo = text;
        appointmentObject.appointmentSaveStatus = true,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleBusinessTypeChange = (value, index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.business_type = value;
        servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleIsOnwerChange = (index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        appointmentObject.isOwner = appointmentObject.isOwner == 1 ? 0 : 1;
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleConsulationFeesChange = (text, servicesArrayIndex, frequencyIndex) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;
        let frequencyObject = frequencyArrayObject[frequencyIndex];
        frequencyObject.fee = text;
        frequencyObject.cFeesError = '';
        frequencyArrayObject.splice(frequencyIndex, 1, frequencyObject);
        servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    handleOPDChange = (text, servicesArrayIndex, frequencyIndex) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;
        let frequencyObject = frequencyArrayObject[frequencyIndex];
        frequencyObject.average_opd = text;
        frequencyObject.averageOPDError = '';
        frequencyArrayObject.splice(frequencyIndex, 1, frequencyObject);
        servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    validateAppointment = (index) => {
        let isValid = true;
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        if (appointmentObject.hospitalName == '') {
            appointmentObject.hospitalNameError = 'Enter Clinic/Hospital Name';
            servicesArray.splice(index, 1, appointmentObject);
            this.setState({
                servicesArray
            })
            isValid = false
        }
        if (appointmentObject.addressLine1 == '') {
            appointmentObject.addressLine1Error = 'Enter Address';
            servicesArray.splice(index, 1, appointmentObject);
            this.setState({
                servicesArray
            })
            isValid = false
        }

        if (appointmentObject.cFees == '') {

            appointmentObject.cFeesError = 'Enter Consultation Fees';
            servicesArray.splice(index, 1, appointmentObject);
            this.setState({
                servicesArray
            })
            isValid = false
        }
        if (appointmentObject.averageOPD == '') {
            appointmentObject.averageOPDError = 'Enter Avergae OPD';
            servicesArray.splice(index, 1, appointmentObject);
            this.setState({
                servicesArray
            })
            isValid = false
        }
        return isValid
    }
    //start and end time handling
    showtime_available_fromPicker = (servicesArrayIndex, frequencyIndex) => {
        this.setState({
            servicesArrayIndex,
            frequencyIndex,
            isTimePickerVisible: true,
            istime_available_fromSelected: true
        });
    };
    showtime_available_toPicker = (servicesArrayIndex, frequencyIndex) => {
        this.setState({
            servicesArrayIndex,
            frequencyIndex,
            isTimePickerVisible: true,
            istime_available_fromSelected: false
        });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false, istime_available_fromSelected: false });
    };
    handleTimePicked = date => {
        let time = moment(date).format("HH:mm");
        let { servicesArrayIndex, frequencyIndex } = this.state;
        let { istime_available_fromSelected } = this.state;
        if (istime_available_fromSelected) {
            this.handletime_available_fromChange(time, servicesArrayIndex, frequencyIndex);
        } else {
            this.handletime_available_toChange(time, servicesArrayIndex, frequencyIndex)
        }
        this.hideTimePicker();

    };

    addFrequency = (index) => {
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[index];
        let frequencyArrayObject = appointmentObject.frequencyArray;

        let frequencyObject =
        {
            frequency: 1,
            service_id: '',
            frequencyName: 'MONDAY',
            time_available_from: '8:00',
            time_available_fromError: null,
            time_available_toError: null,
            time_available_to: '20:00',
            average_opd: '',
            averageOPDError: '',
            fee: '',
            cFeesError: '',
        }
        frequencyArrayObject.push(frequencyObject);
        appointmentObject.frequencyArray = frequencyArrayObject;
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(index, 1, appointmentObject);
        this.setState({
            servicesArray
        })
    }
    removeFrequency = (servicesArrayIndex, index) => {

        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;

        frequencyArrayObject.splice(index, 1)
        servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
        this.setState({
            servicesArray
        })

    }
    handleFrequencyChange = (option, servicesArrayIndex, frequencyIndex) => {
        //handle change is done
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;


        if (option.label == 'DAILY') {
            frequencyArrayObject = [];
            let frequencyObject =
            {
                frequency: 0,
                frequencyName: 'DAILY',
                time_available_from: '8:00',
                time_available_fromError: null,
                time_available_toError: null,
                time_available_to: '20:00'
            }
            frequencyArrayObject.push(
                frequencyObject
            )
            appointmentObject.frequencyArray = frequencyArrayObject;
            appointmentObject.appointmentSaveStatus = false,
                servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
            this.setState({
                servicesArray
            })
        } else {
            let frequencyObject = frequencyArrayObject[frequencyIndex];
            frequencyObject.frequencyName = option.label;
            frequencyObject.frequency = option.key;

            frequencyArrayObject.splice(frequencyIndex, 1, frequencyObject);
            appointmentObject.frequencyArray = frequencyArrayObject;
            appointmentObject.appointmentSaveStatus = false,
                servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
            this.setState({
                servicesArray
            })
        }

    }
    handletime_available_fromChange = (text, servicesArrayIndex, frequencyIndex) => {
        //handle change is done
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;
        let frequencyObject = frequencyArrayObject[frequencyIndex];
        frequencyObject.time_available_from = text;
        frequencyObject.time_available_fromError = null;
        frequencyArrayObject.splice(frequencyIndex, 1, frequencyObject);
        appointmentObject.frequencyArray = frequencyArrayObject;
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
        this.setState({
            servicesArray
        })
        //  console.log(frequencyObject);


    }
    handletime_available_toChange = (text, servicesArrayIndex, frequencyIndex) => {
        //handle change is done
        let { servicesArray } = this.state;
        let appointmentObject = servicesArray[servicesArrayIndex];
        let frequencyArrayObject = appointmentObject.frequencyArray;
        let frequencyObject = frequencyArrayObject[frequencyIndex];
        frequencyObject.time_available_to = text;
        frequencyObject.time_available_toError = null;
        frequencyArrayObject.splice(frequencyIndex, 1, frequencyObject);
        appointmentObject.frequencyArray = frequencyArrayObject;
        appointmentObject.appointmentSaveStatus = false,
            servicesArray.splice(servicesArrayIndex, 1, appointmentObject);
        this.setState({
            servicesArray
        })
        //  console.log(frequencyObject);
    }
    renderFrequency = (frequencyArray, servicesArrayIndex) => {
        return frequencyArray.map((frequency, index) => {
            return (
                <View>
                    <View style={{ flexDirection: 'row' }}>

                        <ModalSelector
                            data={opeartingDays}
                            //   initValue="Allopathy"
                            // supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => { this.handleFrequencyChange(option, servicesArrayIndex, index) }}
                        >
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 3.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Select Operating Days"
                                label='Days'
                                value={frequency.frequencyName}

                                //   errorMessage={locum.locumsubtypeError}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                            />

                        </ModalSelector>
                        <TouchableOpacity onPress={() => this.showtime_available_fromPicker(servicesArrayIndex, index)}>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 3.3)
                                }}
                                disabled={true}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Start Time"
                                label='Start Time'
                                value={frequency.time_available_from}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                            //   onChangeText={(text) => { this.handletime_available_fromChange(text, servicesArrayIndex, index) }}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showtime_available_toPicker(servicesArrayIndex, index)}>
                            <Input

                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    width: Math.round(Dimensions.get('window').width / 3.3)
                                }}
                                disabled={true}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter End Time"
                                label='End Time'
                                //   onChangeText={(text) => { this.handletime_available_toChange(text, servicesArrayIndex, index) }}
                                rightIcon={<Icon
                                    name='menu-down'
                                    size={24}
                                    color='#2DB38D'
                                    type='material-community'
                                />}
                                value={frequency.time_available_to}
                            // errorMessage={frequency.time_available_toError}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input

                            containerStyle={{
                                height: 60, marginTop: 30,
                                width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            placeholder="Enter Average OPD"
                            label='Average OPD'
                            onChangeText={(text) => this.handleOPDChange(text, servicesArrayIndex, index)}
                            value={frequency.average_opd}
                            keyboardType='number-pad'
                            errorMessage={frequency.averageOPDError}
                        />


                        <Input
                            containerStyle={{
                                height: 60, marginTop: 30,
                                width: Math.round(Dimensions.get('window').width / 2.3)
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            placeholder="Enter Consultation Fee"
                            label='Consultation Fee'
                            onChangeText={(text) => this.handleConsulationFeesChange(text, servicesArrayIndex, index)}
                            value={frequency.fee}
                            keyboardType='number-pad'
                            errorMessage={frequency.cFeesError}

                        />
                    </View>
                    {index != 0 && (
                        <Icon
                            raised
                            containerStyle={{ marginTop: 10 }}
                            name='minus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={() => this.removeFrequency(servicesArrayIndex, index)} />
                    )}
                </View>

            )
        })
    }
    addServices = (serviceId) => {
        let { servicesArray } = this.state;
        let serviceObject = {
            service_id: serviceId,
            appointmentSaveStatus: false,
            hospitalName: '',
            addressLine1: '',
            addressLine2: '',
            shopactNo: '',
            gstNo: '',
            business_type: 'hospital',
            roleId: '',
            daysType: 'Daily',
            frequencyArray: [{
                service_id: serviceId,
                frequency: 0,
                frequencyName: 'DAILY',
                time_available_from: '8:00',
                time_available_fromError: null,
                time_available_toError: null,
                time_available_to: '20:00',
                average_opd: '',
                averageOPDError: '',
                fee: '',
                cFeesError: '',
            }]
        }
        servicesArray.push(serviceObject)
        this.setState({
            servicesArray
        })
    }

    toggleServices = (id) => {
        let { servicesArray, servicesState } = this.state;
        let index = findIndex(servicesArray, { service_id: id });
        console.log('toggleServices',index)
        if (index != -1) {
            servicesArray = remove(servicesArray, { service_id: id });
            servicesState = remove(servicesState, id);
            this.setState({
                servicesArray: servicesArray,
                servicesState: servicesState
            })
        } else {
            console.log('coming inside else',id)
            this.addServices(id);
            servicesState.push(id);
            this.setState({
                servicesState: servicesState
            })
            //add it to the array
        }
        // check if the serviceId exist, if yes remove and if not then add

    }

    renderServices = () => {
        return this.props.services.map((service, index) => {
            return (
                <View>
                    <CheckBox
                        title={service.name}
                        checked={this.state.servicesState.indexOf(service.service_id)!=-1?true:false}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={() =>this.toggleServices(service.service_id)}
                        checkedColor='#2DB38D'
                    />
                    {this.renderAppointment(service.service_id)}
                </View>
            )
        })
    }

    renderAppointment = (serviceId) => {
    
        if (this.state.servicesState.indexOf(serviceId)!=-1) {
            let { servicesArray, frequencyArray } = this.state;
            // console.log()
            return servicesArray.map((appointment, index) => {
                return (
                    <View>
                        <View style={{
                            borderWidth: 0.5,
                            borderRadius: 5,
                            borderColor: 'grey',
                            padding: 5,
                            marginTop: 5
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CheckBox
                                    title='Hospital'
                                    checked={appointment.business_type == 'hospital' ? true : false}
                                    textStyle={{ marginLeft: -1 }}
                                    containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                    onPress={() => this.handleBusinessTypeChange('hospital', index)}
                                    checkedColor='#2DB38D'
                                />
                                <CheckBox
                                    title='Clinic'
                                    checked={appointment.business_type == 'clinic' ? true : false}
                                    textStyle={{ marginLeft: -1 }}
                                    containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                    onPress={() => this.handleBusinessTypeChange('clinic', index)}
                                    checkedColor='#2DB38D'
                                />
                            </View>
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.3)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder="Enter Clinic / Hospital Name"
                                label='Clinic Name'
                                onChangeText={(text) => this.handleClinicNameChnage(text, index)}
                                value={appointment.hospitalName}
                                errorMessage={appointment.hospitalNameError}
                            />
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    // width: Math.round(Dimensions.get('window').width / 2.2)
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder='Enter Address Line 1'
                                label='Address Line 1'
                                onChangeText={(text) => this.handleAddressLine1change(text, index)}
                                value={appointment.addressLine1}
                                errorMessage={appointment.addressLine1Error}

                            />
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.2) 
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder='Enter Address Line 2'
                                label='Address Line 2'
                                onChangeText={(text) => this.handleAddressLine2change(text, index)}
                                value={appointment.addressLine2}

                            />
                            <Input
                                containerStyle={{
                                    height: 60, marginTop: 30,
                                    //   width: Math.round(Dimensions.get('window').width / 2.2) 
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                placeholder='Enter Shop Act / GST'
                                label='Shop Act / GST'
                                onChangeText={(text) => this.handleShopActChange(text, index)}
                                value={appointment.shopactNo}
                            //   errorMessage={appointment.gstNoError}

                            />

                            {this.renderFrequency(appointment.frequencyArray, index)}

                            {appointment.frequencyArray[0].frequencyName != 'DAILY' && (
                                <Icon
                                    raised
                                    containerStyle={{ marginTop: 10 }}
                                    name='plus'
                                    type='font-awesome'
                                    color='#2DB38D'
                                    size={12}
                                    onPress={() => this.addFrequency(index)} />
                            )}

                        </View>
                        {index != 0 && (
                            <Icon
                                raised
                                containerStyle={{ marginTop: 10 }}
                                name='minus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={() => this.removeAppointment(index)} />
                        )}
                    </View>
                )
            })
        }
    }

    renderWorkWithUs = () => {
        if (this.state.workingWithUs) {
            return (
                <View style={{
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: 'grey',
                    padding: 5,
                    marginTop: 5
                }}>
                    <View style={{ backgroundColor: '#F7F7F7', }}>
                        <Text>Working Info</Text>
                    </View>

                    <CheckBox
                        title='Online Consultation'
                        checked={this.state.onlineConsulationStatus}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleOnlineConsulationToggle}
                        checkedColor='#2DB38D'
                    />

                    {this.renderOnlineConsulation()}
                    {/*   <CheckBox
                        title='Home Visit'
                        checked={this.state.homeVisit}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleHomeVisitToggle}
                        checkedColor='#2DB38D'
                    />

                   {this.renderHomeVisit()}
                    {this.state.homeVisit && (
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={this.addHomeVisitType} />
                    )}

                    <CheckBox
                        title='Ambulance Services'
                        checked={this.state.ambulanceService}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleAmbulanceServiceToggle}
                        checkedColor='#2DB38D'
                    />

                    {this.renderAmbulanceService()}
                    {this.state.ambulanceService && (
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={this.addAmbulanceType} />
                    )}

                    <CheckBox
                        title='Locum'
                        checked={this.state.locum}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleLocumToggle}
                        checkedColor='#2DB38D'
                    />
                    {this.renderLocum()}
                    {this.state.locum && (

                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={this.addLocumType} />
                    )}

                    <CheckBox
                        title='TPA'
                        checked={this.state.tpa}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleTPAToggle}
                        checkedColor='#2DB38D'
                    />

                    {this.renderTPA()}
                    {this.state.tpa && (
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#2DB38D'
                            size={12}
                            onPress={this.addTPAType} />
                    )} */}


                    {/* <CheckBox
                        title='Appointment'
                        checked={this.state.appointment}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleAppointmentToggle}
                        checkedColor='#2DB38D'
                    /> */}

                    {this.renderServices()}
                    {/* {this.renderAppointment()}
                    {this.state.appointment && (
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                raised
                                name='plus'
                                type='font-awesome'
                                color='#2DB38D'
                                size={12}
                                onPress={this.addAppointment} />

                        </View>
                    )} */}

                    {/* <CheckBox
                        title='Other'
                        checked={this.state.other}
                        textStyle={{ marginLeft: -1 }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, marginLeft: -1 }}
                        onPress={this.handleOtherToggle}
                        checkedColor='#2DB38D'
                    /> */}
                    {/* {this.renderOther()} */}
                </View >
            )
        }
    }


    render() {
        let { tpaCRUDRequested, appointmentCRUDRequested, onlimeCRUDRequested, locumCRUDRequested, ambCRUDRequested, homeVisitCRUDRequested, ambulanceError, ambulanceType, streamsError, qualifications, qualificationsError, specialities, specialityError } = this.props;
        let { workingWithUs, selectedRoles, onlineConsulation, servicesArray } = this.state;
        console.log(this.state.servicesState);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2DB38D' }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={true}
                    >
                        <View style={{
                            backgroundColor: '#2DB38D',

                        }}>
                            <Spinner color='grey'
                                visible={tpaCRUDRequested || locumCRUDRequested ||
                                    ambCRUDRequested || homeVisitCRUDRequested ||
                                    onlimeCRUDRequested || appointmentCRUDRequested
                                }
                            />
                            <View style={{
                                backgroundColor: 'white',
                                margin: 10,
                                padding: 5,
                                borderRadius: 5

                            }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2DB38D' }}>Healthcare Professional Info</Text>

                                </View>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    maximumDate={new Date()}
                                />
                                <DateTimePicker
                                    isVisible={this.state.isTimePickerVisible}
                                    onConfirm={this.handleTimePicked}
                                    onCancel={this.hideTimePicker}
                                    mode='time'


                                />
                                {this.renderHealthCareprofessional()}
                                {selectedRoles != '' && (
                                    <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Would you like to work with us?</Text>
                                        <Switch
                                            value={workingWithUs}
                                            onChange={this.toggleWorking}
                                            trackColor={{ true: '#2DB38D' }}
                                        />
                                    </View>
                                )}
                                {this.renderWorkWithUs()}
                                <Button
                                    buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 10 }}
                                    title='Continue'
                                    onPress={this.handleSubmit}
                                />
                            </View>

                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView >

        )
    }
}
