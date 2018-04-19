import React, { Component } from 'react'

import {
    Platform,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    WebView
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            check: false,
            url: null
        }
    }

    // componentDidMount(){
    //     if(!this.props.data.length){
    //         this.props.init();
    //     }
    // }

    onpress() {
        fetch('http://192.168.1.45:9000/account/v1/sns/start/via/facebook', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert(responseJson);
                console.log(responseJson.data);
                this.setState({url: responseJson.data})

                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderWebView(){
        console.log(this.state.check);
        if(this.state.check){
            if(!this.state.url) this.onpress();
            return(
                <WebView
                    source={{uri: this.state.url}}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                />
            );
        }else {
            return(
                <TouchableOpacity
                    onPress={()=>this.setState({check: true})}>
                    <Text>asd;lfkjasl;df</Text>
                    <Text>Open WebView</Text>
                </TouchableOpacity>
            );
        }
    }

    _onNavigationStateChange(webViewState){
        console.log("abc", webViewState.url)
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                {this.renderWebView()}
            </View>
        );
    }
}