import React from 'react';
import {
    Share,
    Platform,
    StatusBar,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { showAlert } from '../../Utils/utilFunctions'
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
        route: 'security',
    },
    // {
    //     title: 'Display',
    //     icon: 'grid-view',
    //     isNavigation: true,
    //     function: 'handleNavigation',
    //     route: 'information-sharing',
    // }, 
    {
        title: 'Share',
        icon: 'share',
        isNavigation: false,
        function: 'handleShare',
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
        showAlert('Are you sure to Log out').then(data => {
            if (data == 'yes') {
                this.props.logout();
            }
            //this.props.logout();
        })
        // this.props.logout();
    }
    handleShare = async () => {
        try {
            const result = await Share.share({
                message: Platform.OS == 'android' ? 'https://play.google.com/store/apps/details?id=com.loop.connect' : 'https://apps.apple.com/us/app/loop-quick-connect/id1587661726',
                title: 'https://play.google.com/store/apps/details?id=com.loop.connect',
                url: 'https://apps.apple.com/us/app/loop-quick-connect/id1587661726'
                // url: Platform.OS == 'android' ? 'https://play.google.com/store/apps/details?id=com.loop.connect' : 'https://apps.apple.com/us/app/loop-quick-connect/id1587661726'
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    handleCustomFunction = (type) => {
        if (type == 'handleLogout') {
            this.handleLogout()
        } if (type == 'handleShare') {
            this.handleShare()
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
                backgroundColor: 'white',
            }}>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider onPress={() => item.isNavigation ? this.handleNavigation(item.route) : this.handleCustomFunction(item.function)} >
                            <Icon name={item.icon} type='material' />
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron oonPress={() => item.isNavigation ? this.handleNavigation(item.route) : this.handleCustomFunction(item.function)} />
                        </ListItem>
                    ))
                }
            </SafeAreaView>

        );
    }
}