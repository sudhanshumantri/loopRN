import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../Container/Home';
import Header from '../Container/Header';
import SearchConsultant from '../Container/Search/';
import SearchConsultantList from '../Container/Search/searchList'

//import ProfileRegistrationAddressInfo from '../Container/Register/addressInfo';
 import ProfileRegistrationHealthcareProfessionalInfo from '../Container/Register/healthcareProfessionalInfo';
import Profile from '../Container/Profile'
import UnAuthedHeader from '../Component/Header/unAuthedHeader';

import ChatList from '../Container/Chat/chatList';

import Chat from '../Container/Chat/index'
export const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            header: () => <Header />
        })
    },
    SearchConsultant: {
        screen: SearchConsultant,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Search',
            headerTitleAlign: 'center',
          
        })
    },
    SearchConsultantList: {
        screen: SearchConsultantList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.getParam('title'),
            headerTitleAlign: 'center',
            headerTitleStyle:{color:'#2DB38D'}

        })
    },

   
    // ProfileRegistrationAddressInfo: {
    //     screen: ProfileRegistrationAddressInfo,
    //     navigationOptions: ({ navigation }) => ({
    //         header: () => <UnAuthedHeader />
    //     })
    // },
    ProfileRegistrationHealthcareProfessionalInfo: {
        screen: ProfileRegistrationHealthcareProfessionalInfo,
        navigationOptions: ({ navigation }) => ({
            header: () => <UnAuthedHeader />
        })
    },
}, {
    initialRouteName: 'ProfileRegistrationHealthcareProfessionalInfo',
    headerMode: 'screen',
})

export const ProfileStackNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            header: <Header />
        })
    },


}, {
    initialRouteName: 'Profile',
    headerMode: 'screen',
})
// export const ChatStackNavigator = createStackNavigator({
//     Chat: {
//         screen: Chat,
//         navigationOptions: ({ navigation }) => ({
//             header: () => null
//         })
//     },
// }, {
//     initialRouteName: 'Chat',
//     headerMode: 'screen',
// })
export const ChatListStackNavigator = createStackNavigator({
    ChatList: {
        screen: ChatList,
        navigationOptions: ({ navigation }) => ({
            header: () => <Header />

        })
    },
    // Chat:
    // {
    //    screen: ChatStackNavigator,
    //     navigationOptions: ({ navigation }) => ({
    //         headerTitle: 'Chat'
    //     })
    // },

}, {
    initialRouteName: 'ChatList',
    headerMode: 'screen',
})
