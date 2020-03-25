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

        title:"课程详细",
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
       <Text>语文一课一练</Text>
       <Text>每日金币：3</Text>

<Text onPress={() => {
                this.props.navigation.navigate('MileDetail');
              }}>关联里程碑：[周五]-[期末考试]</Text>


<Text>一周5节课</Text>
<Text>已上10节课了</Text>



        </View>
        );
    }
}

export default App;