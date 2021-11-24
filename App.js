/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Root from './app/Container/Root/index'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { MenuProvider } from 'react-native-popup-menu';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import 'react-native-gesture-handler';
const customTextProps = {
  style: {
    // fontSize: 16,
    fontFamily: 'Asap-SemiBold',
    color: 'black'
  }
};
setCustomText(customTextProps);
export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Root />
      </MenuProvider>
    )
  }
}


