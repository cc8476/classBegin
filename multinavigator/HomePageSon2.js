/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Button,Image
} from 'react-native';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View
            style={{
              flex: 1,
              backgroundColor: 'cyan',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>陈大诺2</Text>
            <Image
            style={{width:200,height:200}}
            source={require("./assets/w2.jpeg")} ></Image>
            <Button
            title="跳转到详情"
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}></Button>
          </View>
        );
    }
}

export default App;