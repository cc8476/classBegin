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

     static navigationOptions ={
      title:"首页标题",
      headerStyle:{
        backgroundColor:"skyblue"
      },
      headerTintColor:"#ff00ff",
      headerTitleStyle:{
        fontSize:20,
        fontWeight:"bold"
      }
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
            <Text>陈大诺1</Text>
            <Image
            style={{width:200,height:200}}
            source={require("./assets/w1.jpeg")} ></Image>

            <Button
            title="跳转到详情"
            onPress={() => {
              this.props.navigation.navigate('Detail');
            }}></Button>
          </View>
        );
    }
}

export default App;