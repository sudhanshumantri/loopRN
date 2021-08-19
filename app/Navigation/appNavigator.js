import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../Container/Login';
import ForgetPassword from '../Container/ForgetPassword';
import ProfileRegistrationPersonalInfo from '../Container/Register/personalInfo';
import ProfileRegistrationAddressInfo from '../Container/Register/addressInfo';
import ProfileRegistrationHealthcareProfessionalInfo from '../Container/Register/healthcareProfessionalInfo';
import Register from '../Container/Register';
import AuthLoadingScreen from '../Component/Auth'
import DrawerNavigator from './drawerNavigator';
import ValidateOTP from '../Container/Register/validateOTP';
import UnAuthedHeader from '../Component/Header/unAuthedHeader'
const AuthStack = createStackNavigator({

    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            header: <UnAuthedHeader />,
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            header: <UnAuthedHeader />,
        })
    },
    ValidateOTP: {
        screen: ValidateOTP,
        navigationOptions: ({ navigation }) => ({
            header: <UnAuthedHeader />,
        })
    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: ({ navigation }) => ({
            header: <UnAuthedHeader />,
        })

    },
    ProfileRegistrationPersonalInfo: {
        screen: ProfileRegistrationPersonalInfo,
        navigationOptions: ({ navigation }) => ({
            header: () => <UnAuthedHeader />
        })
    },
    ProfileRegistrationAddressInfo: {
        screen: ProfileRegistrationAddressInfo,
        navigationOptions: ({ navigation }) => ({
            header: () => <UnAuthedHeader />
        })
    },
    ProfileRegistrationHealthcareProfessionalInfo: {
        screen: ProfileRegistrationHealthcareProfessionalInfo,
        navigationOptions: ({ navigation }) => ({
            header: () => <UnAuthedHeader />
        })
    },
}, {
    initialRouteName: 'Login'
});
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            //   App: DrawerNavigator,
            Auth: AuthStack,
            App: DrawerNavigator
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);