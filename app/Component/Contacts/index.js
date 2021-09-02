import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements'
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
const list = [
    {
        name: 'Information Sharing',
        subtitle: 'info-outline'
    },
    {
        name: 'Password & Security ',
        subtitle: 'security'
    },
    {
        name: 'Display',
        subtitle: 'grid-view'
    }, {
        name: 'Recommend',
        subtitle: 'recommend'
    },
];
export default class Contacts extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPosition: 0,
            expanded: false,
            subscriptionPlanModalVisible: false,
            searchText: ''
        }
    }
    componentDidMount() {
        this.props.fetchUserContactList()
    }
    updateSearch = (search) => {
        this.setState({ search });
    };
    refreshContacts = () => {
        console.log('coming here');
        this.props.fetchUserContactList()
    }
    renderContacts = ({ item }) => {
        //   console.log(item.contactId);
        return (
            <ListItem key={item.id} onPress={() => {
                this.props.navigation.navigate('contact-details', { user: item.contactId })
            }}>

                <Avatar rounded icon={{ name: 'user', color: 'grey', type: 'font-awesome-5' }} />
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
    keyExtractor = (item, id) => id.toString()

    // Render any loading content that you like here
    render() {

        let { isLoading, contactList, error } = this.props;
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', }}>
                    <Icon type='material-community' name='refresh' size={40} color='white' onPress={() => {
                        this.props.fetchUserContactList()
                    }} />
                </View>

            )
        } else if (isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: 'black',

                    }}>
                    <ActivityIndicator color='white' />
                </View >
            )
        } else {
            return (
                <SafeAreaView style={{
                    flex: 1,
                    // padding: 20,
                    justifyContent: 'flex-start',
                    backgroundColor: 'black',
                }}>

                    {/* {this.renderContacts()} */}
                    <FlatList
                        ListHeaderComponent={this.renderHeader}
                        keyExtractor={this.keyExtractor}
                        data={this.props.contactList}
                        //.initialNumToRender={4}
                        renderItem={this.renderContacts}
                        //extraData={this.state}
                        //   ListEmptyComponent
                        //ListFooterComponent={this.props.renderFooter}
                        showsVerticalScrollIndicator={false}
                        refreshing={true}
                        onRefresh={() => this.props.fetchUserContactList()}
                    />
                </SafeAreaView>

            );
        }
    }
}