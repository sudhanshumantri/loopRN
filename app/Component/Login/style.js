import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    conatiner: {
        flex: 1,
        // padding: 20,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    inputStyle: {
        height: 40,
        marginTop: 3,
        borderRadius: 3,
        borderColor: 'black',
        color: 'black',
        borderWidth: 0.5,
        paddingLeft: 5
    },
    labelStyle:{
        fontSize: 18, color: 'black',
    },
    buttonStyle:{
        width: 300, marginTop: 20,backgroundColor:'black',borderRadius:5
    }
}
export default styles;