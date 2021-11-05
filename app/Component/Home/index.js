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
        let { userInfo } = this.props;
        //    console.log(this.props.userInfo.qrCode);
        return (
            <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ flexDirection: 'row', left: 15, marginTop: 10 }}>
                    <Avatar
                        containerStyle={{ marginTop: -40, }}
                        rounded
                        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                        source={{

                            uri: userInfo.profilePicture ? userInfo.profilePicture : 'no-img',
                        }}
                        overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                        size={70}
                    />
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>{userInfo.name}</Text>
                </View>
                <Text style={{ marginTop: 20 }}>My BIO to rule the word and i will rule it one day. Sooner or later, </Text>
                <View
                    style={{
                        marginTop: 20,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 2,
                    }}
                />
                <Image
                    style={{ width: 300, height: 300, backgroundColor: 'white' }}
                    source={{ uri: userInfo.qrCode }}
                //  source={require('../../../assets/qrCodeImage.png')}
                />
            </View>
        );
    }
    renderButtons = () => {
        return (
            <View style={{ marginTop: 30, flexDirection: 'row', borderWidth: 1, height: 70, borderColor: 'grey', borderRadius: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 / 3 }}>
                    <Text style={{ fontWeight: 'bold' }}>70</Text>
                    <Text>Connections</Text>
                </View>
                <TouchableOpacity style={{ justifyContent: 'space-around',borderTopLeftRadius:10,borderBottomLeftRadius:10, alignItems: 'center', backgroundColor: '#EFEFEF', flex: 2 / 3, flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}
                    onPress={() => this.handleNavigation('scan-qrcode')}
                >
                    <Icon type='material-community' name='qrcode-scan' size={40} color='black' />
                    <Text style={{ fontWeight: 'bold', marginLeft: 25 }}>Scan A Loop Connect to Add Connections</Text>
                </TouchableOpacity>
                {/* <Button
                    title="Scan QR Code"
                    onPress={() => this.handleNavigation('scan-qrcode')}
                    buttonStyle={{ width: 300, backgroundColor: 'black', borderRadius: 5 }}
                />
                <Button
                    onPress={() => this.handleNavigation('your-contacts')}
                    title="Your Contacts"
                    TouchableOpacity={1}
                    buttonStyle={{ width: 300, marginTop: 20, backgroundColor: 'black', borderRadius: 5 }}
                /> */}
            </View>
        );
    }
    // Render any loading content that you like here
    render() {
        let { error, isLoading, userInfo, } = this.props;
        if (error) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                    <Icon type='material-community' name='refresh' size={40} color='black' onPress={() => {
                        this.props.fetchUserInfo()
                    }} />
                </View>

            )
        } else if (isLoading || !this.props.userInfo) {
            return (
                <View
                    style={{
                        flex: 1,
                        // padding: 20,
                        justifyContent: 'center',
                        backgroundColor: 'white',

                    }}>
                    <ActivityIndicator color='black' />
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
                    backgroundColor: 'white',
                }}>
                    {this.renderQRCode()}
                    {this.renderButtons()}
                </SafeAreaView>

            );
        }
    }
}