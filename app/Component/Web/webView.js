import React, { Component } from 'react';
import { Linking, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebViewThatOpensLinksInNavigator extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         uri: null
    //     }
    // }

    componentDidMount() {
        let uri = this.props.navigation.state.params.link;
     //   this.setState({})
  //      console.log('url to display', uri);
    }
    render() {
        let uri = this.props.navigation.state.params.link;
        console.log('url', uri);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    style={{
                        flex: 1
                    }}
                    ref={(ref) => { this.webview = ref; }}
                    source={{ uri }}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onNavigationStateChange={(event) => {
                        if (event.url !== uri) {
                            this.webview.stopLoading();
                            Linking.openURL(event.url);
                        }
                    }}
                />
            </SafeAreaView>
        );
    }
}