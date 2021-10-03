import React, { Component } from 'react'
import { Dimensions,Platform } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6b3871',
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        // padding: 16,
        color: 'black',
        marginBottom:25
    },
    inputStyle: {
        height: 40,
        marginTop: 3,
        borderRadius: Platform.OS === 'ios' ? 5 : 2,
        borderColor: 'black',
        color: 'black',
        borderWidth: Platform.OS === 'ios'?0.5:0.1,
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