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
            dayArray:[],
            id:0,
            relatemile:0,
            time:0,
            starttime:0
          }
          
        }
    }

    componentDidMount() {

      data.Instance().getClassById(this.state.id).then(
        (ret)=>{
          //{"coin": 5, "dayArray": [1, 2, 3, 4], "id": 11, "name": "C1", "relatemile": "", "starttime": 1585366346212, "time": 0}
          this.setState({
            data:{
              name:ret.name,
              coin:ret.coin,
              dayArray:ret.dayArray,
              id:ret.id,
              relatemile:ret.relatemile,
              time:ret.time,
              starttime:ret.starttime
            }
          })

          if(ret.relatemile>0) {
            data.Instance().getMileById(ret.relatemile).then(
              (ret)=>{
                this.setState({
                  mileData:ret
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
      },title("课程详细"))
    } 


 

    render() {

        let state =this.state;
        console.log("state",state);
        return (
          <View >
       <Text>{state.data.name}</Text>
       <Text>每日金币：{state.data.coin}</Text>

       <Text 
         onPress={() => {
           if(state.mileData) {
            this.props.navigation.navigate('MileDetail', {id:state.mileData.id })
           }
          
        }}

         >关联里程碑：{state.mileData?state.mileData.name:"无"}</Text> 


             <Text>一周  {state.data.dayArray.length}节课</Text> 
<Text>已上{state.data.time}节课了</Text>



        </View>
        );
    }
}

export default App;