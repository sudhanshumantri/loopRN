import React, { Component } from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import Home from '../../Component/Home/index'
//import { createStructuredSelector } from 'reselect';
//import { Provider } from 'react-redux';
//import { getAsyncInjectors } from '../../Utils/asyncInjectors';
import AppStackNavigator from '../../Navigation/bottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
//import DrawerNavigator from '../../Navigation/drawerNavigator';
//import store from '../../Store';

// import registerReducer from '../../Reducer/register';
// import registerSagas from '../../Sagas/register';
// import userReducer from '../../Reducer/user';
// import chatReducer from '../../Reducer/chat'
// import userSagas from '../../Sagas/user';
// import cityReducer from '../../Reducer/city';
// import citySagas from '../../Sagas/city'
// import loginReducer from '../../Reducer/login';
// import loginSagas from '../../Sagas/login';
// import connectSagas from '../../Sagas/chat';
// import searchReducer from '../../Reducer/search';
// import searchSagas from '../../Sagas/search';
// import servicesReducer from '../../Reducer/services';
// import servicesSagas from '../../Sagas/services';
// import streamingReducer from '../../Reducer/streaming';



import * as NavigationService from '../../Navigation/navigationService';

//here we will inject sagas and reducers
// Needed for redux-saga es6 generator support
/**
 * Provides an entry point into our application.  Bot
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

// const { injectReducer, injectSagas } = getAsyncInjectors(store);
// injectReducer('login', loginReducer)
// injectSagas(loginSagas);
// injectReducer('register', registerReducer)
// injectSagas(registerSagas);
// injectReducer('userInfo', userReducer)
// injectSagas(userSagas);
// injectReducer('city', cityReducer)
// injectSagas(citySagas);
// injectReducer('chat', chatReducer)
// injectSagas(connectSagas);
// injectReducer('streaming', streamingReducer)
// injectReducer('search', searchReducer)
// injectSagas(searchSagas);
// injectReducer('services', servicesReducer)
// injectSagas(servicesSagas);


export default class Root extends Component {

  componentDidMount() {
    //    console.log('coming inside root mount')
    NavigationService.setNavigator(this.navigator);
    //  store.dispatch(setupChatConnection())
    // store.dispatch(listenNewCallRequest());
    //  this.props.gotNewMessage();

  }
  render() {

    return (
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    );
  }
};
