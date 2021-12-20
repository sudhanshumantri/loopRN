import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container: {
        width: Dimensions.get('window').width * .95
    },
   
    titleStyle:{
        marginTop:10, fontSize: 18, fontWeight: '600'
    },
    subtitleStyle:{
        fontSize: 16, fontWeight: '600'
    },
    horizontalDivider: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
    },
}
export default styles;