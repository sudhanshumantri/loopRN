import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
    Linking,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isReresshed: false,
            matchedContact: null
        };
    }

    componentDidMount() {
        if (this.props.contactList.length == 0) {
            this.props.fetchUserContactList()
        }
    }

    onRefresh() {
        this.setState({ matchedContact: null })
        this.props.fetchUserContactList();
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
                placeholder="Search contacts"
                onChangeText={this.updateSearch}
                value={search}
            />
        )
    }
    renderContacts = ({ item }) => {
        //   console.log(item.contactId);
        return (
            <ListItem key={item.id} bottomDivider onPress={() => {
                this.props.navigation.navigate('contact-details', { user: item.contactId })
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
                    <ListItem.Title>{item.contactId.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.contactId.phone}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron onPress={() => {
                    this.props.navigation.navigate('contact-details', { user: item.contactId })
                }} />

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
        let { matchedContact } = this.state;
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
                <View style={styles.container}>
                    {/* <Spinner color='grey'
                        visible={isLoading}
                    /> */}
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
                </View>
            );
        }
    }
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 22,
    },
});
