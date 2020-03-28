/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet
} from 'react-native';

import data from '../data/data';

import { Input,CheckBox,Slider,Button } from 'react-native-elements';



class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state ={
          coin:5,
          className:""
        }

    }


    static navigationOptions = ({navigation}) =>{
      return {

        title:"添加课程",
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
         <Input onChangeText={
           (value)=>{
              this.setState(
                  {
                      "className":value
                  }
              )
           }
         }
  placeholder='课程名称'
/>
<Input
  placeholder= {String((this.state.coin)+"金币")} 
  value={String((this.state.coin)+"金币")} 
/>
<Slider value={this.state.coin/10}
    onValueChange={v => this.setState({ coin: Math.floor(v*10 )})}
  />


<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>
<CheckBox
  title='Click Here'
/>

<Button
  title='提交'
  onPress= {
    ()=>{
        data.Instance().addClass(this.state);
    }

  }
/>

        </View>
        );
    }
}

export default App;