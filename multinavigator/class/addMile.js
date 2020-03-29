/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  DatePickerIOS,
  Picker,
} from 'react-native';

import data from '../data/data';

import {Input, CheckBox, Slider, Button,Icon} from 'react-native-elements';
import {title} from '../kit/common'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 50,
      mileName: '',
      relateclass: -1,
      uptime: new Date(),
      classes: []
    };
  }

  static navigationOptions = ({navigation}) => {
    return Object.assign({
      
      headerLeft: () => {
        return (
          <Button
            title="返回"
            type="clear"
            onPress={() => {
              navigation.navigate('Table');
            }}></Button>
        );
      },
    },title("添加里程碑"));
  };

  componentDidMount() {
    console.log("componentDidMount")
    data
      .Instance()
      .getClasses()
      .then(classes => {
        console.log('classes', classes);
        this.setState({
          classes: classes,
        });
      });
  }

  render() {
    let classList = this.state.classes;
    let output = [];

    for (let i = 0; i < classList.length; i++) {
      const ele = classList[i];
      console.log(ele.name, ele.id);
      const element = <Picker.Item label={ele.name} value={ele.id} key={ele.id}/>;
      output.push(element);
    }

    return (
      <View style={{backgroundColor:"#ffffff"}}>
        <Input style={{padding:5}}
          onChangeText={value => {
            this.setState({
              mileName: value,
            });
          }}
          leftIcon={{ type: 'entypo', name: 'open-book' }}
          leftIconContainerStyle={{marginRight:8}}
          placeholder="请输入里程碑"
        />
        <Input
          placeholder={String(this.state.coin + '金币')}
          value={String(this.state.coin + '金币')}
          leftIcon={{ type: 'font-awesome', name: 'stop-circle-o' }}
          leftIconContainerStyle={{marginRight:8}}
          disabled
        />
        <Slider
            maximumValue = {100}
            minimumValue = {0}
            step = {1}
            
          value={this.state.coin }

          onValueChange={v => this.setState({coin: v})}
        />

        <Text style={{margin:10,fontSize:20}}>到期时间</Text>

        <DatePickerIOS
          mode="date"
          locale="zh-cn"
          date = {this.state.uptime}
           onDateChange={(date) => {
            this.setState({
              uptime: date,
            });
          }} ></DatePickerIOS>
        <Text style={{margin:10,fontSize:20}}>关联课程</Text>
        <Picker
         mode={Picker.MODE_DIALOG}  
        selectedValue ={this.state.relateclass}
          onValueChange={(v, i) => {
            console.log(v, i);
            this.setState({relateclass: v});
          }}>
          {output}
        </Picker>

        <Button
        
        style={{
          padding:20
        }}
        title="提交" 
  onPress= {
    ()=>{
      console.log("this.state",this.state);
        data.Instance().addMile(this.state);
    }

  } 
   icon={
            <Icon
              name="check"
              size={35}
              color="white"
            />
          }
  
  
  />
      </View>
    );
  }
}

export default App;
