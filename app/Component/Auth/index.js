import React from 'react';
import {
    ActivityIndicator,
    Linking,
    Text,
    Platform,
    View,
    Image
} from 'react-native';
import { Card, Input, Button, CheckBox, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import DeviceInfo from 'react-native-device-info';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOldApp: false,
        }
    }
    componentDidMount() {
        this.props.fetchAppVersion();
        // this._bootstrapAsync();
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.error && !this.props.error && !this.props.isLoading && this.props.appVersion && !this.state.isOldApp) {
            //here do the manipultion babes
            if (Platform.OS === 'ios') {
                if (this.props.appVersion.ios > DeviceInfo.getVersion()) {
                    this.setState({
                        isOldApp: true
                    })
                } else {
                    this._bootstrapAsync();
                }
            } else {
                if (this.props.appVersion.android > DeviceInfo.getVersion()) {
                    this.setState({
                        isOldApp: true
                    })
                } else {
                    this._bootstrapAsync();
                }
            }
        }
    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      
        const userToken = await AsyncStorage.getItem('token');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    renderLogo = () => {
        return (
            <View>

                <Image
                    style={{ width: 200, height: 200, }}
                    source={require('../../../assets/loopLogoBlack.png')}
                />
            </View>
        );
    }
    handleUpdate=()=>{
        if(Platform.OS=='ios'){
            Linking.openURL('https://apps.apple.com/us/app/loop-quick-connect/id1587661726')
        }else{
            Linking.openURL('https://play.google.com/store/apps/details?id=com.loop.connect');
        }
        
    }
    renderAppUpgrade = () => {
        return (
            <View>
                <Text style={{ color: 'black', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>You are using an old version</Text>
                <Button color='white'
                   // containerStyle={{ marginTop: 10, width: Dimensions.get('window').width * 0.85, }}
                    buttonStyle={{  width: 300, marginTop: 20,backgroundColor:'black',borderRadius:5 }}
                    title='Update'
                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                    onPress={this.handleUpdate} />
            </View>
        );
    }

    // Render any loading content that you like here
    render() {
        let { isLoading, appVersion, error } = this.props;
      //  console.log(this.state.isOldApp);
        return (
            <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                {this.renderLogo()}
                {this.state.isOldApp && (
                    this.renderAppUpgrade()
                )}
                {/* <ActivityIndicator color='grey' />
                <StatusBar barStyle="default" /> */}
            </SafeAreaView>

        );
    }
}