import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { Card, Avatar, Divider, Icon, Badge, Button } from 'react-native-elements';
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPosition: 0,
            subscriptionPlanModalVisible: false,
        }
    }
    componentDidMount() {

    }
    handleNavigation = (route) => {
        this.props.navigation.navigate(route)
    }
    renderQRCode = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Your QR Code</Text>
                <Image
                    style={{ width: 300, height: 300, backgroundColor: 'white' }}
                    source={require('../../../assets/qrCodeImage.png')}
                />
            </View>
        );
    }
    renderButtons = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Button
                    title="Scan QR Code"
                    buttonStyle={{ width: 300 }}
                />
                <Button 
                     onPress={() => this.handleNavigation('your-contacts')}
                    title="Your Contacts"
                    TouchableOpacity={1}
                    buttonStyle={{ width: 300, marginTop: 20 }}
                />
            </View>
        );
    }
    // Render any loading content that you like here
    render() {
        //    console.log(userInfo.user.first_name, infoLoading)
        return (
            <SafeAreaView style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#403A6A',
            }}>
                {this.renderQRCode()}
                {this.renderButtons()}
            </SafeAreaView>

        );
    }
}