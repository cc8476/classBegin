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

        title:"添加里程碑",
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
  placeholder='名称'
/>
<Input
  placeholder= {String(Math.floor(this.state.coin*10)+"金币")} 
  value={String(Math.floor(this.state.coin*10)+"金币")} 
/>
<Slider value={this.state.coin}
    onValueChange={v => this.setState({ coin:v })}
  />
<Text>到期时间</Text>

<DatePickerIOS
mode='date'
locale='zh-cn'
date={new Date()}
></DatePickerIOS>
<Text>关联课程</Text>
<Picker
 /*  selectedValue={this.state.language} */
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>

<Button
  title='提交'
/>

        </View>
        );
    }
}

export default App;