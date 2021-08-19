import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Component/Home/index'
import Settings from '../Component/Settings/index'
import Contacts from '../Component/Contacts/index'



const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
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
        component={Home}
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
        headerShown: false
      }} />
      <Stack.Screen name="your-contacts" component={Contacts}
        options={{
          title: "Contacts"
        }}
      />

      {/* <
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
//export default AppStackNavigator;
