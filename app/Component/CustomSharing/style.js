import React, { Component } from 'react'
import { Dimensions, Platform } from 'react-native';
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
    textBoldStyle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    sectionHeader: {
        fontSize: 18, fontWeight: '600'
    },
    inputStyle: {
        height: 40,
        marginTop: 3,
        borderRadius: Platform.OS === 'ios' ? 5 : 2,
        borderColor: '#C1C1C1',
        color: 'black',
        borderWidth: Platform.OS === 'ios' ? 0.5 : 0.1,
        paddingLeft: 5
    },
    labelStyle: {
        fontSize: 16, color: 'black', marginTop: 10
    },
    buttonStyle: {
        width: 300, marginTop: 20, backgroundColor: 'black', borderRadius: 5
    },
    profileTopContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 50
    },
    flexToggleRootContainer: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10

    },
    titleStyle: {
        fontSize: 18, fontWeight: '600'
    },
    horizontalDivider: {
        marginTop: 15,
        marginBottom: 5,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 2,
    },
    iconContainer: {
        alignItems: 'center', justifyContent: 'center',
        margin: 20
    },
    iconLabel: {
        fontSize: 12, fontWeight: '600', marginTop: 5
    },
    modalView: {
        width:300,
        // height:300,
        // margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:80,
        margin:5,
    },
    buttonSave: {
        backgroundColor: "black",
    },
    buttonClose: {
        backgroundColor: "white",
        border:1,
        borderColor:'black'
        
    },
    textStyleClose: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        // textAlign: "center",
        fontSize:16,
        fontWeight:'600'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
}
export default styles;