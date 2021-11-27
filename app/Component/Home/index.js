import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { Card, Avatar, Divider, Icon, Badge, Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import style from './style';
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            currentSharingPosition: 0,
            subscriptionPlanModalVisible: false,
        }
    }
    componentDidMount() {
        this.props.fetchUserInfo();
    }
    handleSharingPreferenceChange = (type) => {
        this.props.updateUserSharingInfo({ sharingType: type })
        // this.setState({
        //     currentSharingPosition: index
        // })
    }
    handleNavigation = (route) => {
        this.props.navigation.navigate(route)
    }
    renderSharingStatusToggle = () => {
        let { userInfo } = this.props;
        let isAllShared = this.props.userSharingInfo.sharedAllInfo;
        let hasCustomSharing = this.props.userSharingInfo.hasCustomSharing;
        let socialMediaSharing = false;
        let personalInfoSharing = false;
        let professionalInfoSharing = false;
        let customInfoSharing = false
        if (isAllShared) {

        } else {
            socialMediaSharing = this.props.userSharingInfo.socialMediaSharing.sharingConfigurations.isShared;
            personalInfoSharing = this.props.userSharingInfo.personalInfoSharing.sharingConfigurations.isShared;
            professionalInfoSharing = this.props.userSharingInfo.professionalInfoSharing.sharingConfigurations.isShared;
            customInfoSharing = this.props.userSharingInfo.customInfoSharing.sharingConfigurations.isShared;

        }
        return (
            <View style={style.qrCodeBottomSection}>
                <View style={style.qrCodeBottomSectionLeft}>
                    <Image
                        style={{ width: 250, height: 250, backgroundColor: 'white' }}
                        source={{ uri: userInfo.qrCode }}
                    //  source={require('../../../assets/qrCodeImage.png')}
                    />
                </View>
                <View style={style.qrCodeBottomSectionRight}>
                    <View style={style.verticalLine}>
                        <View style={style.verticalLineTextContainer}>
                            <TouchableOpacity style={isAllShared ? style.activeShared : ''} onPress={() => this.handleSharingPreferenceChange('isAllShared')}><Text>All</Text></TouchableOpacity>
                            <TouchableOpacity style={personalInfoSharing ? style.activeShared : ''} onPress={() => this.handleSharingPreferenceChange('personalInfoSharing')}><Text>Personal</Text></TouchableOpacity>
                            <TouchableOpacity style={professionalInfoSharing ? style.activeShared : ''} onPress={() => this.handleSharingPreferenceChange('professionalInfoSharing')}><Text>Professional</Text></TouchableOpacity>
                            {hasCustomSharing && (
                                <TouchableOpacity style={customInfoSharing ? style.activeShared : ''} onPress={() => this.handleSharingPreferenceChange('customInfoSharing')}><Text>Custom</Text></TouchableOpacity>
                            )}
                        </View>

                    </View>
                </View>

            </View>
        )
    }
    renderQRCode = () => {
        let { userInfo } = this.props;
        //    console.log(this.props.userInfo.qrCode);
        return (
            <View style={style.qrCodeContainer}>
                <View style={style.qrCodeTopSection}>
                    <Avatar
                        containerStyle={{ marginTop: -40, }}
                        rounded
                        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                        source={{

                            uri: userInfo.profilePicture ? userInfo.profilePicture : 'no-img',
                        }}
                        onPress={() => this.props.navigation.navigate('Profile')}
                        overlayContainerStyle={{ backgroundColor: 'rgb(20, 41, 82)' }}
                        size={70}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>{userInfo.name}</Text>
                </View>
                <Text style={{ marginTop: 20 }}>{userInfo.aboutMe}</Text>
                <View
                    style={style.horizontalDivider}
                />
                {this.renderSharingStatusToggle()}
            </View>
        );
    }
    renderButtons = () => {
        return (
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.buttonHolderLeft}
                    onPress={() => this.handleNavigation('your-contacts')}
                >
                    <Text style={{ fontWeight: 'bold' }}>70</Text>
                    <Text>Connections</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonHolderRight}
                    onPress={() => this.handleNavigation('scan-qrcode')}
                >
                    <Icon type='material-community' name='qrcode-scan' size={40} color='black' />
                    <Text style={{ fontWeight: 'bold', marginLeft: 25 }}>Scan A Loop Connect to Add Connections</Text>
                </TouchableOpacity>
            </View>
        );
    }
    // Render any loading content that you like here
    render() {
        let { error, isLoading, userInfo, userSharingInfo, isInformationSharingUpdate } = this.props;
      //  console.log(userSharingInfo);
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
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}>
                    <ActivityIndicator color='black' />
                </View >
            )
        } else {
            //    console.log(userInfo.user.first_name, infoLoading)
            return (
                <SafeAreaView style={style.safeAreaView}>
                    <View style={style.container}>
                        <Spinner color='grey'
                            visible={isInformationSharingUpdate} />

                        {this.renderQRCode()}
                        {this.renderButtons()}
                    </View>
                </SafeAreaView>

            );
        }
    }
}