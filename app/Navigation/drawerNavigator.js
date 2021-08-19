import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Card, Avatar, Divider } from 'react-native-elements';
import Profile from '../Container/Profile';
import MySubscription from '../Container/MySubscription';
import ActivityHistory from '../Component/Activity/index';
import { NavigationActions } from 'react-navigation';
import Reports from '../Container/Reports';

import AppStack from './bottomNavigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import styles from "./styles";
import { logoutRequestAction, fetchUserProfileAction } from '../Actions/user';
import { setupChatConnection, listenOngoingChatMessages } from '../Actions/chat';
import {
  selectInfoLoading,
  selectUserInfo,
} from '../Selectors/user';
const imageBaseurl = 'https://aapkadoctorbs.blob.core.windows.net/files/'

class CustomDrawerNavigator extends Component {

  constructor() {
    super();
    this.state = {
      isCollapsed: true,
      activeScreen: 'Home'
    }
  }
  componentDidMount() {
    this.props.fetchUserProfile()
    this.props.setupChatConnection();
    this.props.listenChatMessages();

  }
  toggleCollapsible = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }
  setActiveDrawerMenu = () => {

  }
  handleLogout = () => {
    this.props.logout();
  }
  render() {
    let activeScreen = this.props.activeItemKey;

    return (
      <ScrollView>
        <SafeAreaView
          //  style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <TouchableOpacity style={{ backgroundColor: 'black', flexDirection: 'row', height: 150 }} onPress={() => this.props.navigation.navigate('Profile')}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
              <Avatar
                overlayContainerStyle={{}}
                rounded //title="D"
                icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                source={{
                  uri:
                    // 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                    this.props.userInfo.userbasicinfo ? imageBaseurl + this.props.userInfo.userbasicinfo.profile_photo_path : '',
                }}
                size='large' />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
              <Text style={{ color: 'white' }}>{this.props.userInfo.userbasicinfo ? this.props.userInfo.userbasicinfo.user_full_name : ''}</Text>
              {/* <Text style={{ color: 'white' }}>Family Physician</Text> */}
            </View>
            {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 20 }}>
              <Text style={{ color: 'white', fontSize: 10 }}>ver 1.1</Text>
            </View> */}
          </TouchableOpacity>
          <DrawerItems {...this.props} />
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 50,
            marginLeft: 20
          }} onPress={this.handleLogout}>

            <Icon name="power" style={{ color: 'grey' }} size={20} />
            <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Log Out</Text>

          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
}


const mapDispatchToProps = {
  logout: logoutRequestAction,
  fetchUserProfile: fetchUserProfileAction,
  setupChatConnection: setupChatConnection,
  //listenIncomingCallRequest: listenIncomingCallRequest,
  listenChatMessages: listenOngoingChatMessages,


};
const mapStateToProps = createStructuredSelector({
  //userName: selectUserName(),
  //appVersion: selectAppVersion(),
  //userProfileImage: selectUserImage()
  userInfo: selectUserInfo(),
  infoLoading: selectInfoLoading(),



});
var CustomDrawerNavigatorContainer = connect(mapStateToProps, mapDispatchToProps)(CustomDrawerNavigator);


const MainNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" style={{ color: tintColor }} size={20} />
        ),
        drawerLabel: "Home"
      },
      screen: AppStack,

    },
    Reports: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="book-open-page-variant" style={{ color: tintColor }} size={20} />
        ),
        drawerLabel: "Your Reports"
      },
     screen: Reports,

    },
    MySubscription: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="wallet-travel" style={{ color: tintColor }} size={20} />
        ),
        drawerLabel: "Your Subscription"
      },
      screen: MySubscription,

    },
    Activity: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon size={20} color={tintColor} name="ticket" type='material-community' />
        ),
        drawerLabel: "Your Activity"
      },
      screen: ActivityHistory,

    },
    //
    Profile: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon size={20} color={tintColor} name="account" type='material-community' />
        ),
        drawerLabel: "Profile"
      },
      screen: Profile,

    },
    // Subscription: {
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="chart-timeline" style={{ color: tintColor }} size={20} type='material-community' />
    //     ),
    //     drawerLabel: "Subscription"
    //   },
    //   screen: AppStack,

    // },
    // Refer: {
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="share-variant" style={{ color: tintColor }} size={20} type='material-community' />
    //     ),
    //     drawerLabel: "Refer & Earn"
    //   },
    //   screen: AppStack,

    // },
    // Support: {
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="help" style={{ color: tintColor }} size={20} type='material-community' />
    //     ),
    //     drawerLabel: "Support"
    //   },
    //   screen: AppStack,

    // },
    // About: {
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="information-outline" style={{ color: tintColor }} size={20} type='material-community' />
    //     ),
    //     drawerLabel: "About Us"
    //   },
    //   screen: AppStack,

    // },
  },
  {
    contentComponent: CustomDrawerNavigatorContainer,
    contentOptions: {
      activeTintColor: '#2DB38D',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }

  },
);

const MainApp = createAppContainer(MainNavigator);
export default MainApp;

