import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
       margin:20
    },
    flexRootContainer:{
        flexDirection: 'row',alignItems:'center',marginBottom:10,marginTop:10
    },
    horizontalDivider: {
        marginTop: 20,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
    },
    titleStyle:{
        marginLeft: 10, fontSize: 18, fontWeight: '600'
    }
}
export default styles;