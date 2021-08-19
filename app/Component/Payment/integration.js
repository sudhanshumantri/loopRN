import React from 'react';
import { Platform, DeviceEventEmitter, AsyncStorage, Text, SafeAreaView, NativeModules, NativeEventEmitter, ActivityIndicator, View, Dimensions } from 'react-native';
import Paytm from 'react-native-paytm';
//import Paytm from '@philly25/react-native-paytm';
import { Button, Avatar } from 'react-native-elements';
var paytmEvent = null;
// Data received from PayTM
const paytmConfig = {
    //  MID: 'wTjqde89158521893033',
    MID: 'xzuFYk72861627453188',
    WEBSITE: 'DEFAULT',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback'
    //  CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback'
};

export default class PaytmIntegration extends React.Component {
    constructor() {
        super()
        this.state = {
            checkSum: null,
            isLoading: true,
            transactionfor: null,
            transaction_for_unique_id: null,
            mobile: null,
            guid: null,
            price: '',
            isError: false,
            isSucess: false,
            loadingText: 'Connecting to payment gateway',
            token: '',
            to_guid: ''
        }
    }
    componentWillMount() {
        if (Platform.OS == 'ios') {
            const { RNPayTm } = NativeModules
            const emitter = new NativeEventEmitter(RNPayTm)
            emitter.addListener('PayTMResponse', this._handlePaytmResponse)
        } else {
            DeviceEventEmitter.addListener('PayTMResponse', this._handlePaytmResponse)
        }
    }
    componentDidMount() {
        let { transactionfor, transaction_for_unique_id, mobile, guid, price, to_guid } = this.props.navigation.state.params;
        this.setState({
            transactionfor,
            transaction_for_unique_id,
            mobile,
            guid,
            price,
            to_guid

        })
        this.bootstrapAsyncUserToken().then(info => {
            this.setState({
                token: info.token
            })
            this.fetchChecksum();
        });
    }

    bootstrapAsyncUserToken = async () => {
        return {
            userId: await AsyncStorage.getItem('userId'),
            token: await AsyncStorage.getItem('token')
        };

    };
    fetchChecksum = () => {
        const callbackUrl = paytmConfig.CALLBACK_URL;
        let { transactionfor, transaction_for_unique_id, token, to_guid } = this.state;
        //change transaction data for bookings;
        let data = {}
        if (transactionfor == 'chat') {
            data = {
                transactionfor,
                transaction_for_unique_id,
                CHANNEL_ID: paytmConfig.CHANNEL_ID,
                CALLBACK_URL: callbackUrl,
                INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
                to_guid
            };
        } else {
            data = {
                transactionfor,
                transaction_for_unique_id,
                CHANNEL_ID: paytmConfig.CHANNEL_ID,
                CALLBACK_URL: callbackUrl,
                INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
            };
        }
        console.log(data);
        return fetch('https://svcaapkadoctor.azurewebsites.net/api/transactions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
        }).then((response) =>
            response.json()
        )
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    checkSum: responseJson.checkSum,
                    orderId: responseJson.order_id.toString(),
                    isLoading: false
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentWillUnmount() {

        //    Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, this._handlePaytmResponse);
    }
    onPayTmResponse(response) {
        // Process Response
        // response.response in case of iOS
        // reponse in case of Android
        console.log(response);
    }

    _handlePaytmResponse = (resp) => {
        const { STATUS, status, response } = resp;
        console.log('_handlePaytmResponse', response);
        this.setState({
            isLoading: true,
            loadingText: 'Getting Response'
        })
        //  console.log(this.state.token, '_handlePaytmResponse');
        fetch('https://svcaapkadoctor.azurewebsites.net/api/transactions/' + this.state.orderId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            },
        }).then((response) => {
            console.log('transaction response', response);
            //       this.setState({ processing: false, payment_text: '', isLoading: true });
            if (response.status !== 200) {
                this.setState({
                    isSucess: false,
                    isError: true,
                    loadingText: 'Connecting to payment gateway'
                })
            } else {

                //handling for chat bookings and then send the apk
                if (this.state.transactionfor == 'chat') {
                    this.props.fetchChatList()
                    this.props.navigation.navigate('Chat', {
                        fromId: this.state.guid,
                        toId: this.state.to_guid
                    })
                }
                else if (this.state.transactionfor == 'membership') {
                    this.props.fetchUserMembershipPlan()

                    this.setState({
                        isSucess: true,
                        isError: false
                    })
                    setTimeout(this.goBack, 2000);
                }
            }
        })
            .catch((error) => {
                this.setState({ processing: false, payment_text: '', isLoading: true });
                console.error(error);
            });
    };

    retryPayment = () => {

        this.fetchChecksum();
        this.setState({
            isLoading: true,
            isError: false
        })
    }

    runTransaction = () => {
        // let callbackUrl = paytmConfig.CALLBACK_URL;

        let { mobile, guid, price, orderId } = this.state;
        const callbackUrl = `${paytmConfig.CALLBACK_URL}` + '?ORDER_ID=' + orderId;
        console.log(callbackUrl);
        const details = {
            mode: 'Production', // 'Staging' or 'Production'
            MID: paytmConfig.MID,
            INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
            WEBSITE: paytmConfig.WEBSITE,
            CHANNEL_ID: paytmConfig.CHANNEL_ID,
            TXN_AMOUNT: price.toString(), // String
            ORDER_ID: this.state.orderId, // String
            //     MOBILE_NO: mobile.toString(), // String
            CUST_ID: guid.toString(), // String
            CHECKSUMHASH: this.state.checkSum, //From your server using PayTM Checksum Utility 
            CALLBACK_URL: callbackUrl
            //  MERC_UNQ_REF: mercUnqRef, // optional
        };

        Paytm.startPayment(details);
    }
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {

        if (this.state.isError) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    <Avatar
                        rounded
                        size={200}
                        icon={{ name: 'times-circle', type: 'font-awesome', }}
                        //   onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: 'red' }}
                    />
                    <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 20, fontSize: 20 }}>Transaction Failed</Text>
                    <Button
                        titleStyle={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}
                        buttonStyle={{ borderRadius: 20, marginTop: 20, backgroundColor: 'white', width: Dimensions.get('window').width / 2, }}
                        title='Retry'
                        //  titleStyle={{colo}}
                        onPress={this.retryPayment}
                    />

                    <Button
                        titleStyle={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}
                        buttonStyle={{ borderRadius: 20, marginTop: 20, backgroundColor: 'black', width: Dimensions.get('window').width / 2, }}
                        title='Go Back'
                        titleStyle={{ color: 'white' }}
                        onPress={this.goBack}
                    />
                </SafeAreaView>
            )
        }
        else if (this.state.isSucess) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    <Avatar
                        rounded
                        size={200}
                        icon={{ name: 'check-circle', type: 'font-awesome', color: '#2DB38D' }}
                        //   onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: 'white' }}
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 20, fontSize: 20 }}>Transaction Successful</Text>
                </SafeAreaView>
            )
        }

        else
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    {this.state.isLoading ? (
                        <View>
                            <ActivityIndicator color='white' />
                            <Text style={{ color: 'white', }}>{this.state.loadingText}</Text>
                        </View>
                    ) :
                        this.runTransaction()
                    }
                </SafeAreaView>
            )
    }
}