/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet,DatePickerIOS,Picker
} from 'react-native';

import { Input,CheckBox,Slider,Button } from 'react-native-elements';
import data from '../data/data';
import {title} from '../kit/common'



class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state ={
          id:props.navigation.state.params.id,
          data:{
            name:"",
            coin:0,
            id:0,
            uptime:0,
            relateclass:0
          }
        }

    }

    componentDidMount() {

      data.Instance().getMileById(this.state.id).then(
        (ret)=>{
          this.setState({
            data:{
              name:ret.name,
              coin:ret.coin,
              id:ret.id,
              relateclass:ret.relateclass,
              uptime:ret.uptime
            }
          })

          if(ret.relateclass>0) {
            data.Instance().getClassById(ret.relateclass).then(
              (ret)=>{
                this.setState({
                  classData:ret
                })
              }
            )
          }

        }
      )

    }


    static navigationOptions = ({navigation}) =>{
      return Object.assign({
         headerLeft:()=>{
          return <Button title="返回" 
          type="clear"
          onPress={() => {
            navigation.navigate('Table');
          }}
          ></Button>
        } 
      },title('里程碑内容'));
    } 


 

    render() {
      let state =this.state;
      console.log("state");
        return (
          <View >
       <Text>{state.data.name}</Text>
       <Text>到期日:{state.data.uptime}</Text>
       <Text>剩余 10 天</Text>
       <Text>奖励金币:{state.data.coin}</Text>
         <Text 
         onPress={() => {
           if(state.classData) {
            this.props.navigation.navigate('ClassDetail', {id:state.classData.id })
           }
          
        }}

         >关联课程：{state.classData?state.classData.name:"无"}</Text> 

        <Button title="提交"
          onPress={
            ()=>{
              data.Instance().updateMileById(state.data.id,50)
            }
          }
        ></Button>

        </View>
        );
    }
}

export default App;