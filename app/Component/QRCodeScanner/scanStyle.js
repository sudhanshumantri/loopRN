import React, { Component } from 'react'
import { Dimensions, Platform } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6b3871',
    },

    textTitle: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        // padding: 16,
        color: 'black',
        marginBottom: 40
    },
    horizontalDivider: {
        //  marginTop: 20,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
        width: 300
    },
    inputStyle: {
        height: 40,
        marginTop: 3,
        borderRadius: Platform.OS === 'ios' ? 5 : 2,
        borderColor: 'black',
        color: 'black',
        borderWidth: Platform.OS === 'ios' ? 0.5 : 0.1,
        paddingLeft: 5
    },
    labelStyle: {
        fontSize: 18, color: 'black',
    },
    buttonStyle: {
        marginLeft: 15, marginRight: 15, backgroundColor: 'black', borderRadius: 5,fontSize:12, fontWeight:'600'
    },
    postScanContainer: {
       alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 20
    },
    postScannerHolder:{
        borderWidth: 1, borderColor: '#C1C1C1', borderRadius: 10, paddingTop:30,paddingBottom:30, paddingLeft:10, paddingLeft:10
    },
    personalNoteButtonStyle:{
        borderRadius: 5,
        padding: 10,
        // elevation: 1,
        margin:5,
        backgroundColor: "white",
        border:2,
        borderColor:'#D1D1D1'
    }
}
export default styles;