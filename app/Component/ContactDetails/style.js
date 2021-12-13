import React, { Component } from 'react'
import { Dimensions,Platform } from 'react-native';
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
        borderRadius: Platform.OS === 'ios' ? 5 : 2,
        borderColor: 'black',
        color: 'black',
        borderWidth: Platform.OS === 'ios'?0.5:0.1,
        paddingLeft: 5,
        textTransform:'capitalize'
    },
    labelStyle:{
        fontSize: 16, color: 'black',marginTop:10
    },
    buttonStyle:{
        width: 300, marginTop: 20,backgroundColor:'black',borderRadius:5
    },
    profileTopContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 50
    },
    horizontalDivider: {
        marginTop: 15,
        marginBottom: 5,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
    },
    textBoldStyle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    sectionHeader:{
        fontSize: 18, fontWeight: '600'
    },
    iconContainer:{
        alignItems: 'center', justifyContent: 'center',
        margin:20
    },
    iconLabel:{
        fontSize:12,fontWeight:'600', marginTop:5
    }
}
export default styles;