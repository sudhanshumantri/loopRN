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
    qrCodeContainer: {
        borderWidth: 1, borderColor: '#C1C1C1', borderRadius: 10, paddingLeft: 10, paddingRight: 10
    },
    qrCodeTopSection: {
        flexDirection: 'row', left: 15, marginTop: 10
    },

    horizontalDivider: {
        marginTop: 20,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
    },
    qrCodeBottomSection: {
        flexDirection: "row", marginTop: 20, marginBottom: 20, justifyContent: 'center'
    },
    qrCodeBottomSectionLeft: {
        flex: 2 / 3, alignItems: 'center', justifyContent: 'center'
    },
    qrCodeBottomSectionRight: {
        flexDirection: 'row', flex: 1 / 3
    },
    verticalLine: {
        borderLeftWidth: 2,
        borderLeftColor: '#C1C1C1',
    },
    verticalLineTextContainer: {
        flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly', marginLeft: 10
    },
    buttonContainer: {
        marginTop: 30, flexDirection: 'row', borderWidth: 1, height: 70, borderColor: '#C1C1C1', borderRadius: 10
    },
    touchableStyle:{
        width:120,
        marginLeft:-20,
        paddingLeft:20
    },
    buttonHolderLeft: {
        justifyContent: 'center', alignItems: 'center', flex: 1 / 3
    },
    buttonHolderRight:
    {
        justifyContent: 'space-around', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', backgroundColor: '#EFEFEF', flex: 2 / 3, flexDirection: 'row', paddingLeft: 20, paddingRight: 20
    },
    activeShared:{
        borderWidth:1,borderColor:'#C1C1C1',width:90, paddingTop:5,paddingBottom:5,borderRadius:5,zIndex:3
    }
}
export default styles;