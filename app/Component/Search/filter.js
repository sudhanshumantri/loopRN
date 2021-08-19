import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, Modal, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import { Rating, Card, Icon, Divider, Slider } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#2DB38D',
        padding: 10,
        borderRadius: 20,
        marginTop: 20
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        //   fontWeight: 'bold',
        //  width:200
    }
})

//import Icon from "react-native-vector-icons/MaterialIcons";
export default class DoctorFilter extends React.Component {
    constructor() {
        super()
        this.state = {
            showFilteringModal: false,
            location: '',
            minrating: null,
            maxrating: null,
            minfees: null,
            maxfees: null

        }
    }
    componentDidMount = () => {
        let { minrating, maxrating, minfees,maxfees  } = this.props.appliedFilters;
        this.setState({
            minrating:minrating?parseInt(minrating):null,
            maxrating:maxrating?parseInt(maxrating):null,
            minfees,
            maxfees
        })
    }
    closeFilteringModal = () => {
        this.props.closeFilteringModal();
    }
    setActiveFilterWindow = (screenName) => {
        this.props.setActiveFilterWindow(screenName);
    }
    handleLocationChange = (text) => {
        this.setState({
            location: text
        })
    }
    renderLocationFilter = () => {
        return (
            <View>
                <TextInput style={{
                    height: 40,
                    borderColor: 'gray', borderWidth: 1, borderRadius: 15, padding: 10
                }}
                    onChangeText={(text) => this.handleLocationChange(text)}
                    value={this.state.location} placeholder='Type Location to Search' />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleFilterSubmit}
                >
                    <Text style={{ color: 'white' }}> Apply </Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleRatingMinChange = (value) => {
        this.setState({
            minrating: Math.round(value)
        })
    }
    handleRatingMaxChange = (value) => {
        this.setState({
            maxrating: Math.round(value)
        })
    }
    resetFilter = () => {
        let data = {
            minfees: null
            , maxfees: null,
            minrating: null,
            maxrating: null
        }

        this.props.handleFilterSubmit(data);
    }
    handleFilterSubmit = () => {
        let { minfees, maxfees, minrating, maxrating } = this.state;
        let data = {
            minfees, maxfees,
            minrating: minrating ? minrating.toString() : null,
            maxrating: maxrating ? maxrating.toString() : null
        }
        this.props.handleFilterSubmit(data);
    }
    renderRating = () => {
        return (
            <View>
                <Text style={{ fontSize: 15, marginTop: 5 }}>Min-Rating </Text>
                <Text style={{ fontSize: 15, marginTop: 5 }}>{this.state.minrating}</Text>
                <Slider
                    thumbTintColor='grey'
                    value={this.state.minrating}
                    thumbStyle={{ width: 10, height: 10 }}
                    trackStyle={{ height: 3 }}
                    maximumTrackTintColor='#2DB38D'
                    minimumValue={0}
                    maximumValue={5}
                    onValueChange={value => this.handleRatingMinChange(value)}
                />
                <Text style={{ fontSize: 15, marginTop: 5 }}>Max-Rating </Text>
                <Text style={{ fontSize: 15, marginTop: 5 }}>{this.state.maxrating}</Text>
                <Slider
                    thumbTintColor='grey'
                    value={this.state.maxrating}
                    thumbStyle={{ width: 10, height: 10 }}
                    trackStyle={{ height: 3 }}
                    maximumTrackTintColor='#2DB38D'
                    minimumValue={0}
                    maximumValue={5}
                    onValueChange={value => this.handleRatingMaxChange(value)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleFilterSubmit}
                >
                    <Text style={{ color: 'white' }}> Apply </Text>
                </TouchableOpacity>
            </View>
        )
    }
    handleMinPriceChange = (value) => {
        this.setState({
            minfees: value
        })
    }
    handleMaxPriceChange = (value) => {
        this.setState({
            maxfees: value
        })
    }


    renderPriceFilter = () => (
        <View>
            <Text style={{ color: '#2DB38D', fontSize: 20, }}>Choose Your Price </Text>

            <Text style={{ fontSize: 15, marginTop: 20 }}>Min-Range </Text>
            <TextInput
                style={{ height: 40, borderColor: '#2DB38D', borderWidth: 1, marginTop: 5, borderRadius: 5, paddingLeft: 5 }}
                onChangeText={text => this.handleMinPriceChange(text)}
                value={this.state.minfees}
                placeholder='Minimum Price '
            />
            <Text style={{ fontSize: 15, marginTop: 20 }}>Max-Range </Text>
            <TextInput
                style={{ height: 40, borderColor: '#2DB38D', borderWidth: 1, marginTop: 20, borderRadius: 5, paddingLeft: 5, marginTop: 5 }}
                onChangeText={text => this.handleMaxPriceChange(text)}
                value={this.state.maxfees}
                placeholder='Maximum Price'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={this.handleFilterSubmit}
            >
                <Text style={{ color: 'white' }}> Apply </Text>
            </TouchableOpacity>
        </View>
    );

    render() {
      //  console.log(this.props.selectedFilterView)
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.showFilteringModal}
                onRequestClose={this.closeFilteringModal}
            >
                <SafeAreaView style={{}}>
                    <ScrollView>

                        <View style={{ flexDirection: 'row', marginBottom: 10, padding: 20 }}>
                            <Icon size={22} color="grey" name="close" type='material-community' onPress={this.closeFilteringModal} />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingLeft: 20, color: '#2DB38D' }}> Filter</Text>
                            <TouchableOpacity onPress={this.resetFilter} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ marginRight: 10, color: 'red', fontSize: 20 }}>Reset All</Text></TouchableOpacity>
                        </View>

                        <Divider style={{ backgroundColor: '#2DB38D' }} />
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 2 }}>
                                {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }} onPress={() => this.setActiveFilterWindow('location')}>
                                    <Icon size={22} color="grey" name="map-marker-radius" type='material-community' />
                                    <Text style={{}}>Location</Text>

                                </TouchableOpacity> */}
                                <Divider />
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }} onPress={() => this.setActiveFilterWindow('price')}>
                                    <Icon size={22} color="grey" name="currency-usd" type='material-community' />
                                    <Text style={{}}>Price</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }} onPress={() => this.setActiveFilterWindow('rating')}>
                                    <Icon size={22} color="grey" name="star" type='material-community' />
                                    <Text style={{}}>Ratings</Text>
                                </TouchableOpacity>
                                <Divider />
                                {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }} onPress={() => this.setActiveFilterWindow('degree')} >
                                    <Icon size={22} color="grey" name="graduation-cap" type='font-awesome' />
                                    <Text style={{}}>Degree</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }} onPress={() => this.setActiveFilterWindow('experience')} >
                                    <Icon size={22} color="grey" name="database-export" type='material-community' />
                                    <Text style={{}}>Experience</Text>
                                </TouchableOpacity>
                                <Divider /> */}



                            </View>
                            <View
                                style={{
                                    height: Math.round(Dimensions.get('window').height),
                                    width: 1,
                                    backgroundColor: '#2DB38D'
                                }}
                            />
                            <View style={{ flex: 4, padding: 20 }}>
                                {/* {this.props.selectedFilterView == 'location' && this.renderLocationFilter()} */}
                                {this.props.selectedFilterView == 'price' && this.renderPriceFilter()}
                                {this.props.selectedFilterView == 'rating' && this.renderRating()}
                                {/* {this.state.selectedFilterView == 'bedroom' && this.renderBedroomFilter()}
                                {this.state.selectedFilterView == 'furnishingStatus' && this.renderFurnishingStatusFilter()} */}

                                {/* {this.state.selectedFilterView == 'status' && this.renderStatusFilter()}
                                {this.state.selectedFilterView == 'propertyType' && this.renderPropertyType()} */}



                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        )
    }
}