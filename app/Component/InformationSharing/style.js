import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    conatiner: {
    },
    headerText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
    },
    checkboxesContainerStyle: {
        backgroundColor: 'white', borderWidth: 0.9, borderRadius: 2
    },
    checkedColor: 'black'
    ,
    checkTextColor: {
        color: 'black'
    }

}
export default styles;