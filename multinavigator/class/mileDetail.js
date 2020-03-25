/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet,DatePickerIOS,Picker
} from 'react-native';

import { Input,CheckBox,Slider,Button } from 'react-native-elements';



class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state ={
          coin:0.5
        }

    }


    static navigationOptions = ({navigation}) =>{
      return {

        title:"里程碑详细",
        headerStyle:{
          backgroundColor:"skyblue"
        },
        headerTintColor:"#ff00ff",
        headerTitleStyle:{
          fontSize:20,
          fontWeight:"bold"
        },
         headerLeft:()=>{
          return <Button title="返回" 
          onPress={() => {
            navigation.navigate('Table');
          }}
          ></Button>
        } 
      }
    } 


 

    render() {
        return (
          <View >
       <Text>[周五]-[期末考试]</Text>
       <Text>总金币数：100</Text>

<Text onPress={() => {
                this.props.navigation.navigate('ClassDetail');
              }}>关联课程：语文一课一练</Text>


<Text>日期：5-10</Text>
<Text>剩余 10 天</Text>



        </View>
        );
    }
}

export default App;