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

import {Input, CheckBox, Slider, Button,Icon} from 'react-native-elements';
import data from '../data/data';
import {title} from '../kit/common';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
      data: {
        name: '',
        coin: 0,
        id: 0,
        uptime: 0,
        relateclass: 0,
      },
    };
  }

  componentDidMount() {
    data
      .Instance()
      .getMileById(this.state.id)
      .then(ret => {
        this.setState({
          data: {
            name: ret.name,
            coin: ret.coin,
            id: ret.id,
            relateclass: ret.relateclass,
            uptime: ret.uptime,
          },
        });

        if (ret.relateclass > 0) {
          data
            .Instance()
            .getClassById(ret.relateclass)
            .then(ret => {
              this.setState({
                classData: ret,
              });
            });
        }
      });
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
              }}></Button>
          );
        },
      },
      title('里程碑内容'),
    );
  };

  render() {
    let state = this.state;
    console.log('state');
    let leftDay =Math.ceil( (state.data.uptime - new Date().getTime())/3600/24/1000)


    return (
      <View style={{padding: 10}}>
        <View>
          <Text style={{fontSize: 25}}>{state.data.name}</Text>
        </View>

        <View style={{backgroundColor: 'white', padding: 10, margin: 10}}>
          <Text style={{margin: 5}}>到期日     :  {new Date(state.data.uptime).toLocaleDateString()}</Text>
          <Text style={{margin: 5}}>剩余        :  {leftDay} 天</Text>

          <Text style={{margin: 5}}>每日金币 :  {state.data.coin}</Text>

          <Text
            style={{margin: 5}}
            onPress={() => {
              if (state.classData) {
                this.props.navigation.navigate('ClassDetail', {
                  id: state.classData.id,
                });
              }
            }}>
            关联课程 :  {state.classData ? state.classData.name : '无'}
          </Text>

         
        </View>

        <Button
          title="完成"
          onPress={() => {
            data.Instance().updateMileById(state.data.id, 50);
          }}></Button>

        <Button
          title="删除"
          onPress={() => {
            data.Instance().delMile(this.state.id);
          }}
          buttonStyle={{backgroundColor: 'red'}}
          icon={<Icon name="delete-forever" size={35} color="white" />}
        />
      </View>
    );
  }
}

export default App;
