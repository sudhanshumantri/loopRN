import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    searchBarContainer: {
        backgroundColor: 'white', borderBottomColor: 'white'
    },
    searchBarInputContainer: {
        backgroundColor: '#EEEEEE'
    },
    subheading:{
        color:'grey',
    },
    horizontalDivider: {
        marginTop:10,
        marginBottom:8,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 1,
    },


}
export default styles;