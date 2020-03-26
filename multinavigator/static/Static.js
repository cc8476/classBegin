/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image
} from 'react-native';
class App extends React.Component {
    constructor(props) {
        super(props);
    }

     static navigationOptions ={
      title:"统计",
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
            source={require("../assets/w1.jpeg")} ></Image>


<Text>当前课程：共10门</Text>
<Text>关联里程碑：共5个</Text>
<Text>金币总数：20个</Text>
<Text>级别： lv3 --> 努力的娃</Text>
<Text>距离升级：300/400</Text>


           
          </View>
        );
    }
}

export default App;