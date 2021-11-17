import React from 'react';
import {
  ActivityIndicator,

  StatusBar,
  View,
  Image,
  Text, SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../Container/Home';
import Help from '../Container/Help';
import Security from '../Component/Security';
import UpdatePassword from '../Container/Security/updatePassword';

import Settings from '../Container/Settings/index'
import Contacts from '../Container/Contacts/index'

import ContactsDetails from '../Component/ContactDetails'
import Profile from '../Container/Profile/index'
import InformationSharing from '../Container/InformationSharing/index'
import QRCodeScan from '../Container/QRCodeScanner'
import { color } from 'react-native-elements/dist/helpers';




const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black', },
        tabBarActiveTintColor: 'white'
      }}
    >
      <Tab.Screen name="Home"
        component={Home}
        // component={PersonalInfo}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Loops"
        component={Contacts}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="users" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          )
        }} />

    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Tabs" >
      <Stack.Screen name="Tabs" component={MyTabs} options={({ route, navigation }) => ({
        headerTitle: () => <Image
          style={{ width: 120, height: 60, }}
          source={require('../../assets/loopHorizontalWhite.png')}
        />,
        // headerBackground:()=>
        // headerTitleStyle: { color: 'white' },
        headerTitleAlign: 'center',
        // // headerLeft: (props) => (
        // //   <Text>Coming</Text>
        // // ),
        headerStyle: { backgroundColor: 'black' },
        headerRight: (props) => (
          <Icon name='help' type='material' color='white' onPress={() => { navigation.navigate('need-help') }} />
        ),
        headerRightContainerStyle: { paddingRight: 10 },
        gestureDirection: 'horizontal'

      })} />
      <Stack.Screen name="your-contacts" component={Contacts}
        options={{
          title: "Contacts",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />
      <Stack.Screen name="contact-details" component={ContactsDetails}
        options={{
          title: "Contact Details",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />
      <Stack.Screen name="information-sharing" component={InformationSharing}
        options={{
          title: "Information Sharing",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />
      <Stack.Screen name="scan-qrcode" component={QRCodeScan}
        options={{
          title: "Scan QR Code",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />
      <Stack.Screen name="need-help" component={Help}
        options={{
          title: "Feedback",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          //    gestureDirection:'horizontal'
        }}

      />
      <Stack.Screen name="security" component={Security}
        options={{
          title: "Password & Security",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />
      <Stack.Screen name="update-password" component={UpdatePassword}
        options={{
          title: "Update Password",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false
        }}

      />

      {/* <
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
//export default AppStackNavigator;
