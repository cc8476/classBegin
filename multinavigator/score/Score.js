/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image
} from 'react-native';
import Modal from '../modal/modal';
import data from '../data/data';
import {title} from '../kit/common'



import { Card, ListItem, Button, Icon, Input,CheckBox,Slider } from 'react-native-elements'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            coin:0.5,
            parentCoin:0.5,
            modalVisible:false,
            modalText:""
        };
    }

    setModalVisible(visible,text) {
      this.setState({ modalVisible: visible,modalText:text });
    }

    static navigationOptions = ({navigation}) =>{
        return title("每日打分")
      } 



    render() {

      


        return (
            <View>

<Modal text={this.state.modalText} modalVisible={this.state.modalVisible} ></Modal>

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
  onPress={() => {
    this.setModalVisible(!this.state.modalVisible,"恭喜得到5分!!!");
    data.Instance().addCoin(5);
  }}
/>




{/* 测试内容 */}
{/* 测试内容 */}
{/* 测试内容 */}


{/* 测试内容 */}
{/* 测试内容 */}
{/* 测试内容 */}







          </View>
        );
    }
}

export default App;