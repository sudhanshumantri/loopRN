import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Dimensions, Picker, SafeAreaView, Switch, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Card, Input, ListItem, Avatar, Button, CheckBox, Icon, Divider } from 'react-native-elements';
import moment from 'moment';

const imageBaseurl = 'https://aapkadoctorgrpdiag469.blob.core.windows.net/files/';
//'https://aapkadoctorbs.blob.core.windows.net/files/'
export default class Profile extends React.Component {

    componentDidMount() {
        this.props.fetchUserReports()
    }
    renderItem = ({ item }) => (
        <ListItem
            title={'Prescription id :' + item.emr_id}
            subtitle={'Created on :'+moment(item.first_created_at).format('DD-MM-YYYY')}
            leftAvatar={<Icon
                reverse
                name='file-pdf'
                type='material-community'
                color='#517fa4'
            />}
            bottomDivider
            chevron
            onPress={() => this.props.navigation.navigate('PDFViewer', { link:imageBaseurl + item.prescription_path })}
        />
    )
    renderEmpty = () => {
        return (
            <View style={{ alignItems: "center",justifyContent: 'center',marginTop:50  }}>
                <Text style={{ color: 'white', fontWeight: "bold" }}>
                    Sorry!!You have no generated reports.
                </Text>
            </View>
        )
    }
    keyExtractor = (item) => item.emr_id.toString()
    render() {
        let { reportsFetching, reports } = this.props;
        if (reportsFetching) {
            return (

                <View style={{ flex: 1, padding: 20, backgroundColor: '#2DB38D', justifyContent: 'center' }}>
                    <ActivityIndicator color='white' />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#2DB38D' }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        ListEmptyComponent={this.renderEmpty()}
                        data={reports}
                        initialNumToRender={50}
                        renderItem={this.renderItem}
                        keyboardShouldPersistTaps={"always"}
                    />
                </SafeAreaView>
            )
        }
    }


}