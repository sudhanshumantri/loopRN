import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
const styles = StyleSheet.create({
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        //   fontWeight: 'bold',
        //  width:200
    },
    picker: {
        width: 100
    },
})
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    // padding: 20,
                    justifyContent: 'center',
                    backgroundColor: '#2DB38D',

                }}>
                <Text>Profile Page</Text>
            </View >
        )

    }
}
