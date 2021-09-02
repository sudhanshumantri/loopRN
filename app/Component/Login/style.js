import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    inputSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // width: Dimensions.get('window').width * 0.75,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        height: 40,
        marginTop: 3,
        borderRadius: 3,
        borderColor: 'white',
        color: 'black',
        borderWidth: 0.5,
        paddingLeft: 5,
        backgroundColor: 'white'
        // flex: 1,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        // paddingLeft: 0,
        // height: 40,
        // marginTop: 3,
        // borderRadius: 3,
        // borderColor: 'white',
        // color: 'white',
        // borderWidth: 0.5,
        // paddingLeft: 5
        // // backgroundColor: 'white',
        // // color: '#424242',
    },
}
export default styles;