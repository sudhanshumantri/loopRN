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
    renderContacts = () => {
        let { contactList } = this.props;
        console.log(contactList);
        return (
            (contactList.map((data, i) => (

                <ListItem.Accordion id={i}
                    content={
                        <>
                            <Avatar rounded icon={{ name: 'user', color: 'grey', type: 'font-awesome-5' }} />
                            <ListItem.Content>
                                <ListItem.Title>{data.contactId.name}</ListItem.Title>
                                <ListItem.Subtitle>{data.contactId.phone}</ListItem.Subtitle>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={this.state.expanded}
                    animation={30}
                    onPress={() => {
                        this.setState({
                            expanded: !this.state.expanded
                        });
                    }}
                >
                    {list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar rounded icon={{ name: 'home' }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            {/* <ListItem.Chevron /> */}
                        </ListItem>
                    ))}
                </ListItem.Accordion>))))
    }

    // Render any loading content that you like here
    render() {
        let { search } = this.state;
        let { isLoading, contactList, error } = this.props;
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
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
                        backgroundColor: '#2DB38D',

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
                    backgroundColor: '#6b3871',
                }}>
                    <SearchBar
                        placeholder="Search contacts"
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    {this.renderContacts()

                    }
                </SafeAreaView>

            );
        }
    }
}