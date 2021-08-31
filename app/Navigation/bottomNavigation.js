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
import Home from '../Container/Home';
import Settings from '../Container/Settings/index'
import Contacts from '../Container/Contacts/index'
import Profile from '../Container/Profile/index'
import InformationSharing from '../Container/InformationSharing/index'
import QRCodeScan from '../Container/QRCodeScanner'




const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{

      }}
    >
      <Tab.Screen name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
      <Tab.Screen name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Tabs" >
      <Stack.Screen name="Tabs" component={MyTabs} options={{
        headerTitle: 'LOOP',
        headerTitleStyle: { color: 'white' },
        headerTitleAlign: 'center',
        // headerLeft: (props) => (
        //   <Text>Coming</Text>
        // ),
        headerStyle: { backgroundColor: '#3f3969' },
        headerRight: (props) => (
          <Icon name='help' type='material' color='white' />
        ),
        headerRightContainerStyle: { marginRight: 10 }
      }} />
      <Stack.Screen name="your-contacts" component={Contacts}
        options={{
          title: "Contacts"
        }}

      />
      <Stack.Screen name="information-sharing" component={InformationSharing}
        options={{
          title: "Information Sharing"
        }}

      />
      <Stack.Screen name="scan-qrcode" component={QRCodeScan}
        options={{
          title: "QR code scanner",
          headerShown: false
        }}

      />

      {/* <
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
//export default AppStackNavigator;
