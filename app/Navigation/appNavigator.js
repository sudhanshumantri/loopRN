import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Container/Login';
// import ForgetPassword from '../Container/ForgetPassword';
// import ProfileRegistrationPersonalInfo from '../Container/Register/personalInfo';
// import ProfileRegistrationAddressInfo from '../Container/Register/addressInfo';
// import ProfileRegistrationHealthcareProfessionalInfo from '../Container/Register/healthcareProfessionalInfo';
import Register from '../Container/Register';
import AuthLoadingScreen from '../Component/Auth'
//import DrawerNavigator from './drawerNavigator';
import AppStackNavigator from './bottomNavigation';
// import ValidateOTP from '../Container/Register/validateOTP';
// import UnAuthedHeader from '../Component/Header/unAuthedHeader'

const AuthStack = createStackNavigator();
function MyAuthStack() {
    return (
        <AuthStack.Navigator initialRouteName="Login" >
            <AuthStack.Screen name="Login" component={Login} options={{
                headerShown: false,
            }} />
            <AuthStack.Screen name="Register" component={Register} options={{
                headerShown: false,
            }} />

        </AuthStack.Navigator>
    );
}
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            //   App: DrawerNavigator,
            Auth: MyAuthStack,
            App: AppStackNavigator
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);