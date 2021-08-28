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

    }
    updateSearch = (search) => {
        this.setState({ search });
    };
    renderContacts = () => {
        //  console.log(list);
        list.map((l, i) => {
            console.log(l.name, i)
        })
        return (<ListItem.Accordion
            content={
                <>
                    <Avatar rounded icon={{ name: 'user', color: 'grey', type: 'font-awesome-5' }} />
                    <ListItem.Content>
                        <ListItem.Title>Sudhanshu</ListItem.Title>
                        <ListItem.Subtitle>{+9860694302 + ' / Avocado Labs'}</ListItem.Subtitle>
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
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </ListItem.Accordion>)
    }

    // Render any loading content that you like here
    render() {
        let { search } = this.state;
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