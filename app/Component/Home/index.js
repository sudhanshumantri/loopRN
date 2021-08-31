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
        this.props.fetchUserInfo();
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
                    source={{ uri: this.props.userInfo.qrCode }}
                //  source={require('../../../assets/qrCodeImage.png')}
                />
            </View>
        );
    }
    renderButtons = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Button
                    title="Scan QR Code"
                    onPress={() => this.handleNavigation('scan-qrcode')}
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
        let { error, isLoading, userInfo, } = this.props;
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    <Icon type='material-community' name='refresh' size={40} color='white' onPress={() => {
                        this.props.fetchUserInfo()
                    }} />
                </View>

            )
        } else if (isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: '#2DB38D',

                    }}>
                    <ActivityIndicator color='white' />
                </View >
            )
        } else {
            //    console.log(userInfo.user.first_name, infoLoading)
            return (
                <SafeAreaView style={{
                    flex: 1,
                    // padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6b3871',
                }}>
                    {this.renderQRCode()}
                    {this.renderButtons()}
                </SafeAreaView>

            );
        }
    }
}