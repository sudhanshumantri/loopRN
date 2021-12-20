import React, { Component } from 'react';
import {
    View,
    Image,
    Text, SafeAreaView,
    PermissionsAndroid,
    Platform,
    Dimensions,
    StyleSheet,
    Linking,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-loading-spinner-overlay';
import { SearchBar, Avatar, ListItem, Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
import ModalPopup from '../Shared/ModalPopup/index';
import style from './style';
import { setCustomScrollView } from 'react-native-global-props';
let index = 0;
const feelingtatusArray = [
    { key: index++, label: 'Happy' },
    { key: index++, label: 'Excited' },
    { key: index++, label: 'Motivating' },
    { key: index++, label: 'Boring', },
    { key: index++, label: 'Not Interested', },
];
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isReresshed: false,
            matchedContact: null,
            showPopup: false,
            placeholder: '',
            title: '',
            inputType: '',
            contactInfo: null,
            showFeelingModal: false
        };
    }

    componentDidMount() {
        // if (this.props.contactList.length == 0) {
        this.props.fetchUserContactList()
        // }
    }

    onRefresh() {
        this.setState({ matchedContact: null })
        this.props.fetchUserContactList();
    }
    openContactPicker = async (userInfo) => {
        let { profilePicture, name, email, phone } = userInfo;

        var newPerson = {
            emailAddresses: [{
                label: "personal",
                email: email,
            },
            ], phoneNumbers: [{
                label: "mobile",
                number: String(phone),
            }],
            displayName: name,
            givenName: name
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
                            this.props.navigation.goBack();
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
                        this.props.navigation.goBack();
                        showMessage({
                            message: "Contact saved successfully",
                            type: "success",
                        });
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        } catch (err) {
            console.warn(err);
        }
    };
    showPopupModal = (type, contactInfo) => {
        let title = '';
        let placeholder = '';
        let inputType = 'text';

        if (type == 'edit-notes') {
            title = 'Add Note for ' + contactInfo.contactId.name;
            placeholder = 'Enter Note';

        }
        this.setState({
            showPopup: true,
            placeholder,
            inputType,
            title,
            contactInfo,
            modalInputValue: contactInfo.notes
        })
    }
    showFeelingModal = () => {
        this.setState({
            showFeelingModal: true
        })
    }
    closePopupModal = () => {
        this.setState({
            showPopup: false
        })
    }
    handleNotesUpdate = () => {
        this.props.updateContactInfo()
    }
    handleModalInfoSave = (type, value, contactInfo) => {
        if (!contactInfo) {
            contactInfo = this.state.contactInfo;
        }
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
    updateSearch = (search) => {
        let contactListObj = this.props.contactList;
        let results = [];
        this.setState({ search });
        for (var i = 0; i < contactListObj.length; i++) {
            for (var key in contactListObj[i].contactId) {
                //  console.log(key);
                let valToSearch = String(contactListObj[i].contactId[key]);
                valToSearch = valToSearch.toLocaleLowerCase();
                search = search.toLocaleLowerCase();
                //  console.log(valToSearch.indexOf(search));
                if (valToSearch.indexOf(search) != -1) {
                    if (results.indexOf(contactListObj[i]) == -1) {
                        results.push(contactListObj[i]);
                    }
                }
            }

        }
        this.setState({
            matchedContact: results
        })
        //   console.log(results.length);
    };
    renderHeader = () => {
        let { search } = this.state;
        return (
            <SearchBar
                placeholder="Search for Names, Key Words, Skills, etc"
                onChangeText={this.updateSearch}
                value={search}
                inputContainerStyle={style.searchBarInputContainer}
                containerStyle={style.searchBarContainer}
            />
        )
    }
    renderContacts = ({ item }) => {
        var contactCreatedDate = moment(item.createdAt, 'YYYY-MM-DD');
        contactCreatedDate = contactCreatedDate.format('MMM DD YY');
        return (
            <ListItem key={item.id} bottomDivider onPress={() => {
                this.props.navigation.navigate('contact-details', { user: item })
            }}>

                <Avatar size="medium" rounded
                    icon={{ name: 'user', color: 'grey', type: 'font-awesome-5' }}
                    overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                    source={{
                        uri:
                            item.contactId.profilePicture ? item.contactId.profilePicture : 'no-img',
                    }}
                />
                <ListItem.Content onPress={() => {
                    this.setState({
                        expanded: !this.state.expanded
                    });
                }}>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{item.contactId.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        <Text style={style.subheading}>{(item.location ? item.location + '-' : '') + contactCreatedDate}{"\n"}</Text>
                        {/* {item.feeling && (<Text style={style.subheading}>{item.feeling} {"\n"}</Text>)} */}
                        <Text>{item.contactId.phone}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                <View>
                    <Menu>
                        <MenuTrigger><Icon type='material-community' name='dots-vertical' size={40} color='black' /></MenuTrigger>
                        <MenuOptions style={{ backgroundColor: '#E8E8E8', padding: 10, borderRadius: 5 }}>
                            <MenuOption text='Add To Phone Contact' onSelect={() => this.openContactPicker(item.contactId)} />
                            <View style={style.horizontalDivider} />
                            <MenuOption text='Permission Settings' onSelect={() => this.props.navigation.navigate('permission-settings', { userInfo: item })} />
                            <View style={style.horizontalDivider} />
                            <MenuOption text='Edit/View Note' onSelect={() => this.showPopupModal('edit-notes', item)} />
                            <View style={style.horizontalDivider} />
                            <ModalSelector
                                data={feelingtatusArray}
                                // visible={this.state.showFeelingModal}
                                initValue="Select how you feeling about this connect"
                                //   supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => { this.handleModalInfoSave('feeling', option.label, item) }}>

                                <MenuOption text='Feelings' />
                            </ModalSelector>
                        </MenuOptions>
                    </Menu>
                </View>
                {/* <ListItem.Chevron onPress={() => {
                    this.props.navigation.navigate('contact-details', { user: item.contactId })
                }} /> */}

            </ListItem>)
    }

    renderEmpty = () => {
        let { isLoading, contactList, error } = this.props;
        if (!isLoading) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No Contacts </Text>
                </View>
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text>Fetching Contacts </Text>
                </View>
            )
        }
    }
    render() {
        let { isLoading, contactList, error } = this.props;
        let { matchedContact, title, placeholder, inputType, modalInputValue } = this.state;
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', }}>
                    <Icon type='material-community' name='refresh' size={40} color='white' onPress={() => {
                        this.props.fetchUserContactList()
                    }} />
                </View>

            )
        } else {
            return (

                <SafeAreaView style={style.container}>
                    {this.state.showPopup && (
                        <ModalPopup closePopupModal={this.closePopupModal} handleSave={(text) => this.handleModalInfoSave('notes', text)} title={title} inputType={inputType} placeholder={placeholder} value={modalInputValue} />
                    )}
                    {/* 
                    {this.state.showFeelingModal && (
                        this.renderMoalSelector()
                    )} */}
                    <FlatList
                        // data={this.state.data}
                        ListEmptyComponent={this.renderEmpty()}
                        data={matchedContact ? matchedContact : this.props.contactList}
                        onRefresh={() => this.onRefresh()}
                        refreshing={isLoading}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={this.renderHeader}

                        renderItem={this.renderContacts}
                    />
                </SafeAreaView>

            );
        }
    }
}

