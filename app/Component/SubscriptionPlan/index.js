import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    View,
    Modal,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { WebView } from 'react-native-webview';
import { PricingCard, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SafeAreaView from 'react-native-safe-area-view';
import PaytmIntegration from '../Payment/integration'


export default class SubscriptionPlan extends React.Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
        }
    }

    hideModal = () => {
        this.props.hideModal();
    }
    handlePlanSelect = (membership_id, price) => {
     //   alert(membership_id);
        this.props.hideModal();
        this.props.navigation.navigate('PaytmIntegration',
            {
                transactionfor: 'membership',
                transaction_for_unique_id: membership_id,
                mobile: this.props.mobile,
                guid: this.props.guid,
                price
            })
    }
    renderMembershipPlan = () => {
        let { membershipPlan } = this.props;
        return membershipPlan.map(plan => {
            //    console.log(plan)
            let planOffer = 'You will get ' + (plan.benefit_type == 'services' ? plan.offering + ' online comsultation' : 'Rs ' + plan.offering)
            return (
                <PricingCard
                    color="#2DB38D"

                     containerStyle={{ borderColor:'#2DB38D',borderRadius:5 }}
                    title={plan.plan_name}
                    price={'₹' + plan.plan_price}
                    info={[<Text><Text style={{color:'#2DB38D'}}>Description:</Text>{'\n\n'+plan.description}</Text>,
            <Text> <Text style={{color:'#2DB38D'}} >{'\n'}T&C* </Text>{'\n\n'+plan.tnc}</Text>
                  ]}
                  infoStyle={{textAlign:"left"}}
                    button={{ title: 'Subscribe',  }}
                    onButtonPress={() => this.handlePlanSelect(plan.membership_id, plan.plan_price)}
                />

            )
        })
    }
    render() {
        let { membershipPlan } = this.props;
        console.log(membershipPlan)
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={
                        this.hideModal}>
                    <SafeAreaView style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{
                                // backgroundColor:'#2DB38D',
                                justifyContent: 'space-evenly',
                                marginTop: 20
                            }}>
                                <View style={{ alignItems: 'flex-end' }}>

                                    <Icon
                                        name='close'
                                        type='material-community'
                                        color='red'
                                        raised
                                        onPress={this.hideModal}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#2DB38D" }}>Our Exiciting Plans</Text>
                                </View>
                                {this.renderMembershipPlan()}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
            </View>


        );
    }
}