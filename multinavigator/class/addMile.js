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

import {Input, CheckBox, Slider, Button} from 'react-native-elements';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 50,
      mileName: '',
      relateclass: 2,
      uptime: new Date().getTime(),
      classes: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: '添加里程碑',
      headerStyle: {
        backgroundColor: 'skyblue',
      },
      headerTintColor: '#ff00ff',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerLeft: () => {
        return (
          <Button
            title="返回"
            onPress={() => {
              navigation.navigate('Table');
            }}></Button>
        );
      },
    };
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
      <View>
        <Input
          onChangeText={value => {
            this.setState({
              mileName: value,
            });
          }}
          placeholder="请输入里程碑"
        />
        <Input
          placeholder={String(this.state.coin + '金币')}
          value={String(this.state.coin + '金币')}
        />
        <Slider
          value={this.state.coin / 100}
          onValueChange={v => this.setState({coin: Math.floor(v * 100)})}
        />
        <Text>到期时间</Text>

        <DatePickerIOS
          mode="date"
          locale="zh-cn"
          date={new Date()}
          onDateChange={date => {
            console.warn(date.getTime());
            this.setState({
              uptime: date.getTime(),
            });
          }}></DatePickerIOS>
        <Text>关联课程</Text>
        <Picker
         mode={Picker.MODE_DIALOG}  
        selectedValue ={this.state.relateclass}
          onValueChange={(v, i) => {
            console.log(v, i);
            this.setState({relateclass: v});
          }}>
          {output}
        </Picker>

        <Button title="提交" 
  onPress= {
    ()=>{
      console.log("this.state",this.state);
        data.Instance().addMile(this.state);
    }

  }        />
      </View>
    );
  }
}

export default App;
