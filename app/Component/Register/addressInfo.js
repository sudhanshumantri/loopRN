import React from 'react';
import { View, Text, TextInput, AsyncStorage, TouchableOpacity, Modal, Dimensions, FlatList, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Card, Input, Button, SearchBar, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSelector from 'react-native-modal-selector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
let index = 0;
const country = [
    { country_code: index++, name: 'Red Apples' },
    { country_code: index++, name: 'Cherries' },
    { country_code: index++, name: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
];
const state = [
    { state_code: index++, name: 'state1' },
    { state_code: index++, name: 'state2' },
    { state_code: index++, name: 'state3', accessibilityLabel: 'Tap here for cranberries' },
];
const city = [
    { city_code: index++, name: 'city one' },
    { city_code: index++, name: 'city two' },
    { city_code: index++, name: 'city 3', accessibilityLabel: 'Tap here for cranberries' },
];
export default class ProfileRegistrationAddressInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            reuseAddress: false,
            searchDropdown: '',
            showModal: false,
            isHealthCareProfessional: false,
            userId: '',
            user: null,
            residentialAddress: {
                contact_type: 'Residential',
                address1: '',
                address1Error: '',
                address2: '',
                city: '',
                cityName: '',
                cityError: '',
                country: '',
                countryError: '',
                state: '',
                stateName: '',
                stateError: '',
                pincode: '',
                pincodeError: '',
                countryName: '',
                alt_mobile: '',
                alt_mobileError: '',
                phone: '',
                email_id: null,
                emailError: ''
            },
            permanentAddress: {
                contact_type: 'Permanent',
                address1: '',
                address1Error: '',
                address2: '',
                city: '',
                cityError: '',
                country: '',
                countryError: '',
                state: '',
                stateError: '',
                pincode: '',
                pincodeError: '',
                alt_mobile: '',
                alt_mobileError: '',
                phone: '',
                email_id: '',
                countryName: '',
                emailError: ''
            }

        }
    }
    componentDidMount() {
        this.props.fetchCountry();
        this.setState({
            user: this.props.navigation.state.params.user
        })
        this.bootstrapAsyncUserToken().then(info => {
            this.setState({
                userId: parseInt(info.userId)
            })

        });
    }
    bootstrapAsyncUserToken = async () => {
        return {
            userId: await AsyncStorage.getItem('userId'),
            token: await AsyncStorage.getItem('token')
        };

    };
    validateResidentialAddress = (address) => {
        let validated = true;
        let {
            address1,
            address1Error,
            address2,
            city,
            cityName,
            cityError,
            country,
            countryError,
            state,
            stateName,
            stateError,
            pincode,
            pincodeError,
            countryName,
            email_id,

        } = this.state.residentialAddress;

        //hanle only residential address
        let { residentialAddress } = this.state;
        if (address1 === '') {
            validated = false;

            residentialAddress.address1Error = 'Please Enter Address';
        }
        if (country === '') {
            validated = false;
            residentialAddress.countryError = 'Please Select Country';


        }
        if (state === '') {
            validated = false;
            residentialAddress.stateError = 'Please Select State';

        }
        if (city === '') {
            validated = false;
            residentialAddress.cityError = 'Please Select City';


        }
        if (pincode === '' || (countryName === 'India' && pincode.length != 6)) {
            validated = false;
            residentialAddress.pincodeError = 'Please Enter Valid Pincode';


        }
        // if (email_id !== '' && (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_id)))) {
        //     validated = false;
        //     residentialAddress.emailError = 'Please Enter Valid Email';


        // }
        this.setState({
            residentialAddress: residentialAddress
        })
        if (this.state.reuseAddress) {
            return validated && this.validatePermanentAddress()
        }

        return validated
    }

    validatePermanentAddress = (address) => {
        //    console.log('validatePermanentAddress');
        let validated = true;
        let {
            address1,
            address1Error,
            address2,
            city,
            cityName,
            cityError,
            country,
            countryError,
            state,
            stateName,
            stateError,
            pincode,
            pincodeError,
            countryName,
            email_id
        } = this.state.permanentAddress;
        let { permanentAddress } = this.state
        //hanle only residential address
        if (address1 === '') {
            validated = false;

            permanentAddress.address1Error = 'Please Enter Address';
        }
        if (country === '') {
            validated = false;
            permanentAddress.countryError = 'Please Select Country';


        }
        if (state === '') {
            validated = false;
            permanentAddress.stateError = 'Please Select State';

        }
        if (city === '') {
            validated = false;
            permanentAddress.cityError = 'Please Select City';


        }
        if (pincode === '' || (countryName === 'India' && pincode.length != 6)) {
            validated = false;
            permanentAddress.pincodeError = 'Please Enter Valid Pincode';


        }
        // if (email_id !== '' && (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_id)))) {
        //     validated = false;
        //     permanentAddress.emailError = 'Please Enter Valid Email';


        // }
        this.setState({
            permanentAddress: permanentAddress
        })
        return validated
    }


    handleSubmit = () => {
        let { reuseAddress, isHealthCareProfessional } = this.state;

        let {
            address1,
            contact_type,
            address1Error,
            address2,
            city,
            cityName,
            cityError,
            country,
            countryError,
            state,
            stateName,
            stateError,
            pincode,
            pincodeError,
            alt_mobile,
            phone,
            email_id
        } = this.state.residentialAddress;
        if (this.validateResidentialAddress()) {
            let residentailAddressObject = {
                //  userId: this.state.userId,
                contact_type,
                addressline_1: address1,
                addressline_2: address2,
                city_code: city,
                country_code: country,
                state_code: state,
                area_pin_code: pincode,
                alt_mobile: alt_mobile == '' ? null : alt_mobile,
                phone: phone == '' ? null : phone,
                email_id:email_id == '' ? null : email_id,
            }
            if (reuseAddress) {
                let {
                    address1,
                    contact_type,
                    address1Error,
                    address2,
                    city,
                    cityName,
                    cityError,
                    country,
                    countryError,
                    state,
                    stateName,
                    stateError,
                    pincode,
                    pincodeError,
                    countryName,
                    alt_mobile,
                    phone,
                    email_id
                } = this.state.permanentAddress;
                let permanentAddressObject = {
                    contact_type,
                    addressline_1: address1,
                    addressline_2: address2,
                    city_code: city,
                    country_code: country,
                    state_code: state,
                    area_pin_code: pincode,
                    alt_mobile: alt_mobile == '' ? null : alt_mobile,
                    phone: phone == '' ? null : phone,
                    email_id
                }
                let contact = [
                    residentailAddressObject,
                    permanentAddressObject
                ];
                if (isHealthCareProfessional) {
                    this.props.navigation.navigate('ProfileRegistrationHealthcareProfessionalInfo', { contact: contact, user: this.state.user })
                } else {
                    this.props.saveUserProfile({
                        contact: contact, user: this.state.user
                    })
                }
            } else {
                let contact = [
                    residentailAddressObject,
                ];
                if (isHealthCareProfessional) {
                    this.props.navigation.navigate('ProfileRegistrationHealthcareProfessionalInfo', { contact: contact, user: this.state.user })
                } else {
                    this.props.saveUserProfile({
                        contact: contact, user: this.state.user
                    })
                }
                //  this.props.navigation.navigate('ProfileRegistrationHealthcareProfessionalInfo', { contact: contact, user: this.state.user })
            }
        }
    }

    toggleAddreesReuse = () => {
        this.setState({
            reuseAddress: !this.state.reuseAddress
        })
    }
    toggleHealthCareProfessional = () => {
        this.setState({
            isHealthCareProfessional: !this.state.isHealthCareProfessional
        })
    }
    handleResidentailAddress1Change = (text) => {

        this.setState({
            residentialAddress: {
                ...this.state.residentialAddress,
                address1: text,
                address1Error: ''
            }

        })
    }
    handleResidentailAddress2Change = (text) => {

        this.setState({
            residentialAddress: { ...this.state.residentialAddress, address2: text, }

        })
    }
    handleResidentailCountryChange = (option) => {
        this.setState({
            residentialAddress: {
                ...this.state.residentialAddress,
                country: option.key.toString(),
                countryName: option.label,
                countryError: '',
            }

        })
        this.props.fetchState(option.key)
    }
    handleResidentailStateChange = (option) => {
        this.setState({
            residentialAddress: {
                ...this.state.residentialAddress,
                state: option.key.toString(),
                stateName: option.label,
                stateError: ''
            }

        });
        this.props.fetchCity(option.key);
    }
    handleResidentailCityChange = (option) => {

        this.setState({
            residentialAddress: {
                ...this.state.residentialAddress,
                city: option.key.toString(),
                cityName: option.label,
                cityError: ''
            }

        })
    }
    handleResidentailPincodeChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                residentialAddress: { ...this.state.residentialAddress, pincode: text, pincodeError: '' }

            })
        }
    }
    handleResidentailAltMobileChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                residentialAddress: { ...this.state.residentialAddress, alt_mobile: text, alt_mobileError: '' }

            })
        }
    }
    handleResidentailEmailChange = (text) => {
        // if (/^[\d]+$/.test(text) || text === '') {
        this.setState({
            residentialAddress: { ...this.state.residentialAddress, email_id: text, emailError: '' }

        })
        //  }
    }
    handleResidentailLandLineChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                residentialAddress: { ...this.state.residentialAddress, phone: text, }

            })
        }
    }
    showModal = (type) => {
        this.setState({
            showModal: true,
            modalType: type
        })
    }
    hideModal = (type) => {
        this.setState({
            showModal: false,
            selectedItems: [],
            modalType: '',
            searchDropdown: ''
        })
    }
    keyExtractor = (item) => {
        let { modalType } = this.state;
        if (modalType == 'res-country' || modalType == 'perm-country') {
            return item.country_code.toString();

        }
        else if (modalType == 'res-state' || modalType == 'perm-state') {
            return item.state_code.toString();
        }
        else if (modalType == 'res-city' || modalType == 'perm-city') {
            return item.city_code.toString();
        }
    }
    renderAddressDropdownItem = ({ item }) => {
        let { modalType, searchDropdown } = this.state;
        if (item.name.toLowerCase().startsWith(searchDropdown.toLowerCase()))
            return (
                <TouchableOpacity style={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                    onPress={() => this.handleItmeSelection(item)}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )
        // } else {
        //     if (item.name.toLowerCase().startsWith(searchDropdown.toLowerCase()))
        //         return (
        //             <TouchableOpacity style={{
        //                 padding: 10,
        //                 marginTop: 2,
        //                 backgroundColor: '#ddd',
        //                 borderColor: '#bbb',
        //                 borderWidth: 1,
        //                 borderRadius: 5,
        //             }}
        //                 onPress={() => this.handleItmeSelection(item)}

        //             >
        //                 <Text>{item.name}</Text>
        //             </TouchableOpacity>
        //         )
        // }
    }
    handleItmeSelection = (item) => {
        let { modalType } = this.state;
        if (modalType == 'res-country') {
            this.setState({
                residentialAddress: {
                    ...this.state.residentialAddress,
                    country: item.country_code.toString(),
                    countryName: item.name,
                    countryError: '',
                }

            })
            this.props.fetchState(item.country_code)
        } else if (modalType == 'res-state') {
            this.setState({
                residentialAddress: {
                    ...this.state.residentialAddress,
                    state: item.state_code.toString(),
                    stateName: item.name,
                    stateError: ''
                }

            });
            this.props.fetchCity(item.state_code);
        }
        else if (modalType == 'res-city') {
            this.setState({
                residentialAddress: {
                    ...this.state.residentialAddress,
                    city: item.city_code.toString(),
                    cityName: item.name,
                    cityError: ''
                }

            })
        }
        //permanent address changes man :
        else if (modalType == 'perm-country') {
            this.setState({
                permanentAddress: {
                    ...this.state.permanentAddress,
                    country: item.country_code.toString(),
                    countryName: item.name,
                    countryError: '',
                }

            })
            this.props.fetchPermanentAddrState(item.country_code)
        } else if (modalType == 'perm-state') {
            this.setState({
                permanentAddress: {
                    ...this.state.permanentAddress,
                    state: item.state_code.toString(),
                    stateName: item.name,
                    stateError: ''
                }

            });
            this.props.fetchPermanentAddrCity(item.state_code);
        }
        else if (modalType == 'perm-city') {
            this.setState({
                permanentAddress: {
                    ...this.state.permanentAddress,
                    city: item.city_code.toString(),
                    cityName: item.name,
                    cityError: ''
                }

            })
        }
        this.hideModal()

    }
    updateSearchModaal = searchDropdown => {

        this.setState({ searchDropdown });
    };

    renderModal = () => {
        let { modalType, searchDropdown } = this.state;
        //    this.props.countryList
        let { countryList,
            stateList,
            cityList,
            permAddrStateData,
            permAddrCityData,
        } = this.props;
        // console.log(modalType)

        let data = [];
        let title = ''
        if (modalType == 'res-country' || modalType == 'perm-country') {
            data = countryList;

        } else if (modalType == 'res-state') {
            data = stateList;

        } else if (modalType == 'res-city') {
            data = cityList;
        }
        else if (modalType == 'perm-state') {
            data = permAddrStateData;

        } else if (modalType == 'perm-city') {
            data = permAddrCityData;
        }
        //   console.log(data);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={this.hideModal}
            >
                <SafeAreaView style={{}}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginBottom: 10, padding: 20 }}>
                            <Icon size={22} color="grey" name="close" type='material-community' onPress={this.hideModal} />
                        </View>
                        <View>
                            <SearchBar
                                placeholder="Search ..."
                                onChangeText={this.updateSearchModaal}
                                // containerStyle={{
                                //     width: wp('90%'),
                                //     backgroundColor: '#2DB38D',
                                //     borderTopWidth: 0, borderBottomWidth: 0
                                // }}
                                inputStyle={{ color: '#2DB38D' }}
                                inputContainerStyle={{ backgroundColor: 'white' }}
                                searchIcon={{ color: '#2DB38D' }}
                                value={searchDropdown}
                                clearIcon
                            />
                        </View>
                        <FlatList
                            //   ListHeaderComponent={this.renderSelectedType}
                            keyExtractor={this.keyExtractor}
                            data={data}
                            renderItem={this.renderAddressDropdownItem}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state.searchDropdown}
                        //    ListEmptyComponent={'Nothing Found'}

                        />
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        )
    }



    renderResidentialAddressCountry = () => {
        //  console.log(this.props.countryList);
        return this.props.countryList.map((country) => {

            return ({ label: country.name, key: country.country_code })

        })

    }
    renderResidentialAddressState = () => {
        return this.props.stateList.map((state) => {

            return ({ label: state.name, key: state.state_code })

        })

    }

    renderResidentialAddressCity = () => {
        //  console.log(this.props.countryList);
        return this.props.cityList.map((city) => {

            return ({ label: city.name, key: city.city_code })

        })

    }
    renderResidentialAddress = () => {
        let { residentialAddress } = this.state;
        return (
            <View style={{
                // borderWidth: 0.5,
                // borderRadius: 5,
                // borderColor: 'grey',
                padding: 5,
                marginBottom: 5
            }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2DB38D' }}>Residential Address</Text>

                </View>
                <Input
                    containerStyle={{
                        height: 60, marginTop: 10,

                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Address '
                    value={residentialAddress.address1}
                    label='Address'
                    onChangeText={text => this.handleResidentailAddress1Change(text)}

                    errorMessage={residentialAddress.address1Error}

                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        //   width: Math.round(Dimensions.get('window').width / 2.2) 
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Address '
                    label='Address'

                    value={residentialAddress.address2}
                    onChangeText={text => this.handleResidentailAddress2Change(text)}


                />
                {/* <ModalSelector
                    data={this.renderResidentialAddressCountry()}
                    initValue="Select Country"
                    // supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.handleResidentailCountryChange(option) }}> */}

                <TouchableOpacity onPress={() => this.showModal('res-country')}>
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,

                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder="Select Country"
                        label='Country'
                        editable={false}
                        value={this.state.residentialAddress.countryName}
                        rightIcon={<Icon
                            name='menu-down'
                            size={24}
                            color='#2DB38D'
                            type='material-community'
                            onPress={() => this.showModal('res-country')}
                        />}
                        errorMessage={residentialAddress.countryError}
                    />
                </TouchableOpacity>

                {/* </ModalSelector> */}
                {/* <ModalSelector
                    data={this.renderResidentialAddressState()}
                    initValue="Select State"
                    // supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.handleResidentailStateChange(option) }}> */}

                <TouchableOpacity onPress={() => this.showModal('res-state')}>
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,

                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        editable={false}
                        placeholder="Select State"
                        label='State'
                        value={this.state.residentialAddress.stateName}
                        rightIcon={<Icon
                            name='menu-down'
                            size={24}
                            color='#2DB38D'
                            type='material-community'
                            onPress={() => this.showModal('res-state')}
                        />}
                        errorMessage={residentialAddress.stateError}
                    />
                </TouchableOpacity>

                {/* </ModalSelector> */}
                {/* <ModalSelector
                    data={this.renderResidentialAddressCity()}
                    initValue="Select City"
                    // supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.handleResidentailCityChange(option) }}> */}
                <TouchableOpacity onPress={() => this.showModal('res-city')}>
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,

                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        editable={false}
                        placeholder="Select City"
                        label='City'
                        value={this.state.residentialAddress.cityName}
                        rightIcon={<Icon
                            name='menu-down'
                            size={24}
                            color='#2DB38D'
                            type='material-community'
                            onPress={() => this.showModal('res-city')}
                        />}
                        errorMessage={residentialAddress.cityError}
                    />
                </TouchableOpacity>

                {/* </ModalSelector> */}


                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        //     width: Math.round(Dimensions.get('window').width / 2)
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Pincode'
                    label='Pincode'
                    value={residentialAddress.pincode}
                    onChangeText={text => this.handleResidentailPincodeChange(text)}
                    errorMessage={residentialAddress.pincodeError}

                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        //  width: Math.round(Dimensions.get('window').width / 2)
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Alternate Mobile'
                    label='Alternate Mobile'
                    value={residentialAddress.alt_mobile}
                    onChangeText={text => this.handleResidentailAltMobileChange(text)}
                    errorMessage={residentialAddress.altPhoneError}
                    keyboardType='phone-pad'

                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        //  width: Math.round(Dimensions.get('window').width / 2)
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Landline'
                    label='Landline'
                    value={residentialAddress.phone}
                    onChangeText={text => this.handleResidentailLandLineChange(text)}
                    keyboardType='phone-pad'
                //    errorMessage={residentialAddress.pincodeError}

                />
                <Input
                    containerStyle={{
                        height: 60, marginTop: 30,
                        // width: Math.round(Dimensions.get('window').width / 2)
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0.5 }}
                    placeholder='Enter Email'
                    label='Email'
                    value={residentialAddress.email_id}
                    onChangeText={text => this.handleResidentailEmailChange(text)}
                    errorMessage={residentialAddress.emailError}
                    keyboardType='email-address'

                />


            </View>

        )
    }
    renderPermanentAddressState = () => {
        //  console.log(this.props.countryList);
        return this.props.permAddrStateData.map((state) => {

            return ({ label: state.name, key: state.state_code })

        })

    }

    renderPermanentAddressCity = () => {
        //  console.log(this.props.countryList);
        return this.props.permAddrCityData.map((city) => {

            return ({ label: city.name, key: city.city_code })

        })

    }
    handlePermanentAddress1Change = (text) => {

        this.setState({
            permanentAddress: { ...this.state.permanentAddress, address1: text, address1Error: '' }

        })
    }
    handlePermanentAddress2Change = (text) => {

        this.setState({
            permanentAddress: { ...this.state.permanentAddress, address2: text, }

        })
    }
    handlePermanentCountryChange = (option) => {
        this.setState({
            permanentAddress: {
                ...this.state.permanentAddress,
                country: option.key.toString(),
                countryName: option.label,
                countryError: null
            }

        })

        this.props.fetchPermanentAddrState(option.key)
    }
    handlePermanentStateChange = (option) => {
        this.setState({
            permanentAddress: {
                ...this.state.permanentAddress,
                state: option.key.toString(),
                stateName: option.label,
                stateError: ''
            }

        })
        this.props.fetchPermanentAddrCity(option.key)
    }
    handlePermanentCityChange = (option) => {

        this.setState({
            permanentAddress: {
                ...this.state.permanentAddress,
                city: option.key.toString(),
                cityName: option.label,
                cityError: ''
            }

        })
    }
    handlePermanentPincodeChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                permanentAddress: { ...this.state.permanentAddress, pincode: text, pincodeError: '' }

            })
        }
    }
    handlePermanentAltMobileChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                permanentAddress: { ...this.state.permanentAddress, alt_mobile: text, alt_mobileError: '' }

            })
        }
    }
    handlePermanentlEmailChange = (text) => {
        // if (/^[\d]+$/.test(text) || text === '') {
        this.setState({
            permanentAddress: { ...this.state.permanentAddress, email_id: text, emailError: '' }

        })
        //  }
    }
    handlePermanentLandLineChange = (text) => {
        if (/^[\d]+$/.test(text) || text === '') {
            this.setState({
                permanentAddress: { ...this.state.permanentAddress, phone: text, }

            })
        }
    }
    renderPermanentAddress = () => {
        if (this.state.reuseAddress) {
            let { permanentAddress } = this.state;
            return (
                <View style={{
                    // borderWidth: 0.5,
                    // borderRadius: 5,
                    borderColor: 'grey',
                    padding: 5
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2DB38D' }}>Permanent Address</Text>

                    </View>


                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            // width: Math.round(Dimensions.get('window').width / 2.2)
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Address '
                        value={permanentAddress.address1}
                        label='Address'
                        onChangeText={text => this.handlePermanentAddress1Change(text)}
                        errorMessage={permanentAddress.address1Error}

                    />
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            //   width: Math.round(Dimensions.get('window').width / 2.2) 
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Address'
                        label='Address'

                        value={permanentAddress.address2}
                        onChangeText={text => this.handlePermanentAddress2Change(text)}


                    />
                    {/* <ModalSelector
                        data={this.renderResidentialAddressCountry()}
                        initValue="Select Country"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => { this.handlePermanentCountryChange(option) }}> */}

                    <TouchableOpacity onPress={() => this.showModal('perm-country')}>
                        <Input
                            containerStyle={{
                                height: 60, marginTop: 30,

                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select Country"
                            label='Country'
                            value={permanentAddress.countryName}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                                onPress={() => this.showModal('perm-country')}
                            />}
                            errorMessage={permanentAddress.countryError}
                        />
                    </TouchableOpacity>
                    {/* </ModalSelector> */}
                    {/* <ModalSelector
                        data={this.renderPermanentAddressState()}
                        initValue="Select State"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => { this.handlePermanentStateChange(option) }}> */}
                    <TouchableOpacity onPress={() => this.showModal('perm-state')}>
                        <Input
                            containerStyle={{
                                height: 60, marginTop: 30,

                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select State"
                            label='State'
                            value={permanentAddress.stateName}
                            errorMessage={permanentAddress.stateError}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                                onPress={() => this.showModal('perm-state')}
                            />}
                        />
                    </TouchableOpacity>
                    {/* </ModalSelector>
                    <ModalSelector
                        data={this.renderPermanentAddressCity()}
                        initValue="Select City"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => { this.handlePermanentCityChange(option) }}> */}
                    <TouchableOpacity onPress={() => this.showModal('perm-city')}>
                        <Input
                            containerStyle={{
                                height: 60, marginTop: 30,

                            }}
                            inputContainerStyle={{ borderBottomWidth: 0.5 }}
                            editable={false}
                            placeholder="Select City"
                            label='City'
                            value={permanentAddress.cityName}
                            errorMessage={permanentAddress.cityError}
                            rightIcon={<Icon
                                name='menu-down'
                                size={24}
                                color='#2DB38D'
                                type='material-community'
                                onPress={() => this.showModal('perm-city')}
                            />}
                        />
                    </TouchableOpacity>
                    {/* </ModalSelector> */}


                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            //  width: Math.round(Dimensions.get('window').width / 2)
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Pincode'
                        label='Pincode'
                        value={permanentAddress.pincode}
                        onChangeText={text => this.handlePermanentPincodeChange(text)}
                        errorMessage={permanentAddress.pincodeError}

                    />
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            //  width: Math.round(Dimensions.get('window').width / 2)
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Alternate Mobile'
                        label='Alternate Mobile'
                        value={permanentAddress.alt_mobile}
                        onChangeText={text => this.handlePermanentAltMobileChange(text)}
                        errorMessage={permanentAddress.altPhoneError}
                        keyboardType='phone-pad'

                    />
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            //  width: Math.round(Dimensions.get('window').width / 2)
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Landline'
                        label='Landline'
                        value={permanentAddress.phone}
                        onChangeText={text => this.handlePermanentLandLineChange(text)}
                        keyboardType='phone-pad'
                    //    errorMessage={residentialAddress.pincodeError}

                    />
                    <Input
                        containerStyle={{
                            height: 60, marginTop: 30,
                            // width: Math.round(Dimensions.get('window').width / 2)
                        }}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        placeholder='Enter Email'
                        label='Email'
                        value={permanentAddress.email_id}
                        onChangeText={text => this.handlePermanentlEmailChange(text)}
                        keyboardType='email-address'
                        errorMessage={permanentAddress.emailError}

                    />

                </View>

            )
        }
    }


    render() {
        let { saveRequested } = this.props;
        let { reuseAddress, isHealthCareProfessional, workingWithUs } = this.state;
        //    console.log(saveRequested)

        return (
            <SafeAreaView style={{ backgroundColor: '#2DB38D', }}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                >
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={true}
                    >
                        <Spinner color='grey'
                            visible={saveRequested}
                        />
                        {this.state.showModal && (
                            this.renderModal())}
                        <View style={{
                            backgroundColor: '#2DB38D',
                            flex: 1,
                            //  height: Dimensions.get('window').height
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                margin: 10,
                                padding: 5,
                                borderRadius: 5
                            }}>

                                {this.renderResidentialAddress()}
                                <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ marginTop: 5, marginBottom: 5 }}>Is Permanent addresses different?</Text>
                                    <Switch
                                        value={reuseAddress}
                                        onChange={this.toggleAddreesReuse}
                                        trackColor={{ true: '#2DB38D' }}
                                    />
                                </View>
                                {this.renderPermanentAddress()}
                                <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}>Are you a healthcare professional?</Text>
                                    <Switch
                                        value={isHealthCareProfessional}
                                        onChange={this.toggleHealthCareProfessional}
                                        trackColor={{ true: '#2DB38D' }}
                                    />
                                </View>
                                <Button
                                    buttonStyle={{ backgroundColor: '#2DB38D', borderRadius: 50, marginTop: 20 }}
                                    title='Continue'
                                    onPress={this.handleSubmit}
                                />

                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}
