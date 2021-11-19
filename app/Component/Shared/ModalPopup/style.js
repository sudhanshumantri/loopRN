import React, { Component } from 'react'
import { Dimensions, Platform } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
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