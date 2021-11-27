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
import { ListItem, Icon, Switch } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { showAlert } from '../../Utils/utilFunctions';
import style from './style';
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
    handleContactSharingUpdate = () => {
        this.props.updateUserSharingInfo({
            sharingType: 'contact-exchange',
            contactExchange: !this.props.userSharingInfo.contactExchange
        })
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
        let { isInformationSharingUpdate } = this.props;
        //    console.log(userInfo.user.first_name, infoLoading)
        return (
            <SafeAreaView style={style.safeAreaView}>
                {
                    <View style={style.container}>
                        <View>
                            <Spinner color='grey'
                                visible={isInformationSharingUpdate}
                            />
                            <View style={style.flexRootContainer}>
                                <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon type='font-awesome' name='exchange' size={30} />
                                    <Text style={style.titleStyle}>Contact Exchange</Text>
                                </View>

                                <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end' }}><Switch value={this.props.userSharingInfo.contactExchange}  onValueChange={() => this.handleContactSharingUpdate()} color="green" /></View>
                            </View>
                            <Text>'Exchange' contact details automatically irrespective of whether you scan someone's Loop code or they scan yours</Text>
                            <View
                                style={style.horizontalDivider}
                            />
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('custom-sharing-settings')}>
                            <View style={style.flexRootContainer}>
                                <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon type='antdesign' name='menufold' size={30} />
                                    <Text style={[style.titleStyle]}>Customize A Profile</Text>
                                </View>
                            </View>
                            <Text>Our default profiles can't cater to all your networking needs? Create a custom bucket of your own</Text>
                            <View
                                style={style.horizontalDivider}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleCustomFunction('handleShare')}>
                            <View style={style.flexRootContainer}>
                                <TouchableOpacity
                                    onPress={() => this.handleCustomFunction('handleShare')}
                                    style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }} >
                                    <Icon type='material' name='share' size={30} />
                                    <Text style={style.titleStyle}>Share</Text>
                                </TouchableOpacity>
                            </View>
                            <Text>Liking Loop? Share the convenience with your close ones</Text>
                            <View
                                style={style.horizontalDivider}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleCustomFunction('handleLogout')}>
                            <View style={style.flexRootContainer}>
                                <TouchableOpacity
                                    onPress={() => this.handleCustomFunction('handleLogout')}
                                    style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon type='material' name='logout' size={30} />
                                    <Text style={style.titleStyle}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                            <Text>You can always login easily via OTP on your registered phone number or by using your password</Text>
                            <View
                                style={style.horizontalDivider}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={style.flexRootContainer}>
                                <View style={{ flex: 2 / 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon type='feather' name='info' size={30} />
                                    <Text style={style.titleStyle}>About Loop</Text>
                                </View>
                            </View>
                            <Text>Curious? Know a bit more about Loop</Text>
                            <View
                                style={style.horizontalDivider}
                            />
                        </TouchableOpacity>


                    </View>

                    // list.map((item, i) => (
                    //     <ListItem key={i} bottomDivider onPress={() => item.isNavigation ? this.handleNavigation(item.route) : this.handleCustomFunction(item.function)} >
                    //         <Icon name={item.icon} type='material' />
                    //         <ListItem.Content>
                    //             <ListItem.Title>{item.title}</ListItem.Title>
                    //         </ListItem.Content>
                    //         <ListItem.Chevron oonPress={() => item.isNavigation ? this.handleNavigation(item.route) : this.handleCustomFunction(item.function)} />
                    //     </ListItem>
                    // ))
                }
            </SafeAreaView>

        );
    }
}