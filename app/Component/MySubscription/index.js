import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import moment from 'moment';
export default class Profile extends React.Component {

    componentDidMount() {
        this.props.fetchUserMembershipPlan()
    }
    renderMySubscriptionPlans = () => {
        let { userMembershipPlan } = this.props
        return userMembershipPlan.map(plan => {
            return (
                <Card containerStyle={{
                    borderRadius: 5,
                    shadowOffset: { width: 0, height: 0.5 },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    borderWidth: 0.5,
                    elevation: 5
                }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#2DB38D', }}>{plan.plan_name.toUpperCase()}</Text>
                        <Text style={{ color: 'red', marginTop: 5 }}>{'Expires on ' +
                            moment(plan.expires_at).format('DD-MM-YYYY')
                        }</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey', }}>Cost</Text>
                            <Text style={{ color: '#2DB38D', marginTop: 5 }}>Rs {plan.plan_price}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey', }}>Allocated</Text>
                            <Text style={{ color: '#2DB38D', marginTop: 5 }}>{plan.benefit_type == 'services' ? plan.offering + ' services' : 'Rs ' + plan.offering} </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey', }}>Wallet</Text>
                            <Text style={{ color: '#2DB38D', marginTop: 5 }}>{plan.benefit_type == 'services' ? plan.wallet_services + ' services' : 'Rs ' + plan.wallet_amount}</Text>
                        </View>

                    </View>


                </Card>
            )
        })
    }

    render() {
        let { userMembershipPlan, userMembershipPlanError, userMembershipPlanLoading } = this.props;
     //   console.log(userMembershipPlan, userMembershipPlanError, userMembershipPlanLoading)
        if (userMembershipPlanError) {
            return (
                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2DB38D', }}>
                    <Icon type='material-community' name='refresh' size={40} color='white' onPress={() => {
                        this.props.fetchUserMembershipPlan()
                    }} />
                </View>

            )
        }
        else if (userMembershipPlanLoading) {
            return (

                <View style={{ flex: 1, padding: 20, backgroundColor: '#2DB38D', justifyContent: 'center' }}>
                    <ActivityIndicator color='white' />
                </View>
            )
        } else {
            return (

                <SafeAreaView style={{
                    flex: 1,
                    // padding: 20,
                    justifyContent: 'flex-start',
                    backgroundColor: '#2DB38D'
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.renderMySubscriptionPlans()}
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}