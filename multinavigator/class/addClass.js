/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet
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
         <Input
  placeholder='课程名称'
/>
<Input
  placeholder= {String(Math.floor(this.state.coin*10)+"金币")} 
  value={String(Math.floor(this.state.coin*10)+"金币")} 
/>
<Slider value={this.state.coin}
    onValueChange={v => this.setState({ coin:v })}
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
/>

        </View>
        );
    }
}

export default App;