import React from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator, TouchableOpacity, SafeAreaView, Modal, FlatList, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SearchBar, Card, Icon, Divider, Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
class SearchConsulation extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            searchDropdown: '',
            selectedItems: [
            ],
            showModal: false,
            modalType: ''
        }

    }
    componentDidMount() {
        this.props.fetchSpeciality();
        this.props.fetchStream();
        this.props.fetchQualification();
        this.props.fetchCommonSymptoms();
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
    updateSearchModaal = searchDropdown => {
        this.setState({ searchDropdown });
        if (this.state.modalType == 'symptoms') {
            this.props.searchSymptoms(searchDropdown);
        }

    };
    handleNavigation = (params) => {
        let config = {};
        let title = 'Physician';
        if (params == 'all') {
            config.type = 'all'
        } else if (params == 'speciality') {
            title = 'Speciality'
            let { selectedItems } = this.state;
            let ids = selectedItems.map(item => {
                return item.id
            })
            config.type = 'speciality'
            config.id = ids.toString();
        } else if (params == 'streams') {
            title = 'Streams'
            let { selectedItems } = this.state;
            let ids = selectedItems.map(item => {
                return item.id
            })
            config.type = 'streams'
            config.id = ids.toString();
        }
        else if (params == 'qualification') {
            title = 'Qualification'
            let { selectedItems } = this.state;
            let ids = selectedItems.map(item => {
                return item.id
            })
            config.type = 'qualification'
            config.id = ids.toString();
        } else if (params == 'symptoms') {
            title = 'Symptoms'
            let { selectedItems } = this.state;
            let ids = selectedItems.map(item => {
                return item.id
            })
            config.type = 'symptoms'
            config.id = ids.toString();
        }
        // const navigation = useNavigation();
        // navigation.navigate('SearchConsultantList', { config });
        this.props.navigation.navigate('SearchConsultantList', { config, title });
    }
    //SearchConsultantList
    renderCategories = () => {
        return (
            <View style={{ marginTop: 50, }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}>

                    <TouchableOpacity onPress={() => this.handleNavigation('all')} activeOpacity={0.5}
                        style={{
                            flex: 0.4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'transparent',
                            shadowColor: '#000',
                            borderRadius: 2,
                            borderWidth: 0.5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            //     elevation: 50,
                            //   padding: 10
                            // backgroundColor:'transparent'
                        }}
                    >
                        <Image
                            style={{ width: 100, height: 120 }}

                            source={{ uri: 'https://aapkadoctorbs.blob.core.windows.net/aapkadoctor/IconsSimple1.png' }}
                        // source={require('../../../assets/image/doctor.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Physician</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showModal('speciality')}
                        style={{
                            flex: 0.4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'transparent',
                            shadowColor: '#000',
                            borderRadius: 2,
                            borderWidth: 0.5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            //     elevation: 5,
                            padding: 10
                        }}
                    >
                        <Image
                            style={{ width: 100, height: 120 }}
                            source={{ uri: 'https://aapkadoctorbs.blob.core.windows.net/aapkadoctor/IconsSpecilist01.png' }}
                        //    source={require('../../../assets/image/specialist.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Specialist</Text>

                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 20
                }}>
                    <TouchableOpacity onPress={() => this.showModal('streams')}
                        style={{
                            flex: 0.4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'transparent',
                            shadowColor: '#000',
                            borderRadius: 2,
                            borderWidth: 0.5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            //   elevation: 5,
                            padding: 10
                            // backgroundColor:'transparent'
                        }}
                    >
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: 'https://aapkadoctorbs.blob.core.windows.net/aapkadoctor/IconsSream01.png' }}
                        // source={require('../../../assets/image/stream.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Medical Stream</Text>

                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.showModal('qualification')}
                        style={{
                            flex: 0.4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'transparent',
                            shadowColor: '#000',
                            borderRadius: 2,
                            borderWidth: 0.5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 2,
                          //  elevation: 5,
                            padding: 10
                            // backgroundColor:'transparent'
                        }}
                    >

                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../../../assets/image/disease.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Qualification</Text>

                    </TouchableOpacity> */}

                </View>

            </View>
        )
    }
    keyExtractor = (item) => {
        let { modalType } = this.state;
        if (modalType == 'speciality') {
            return item.speciality_id.toString();
        } else if (modalType == 'streams') {
            return item.stream_id.toString();
        } else if (modalType == 'qualification') {
            return item.qualification_id.toString();
        } else if (modalType == 'symptoms') {
            return item.symptom_id.toString();
        }
    }
    renderDropdwonItem = ({ item }) => {
        let { modalType, searchDropdown } = this.state
        if (modalType == 'qualification') {
            if (item.qualified_name.toLowerCase().startsWith(searchDropdown.toLowerCase()))
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
                        <Text  >{item.qualified_name + ' (' + item.short_name + ')'}</Text>
                    </TouchableOpacity>
                )
        } else if (modalType == 'symptoms') {
            if (item.symptom_name.toLowerCase().startsWith(searchDropdown.toLowerCase()))
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
                        <Text  >{item.symptom_name}</Text>
                    </TouchableOpacity>
                )
        }
        else {
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
                        <Text  >{item.name}</Text>
                    </TouchableOpacity>
                )
        }
    }
    handleItmeSelection = (item) => {
        const items = this.state.selectedItems;
        let { modalType } = this.state;
        if (modalType == 'speciality') {
            items.push({
                id: item.speciality_id,
                name: item.name
            })
        } else if (modalType == 'streams') {
            items.push({
                id: item.stream_id,
                name: item.name
            })
        }
        else if (modalType == 'qualification') {
            items.push({
                id: item.qualification_id,
                name: item.short_name
            })
        } else if (modalType == 'symptoms') {
            items.push({
                id: item.symptom_id,
                name: item.symptom_name
            })
        }

        this.setState({ selectedItems: items });
    }
    renderSelectedType = () => {

        let { selectedItems } = this.state;
        return (
            selectedItems.map(item => {
                return <Badge value={item.name + '  X'}
                    badgeStyle={{ margin: 5, height: 30, backgroundColor: '#2DB38D' }}
                    textStyle={{ fontSize: 16 }}
                    onPress={() => this.removeItem(item.id)} />
                //<Text>{item.name}</Text>
            })
        )
    }
    removeItem = (item) => {
        let { selectedItems } = this.state
        const items = selectedItems.filter((sitem) => sitem.id !== item);
        this.setState({ selectedItems: items });
    }
    handleClear = () => {
        if (this.state.modalType = 'symptoms') {
            this.props.fetchCommonSymptoms();
        }
    }
    findConsultant = () => {
        let { modalType } = this.state
        this.handleNavigation(modalType);
        // if (modalType == 'speciality') {
        //     this.handleNavigation('speciality');
        // } else if (modalType == 'streams') {
        //     this.handleNavigation('streams');
        // }
        // else if (modalType == 'qualification') {
        //     this.handleNavigation('qualification');
        // }else if(modalType=='')
        this.hideModal();
    }
    renderModal = () => {
        let { modalType, searchDropdown } = this.state;

        let { specialities, streams, qualifications, symptoms } = this.props;
        let data = [];
        let title = ''
        if (modalType == 'speciality') {
            data = specialities;
            title = 'Speciality'
        } else if (modalType == 'streams') {
            data = streams;
            title = 'Streams'
        } else if (modalType == 'qualification') {
            data = qualifications;
            title = 'Qualification'
        }
        else if (modalType == 'symptoms') {
            data = symptoms;
            title = 'Search Symptoms'
        }
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
                            <Text style={{ fontWeight: 'bold', color: '#2DB38D', fontSize: 20, paddingLeft: 20 }}> {title}</Text>
                            <TouchableOpacity onPress={this.findConsultant} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ marginRight: 10, color: 'red', fontSize: 20 }}>Apply</Text></TouchableOpacity>
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
                                //  clearIcon={false}
                                onClear={this.handleClear}
                            />
                        </View>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

                                {this.renderSelectedType()}
                            </View>
                        </View>
                        <FlatList
                            //   ListHeaderComponent={this.renderSelectedType}
                            keyExtractor={this.keyExtractor}
                            data={data}
                            renderItem={this.renderDropdwonItem}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state.searchDropdown}
                        //    ListEmptyComponent={'Nothing Found'}

                        />
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        )
    }

    render() {
        const { search, searchDropdown } = this.state;
    
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#2DB38D' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <SearchBar
                            placeholder="Search Symptoms ..."
                            //    onChangeText={this.updateSearch}
                            containerStyle={{
                                width: wp('90%'),
                                backgroundColor: '#2DB38D',
                                borderTopWidth: 0, borderBottomWidth: 0,
                                borderRadius: 10
                            }}

                            // onFocus={() => {
                            //     this.showModal('symptoms')
                            // }}
                            inputStyle={{ color: '#2DB38D' }}
                            inputContainerStyle={{ backgroundColor: 'white', height: 50, }}
                            searchIcon={{ color: '#2DB38D' }}
                            value={search}
                            clearIcon
                        />

                    </View>
                </ScrollView>
            </SafeAreaView>
        )

    }
}
export default withNavigation(SearchConsulation);