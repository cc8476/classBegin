/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text
} from 'react-native';

import { Input,CheckBox,Slider,Button } from 'react-native-elements';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            coin:0.5,
            parentCoin:0.5
        };
    }

    static navigationOptions = ({navigation}) =>{
        return {
  
          title:"每日打分",
          headerStyle:{
            backgroundColor:"skyblue"
          },
          headerTintColor:"#ff00ff",
          headerTitleStyle:{
            fontSize:20,
            fontWeight:"bold"
          }
          
        }
      } 
  





    render() {
        return (
            <View>

<Input
  placeholder= {"自己打分:"+String(Math.floor(this.state.coin*10)+"金币")} 
  value={String(Math.floor(this.state.coin*10)+"金币")} 
/>
<Slider value={this.state.coin}
    onValueChange={v => this.setState({ coin:v })}
  />


<Input
  placeholder= {"家长打分:"+String(Math.floor(this.state.parentCoin*10)+"金币")} 
  value={String(Math.floor(this.state.parentCoin*10)+"金币")} 
/>
<Slider value={this.state.parentCoin}
    onValueChange={v => this.setState({ parentCoin:v })}
  />

<Button
  title='提交'
/>

          </View>
        );
    }
}

export default App;