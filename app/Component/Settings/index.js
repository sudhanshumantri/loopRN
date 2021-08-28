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
import { ListItem, Icon } from 'react-native-elements'
const list = [
    {
        title: 'Information Sharing',
        icon: 'info-outline',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    },
    {
        title: 'Password & Security ',
        icon: 'security',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    },
    {
        title: 'Display',
        icon: 'grid-view',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    }, {
        title: 'Recommend',
        icon: 'recommend',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    },
    {
        title: 'Log Out',
        icon: 'logout',
        isNavigation: false,
        function: 'handleLogout'
    },
];
export default class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPosition: 0,
            subscriptionPlanModalVisible: false,
        }
    }
    componentDidMount() {

    }
    handleNavigation = (route) => {
        this.props.navigation.navigate(route)
    }
    handleLogout = () => {
        this.props.logout();
    }
    handleCustomFunction = (type) => {
        if (type == 'handleLogout') {
            this.handleLogout()
        }
    }

    // Render any loading content that you like here
    render() {
        //    console.log(userInfo.user.first_name, infoLoading)
        return (
            <SafeAreaView style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#6b3871',
            }}>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider onPress={() => item.isNavigation ? this.handleNavigation(item.route) : this.handleCustomFunction(item.function)} >
                            <Icon name={item.icon} type='material' />
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron onPress={() => this.handleNavigation('information-sharing')} />
                        </ListItem>
                    ))
                }
            </SafeAreaView>

        );
    }
}