/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {View, Text, Alert, DatePickerIOS, Picker} from 'react-native';

import data from '../data/data';

import {Input, Slider, Button, Icon} from 'react-native-elements';
import {title} from '../kit/common';
import Modal from '../modal/modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 50,
      mileName: '',
      relateclass: -1,
      uptime: new Date(),
      classes: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return Object.assign(
      {
        headerLeft: () => {
          return (
            <Button
              title="返回"
              type="clear"
              onPress={() => {
                navigation.navigate('Table');
              }}
            />
          );
        },
      },
      title('添加里程碑'),
    );
  };

  componentDidMount() {
    data
      .Instance()
      .getClasses()
      .then(classes => {
        classes.push({name: '无', id: -1});

        this.setState({
          classes: classes,
        });
      });
  }

  submit() {
    if (!this.state.mileName) {
      Alert.alert('请输入里程碑名称');
    } else {
      data
        .Instance()
        .addMile(this.state)
        .then(() => {
          this.refs.modal.setModalVisible('添加成功');
          this.props.navigation.navigate('Table', {
            refresh: true,
          });
        });
    }
  }

  render() {
    let classList = [];
    classList = this.state.classes;
    let pickerItems = [];

    for (let i = 0; i < classList.length; i++) {
      const ele = classList[i];
      const element = <Picker.Item label={ele.name} value={ele.id} key={i} />;
      pickerItems.push(element);
    }

    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <Modal ref="modal" />

        <Input
          style={{padding: 5}}
          onChangeText={value => {
            this.setState({
              mileName: value,
            });
          }}
          leftIcon={{type: 'entypo', name: 'open-book'}}
          leftIconContainerStyle={{marginRight: 8}}
          placeholder="请输入里程碑"
        />
        <Input
          placeholder={String(this.state.coin + '金币')}
          value={String(this.state.coin + '金币')}
          leftIcon={{type: 'font-awesome', name: 'stop-circle-o'}}
          leftIconContainerStyle={{marginRight: 8}}
          disabled
        />
        <Slider
          maximumValue={100}
          minimumValue={0}
          step={1}
          value={this.state.coin}
          onValueChange={v => this.setState({coin: v})}
        />

        <Text style={{margin: 10, fontSize: 20}}>到期时间</Text>

        <DatePickerIOS
          mode="date"
          locale="zh-cn"
          minimumDate={new Date()}
          date={this.state.uptime}
          onDateChange={date => {
            this.setState({
              uptime: date,
            });
          }}
        />
        <Text style={{margin: 10, fontSize: 20}}>关联课程</Text>
        <Picker
          mode={Picker.MODE_DIALOG}
          selectedValue={this.state.relateclass}
          onValueChange={(v, i) => {
            this.setState({relateclass: v});
          }}>
          {pickerItems}
        </Picker>

        <Button
          style={{
            padding: 20,
          }}
          title="提交"
          onPress={() => {
            this.submit()
          }}
          icon={<Icon name="check" size={35} color="white" />}
        />
      </View>
    );
  }
}

export default App;
