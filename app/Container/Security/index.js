import React from 'react';
import {
    Share,
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
import { showAlert } from '../../Utils/utilFunctions'
const list = [
    {
        title: 'Privacy Statement',
        icon: 'info-outline',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    },
    {
        title: 'ChangePassword',
        icon: 'security',
        isNavigation: true,
        function: 'handleNavigation',
        route: 'information-sharing',
    },
    
];
export default class Security extends React.Component {
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
                message:
                    'React Native | A framework for building native apps using React',
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