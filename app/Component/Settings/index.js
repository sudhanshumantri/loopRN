import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
    Text, SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
const list = [
    {
        title: 'Information Sharing',
        icon: 'info-outline'
    },
    {
        title: 'Password & Security ',
        icon: 'security'
    },
    {
        title: 'Display',
        icon: 'grid-view'
    },{
        title: 'Recommend',
        icon: 'recommend'
    },
  ];
export default class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPosition: 0,
            subscriptionPlanModalVisible: false,
        }
    }
    componentDidMount() {

    }

    // Render any loading content that you like here
    render() {
        //    console.log(userInfo.user.first_name, infoLoading)
        return (
            <SafeAreaView style={{
                flex: 1,
                // padding: 20,
                justifyContent: 'flex-start',
                backgroundColor: '#403A6A',
            }}>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <Icon name={item.icon} type='material'/>
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </SafeAreaView>

        );
    }
}