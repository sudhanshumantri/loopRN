import React, { Component } from 'react';
//import { createStructuredSelector } from 'reselect';
import { Provider } from 'react-redux';
import { getAsyncInjectors } from '../../Utils/asyncInjectors';
import AppNavigator from '../../Navigation/appNavigator';
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import store from '../../Store';
import registerReducer from '../../Reducer/register';
import registerSagas from '../../Sagas/register';
import userReducer from '../../Reducer/user';
// import chatReducer from '../../Reducer/chat'
import userSagas from '../../Sagas/user';
import contactReducer from '../../Reducer/contacts';
import contactSagas from '../../Sagas/contacts'
import loginReducer from '../../Reducer/login';
import loginSagas from '../../Sagas/login';
import utilsSagas from '../../Sagas/util';
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

const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer('login', loginReducer)
injectSagas(loginSagas);
injectReducer('register', registerReducer)
injectSagas(registerSagas);
injectReducer('userInfo', userReducer)
injectSagas(userSagas);
injectReducer('contacts', contactReducer)
injectSagas(contactSagas);
injectSagas(utilsSagas);

export default class Root extends Component {

  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
    //  store.dispatch(setupChatConnection())
    // store.dispatch(listenNewCallRequest());
    //  this.props.gotNewMessage();

  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator ref={nav => {
            this.navigator = nav;
          }} />
        </NavigationContainer>
        <FlashMessage position="bottom" />
      </Provider>
    );
  }
};
