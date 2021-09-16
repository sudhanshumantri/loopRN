import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Container/Login';
import Register from '../Container/Register';
import PersonalInfo from '../Container/Register/personalInfo';
import ProfessionalInfo from '../Container/Register/professionalInfo';
import OtherInfo from '../Container/Register/otherInfo';
import BasicInfo from '../Component/Register/basicInformation'
import ValidateOTP from '../Container/Register/validateOTP'
import SubmitSingupData from '../Container/Register/submitData'
import AuthLoadingScreen from '../Component/Auth'
//import DrawerNavigator from './drawerNavigator';
import AppStackNavigator from './bottomNavigation';
import ValidateLoginOTP from '../Container/Login/validateOTP';
import ValidatePhone from '../Container/Login/validatePhone'

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
            <AuthStack.Screen name="ValidateOTP" component={ValidateOTP} options={{
                headerShown: false,
            }} />
             <AuthStack.Screen name="BasicInfo" component={BasicInfo} options={{
                headerShown: false,
            }} />
            <AuthStack.Screen name="SetPassword" component={SubmitSingupData} options={{
                headerShown: false,
            }} />
             <AuthStack.Screen name="PersonalInfo" component={PersonalInfo} options={{
                headerShown: false,
            }} />
             <AuthStack.Screen name="ProfessionalInfo" component={ProfessionalInfo} options={{
                headerShown: false,
            }} />
             <AuthStack.Screen name="OtherInfo" component={OtherInfo} options={{
                headerShown: false,
            }} />
             <AuthStack.Screen name="Login-ValidatePhone" component={ValidatePhone} options={{
                headerShown: false,
            }} />
              <AuthStack.Screen name="Login-ValidateOTP" component={ValidateLoginOTP} options={{
                headerShown: false,
            }} />
            
            
            

        </AuthStack.Navigator>
    );
}
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            Auth: MyAuthStack,
            App: AppStackNavigator
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);