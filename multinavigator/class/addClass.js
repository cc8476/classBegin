/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {View, Text, Alert} from 'react-native';
import data from '../data/data';
import {Input, CheckBox, Slider, Button, Icon} from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ClassTimePicker from './classComponents/classTimePicker';
import {title} from '../kit/common';
import Modal from '../modal/modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 5,
      name: '',
      color: 0, //0-5，一共6种,
      classTimeArr: ['周一 - 10点 - 40分钟'], //备课时间
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
      title('添加课程'),
    );
  };

  addPicker() {
    if (this.state.classTimeArr.length >= 7) {
      return;
    }
    let classTimeArr = this.state.classTimeArr;
    classTimeArr.push('');
    this.setState({
      classTimeArr: classTimeArr,
    });
  }

  setPicker(i, data) {
    let classTimeArr = this.state.classTimeArr;
    classTimeArr[i] = data;
    this.setState({
      classTimeArr: classTimeArr,
    });
  }

  destroyPicker(i) {
    if (this.state.classTimeArr.length <= 1) {
      return;
    }

    let classTimeArr = this.state.classTimeArr;
    classTimeArr.splice(i, 1);
    this.setState({
      classTimeArr: classTimeArr,
    });
  }

  submit() {
    console.log('submit', this.state);
    let hasClass = this.state.classTimeArr.some(v => {
      if (v != '') {
        return v;
      }
    });

    if (!this.state.name) {
      Alert.alert('请输入课程名称');
    } else if (!hasClass) {
      Alert.alert('请至少选择一天课');
    } else {
      data
        .Instance()
        .addClass(this.state)
        .then(() => {
          this.refs.modal.setModalVisible('添加成功');
          this.props.navigation.navigate('Table', {
            refresh: true,
          });
        });
    }
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <Modal ref="modal" />

        <Input
          style={{padding: 5}}
          onChangeText={value => {
            this.setState({
              name: value,
            });
          }}
          placeholder="课程名称"
          leftIcon={{type: 'entypo', name: 'open-book'}}
          leftIconContainerStyle={{marginRight: 8}}

        />
        <Input
          placeholder={String(this.state.coin + '金币')}
          leftIcon={{type: 'font-awesome', name: 'stop-circle-o'}}
          leftIconContainerStyle={{marginRight: 8}}
          value={String(this.state.coin + '金币')}
          disabled
        />
        <Slider
          maximumValue={10}
          minimumValue={0}
          step={1}
          value={this.state.coin}
          onValueChange={v => this.setState({coin: v})}
        />

        <View>{/* TODO:这里能否把add,desory,setPicker写到一个组件中去 */}
          {this.state.classTimeArr.map((v, i) => {
            return (
              <ClassTimePicker
                key={'class' + i + String(Math.random())}
                order={i}
                value={v}
                add={() => {
                  this.addPicker();
                }}
                destory={i => {
                  this.destroyPicker(i);
                }}
                setPicker={(i, v) => {
                  this.setPicker(i, v);
                }}
              />
            );
          })}

          <Text style={{margin: 10, fontSize: 20}}>选择标签颜色</Text>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {data.colorArray.map((v, i) => {
              return (
                <CheckBox
                  key={i}
                  checkedIcon={<Icon2 name="square" size={28} color={v} />}
                  uncheckedIcon={<Icon2 name="square-o" size={28} color={v} />}
                  checked={i == this.state.color ? true : false}
                  onPress={() => {
                    this.setState({
                      color: i,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>

        <Button
          style={{
            padding: 20,
          }}
          title="提交"
          onPress={() => {
            this.submit();
          }}
          icon={<Icon name="check" size={35} color="white" />}
        />
      </View>
    );
  }
}

export default App;
