/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import data from '../data/data';

import {Input, CheckBox, Slider, Button,Icon} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {title} from '../kit/common';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 5,
      className: '',
      dayArray:[false,false,false,false,false,false,false]
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
              }}></Button>
          );
        },
      },
      title('添加课程'),
    );
  };

  render() {
    return (
      <View style={{backgroundColor:"#ffffff"}}>
        <Input style={{padding:5}}
          onChangeText={value => {
            this.setState({
              className: value,
            });
          }}
          placeholder="课程名称"
          leftIcon={{ type: 'entypo', name: 'open-book' }}
          leftIconContainerStyle={{marginRight:8}}

          //open-book

         // coins
        />
        <Input
          placeholder={String( this.state.coin + '金币')}
          leftIcon={{ type: 'font-awesome', name: 'stop-circle-o' }}
          leftIconContainerStyle={{marginRight:8}}
          value={String(this.state.coin + '金币')}
          disabled
        />
        <Slider
                    maximumValue = {10}
                    minimumValue = {0}
                    step = {1}
          value={this.state.coin }
          onValueChange={v => this.setState({coin: v })}
        />

        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>

          {
            ["周一","周二","周三","周四","周五","周六","周日"].map(
              (v,i)=>{

                return (
                  <CheckBox key={i}
                  title={v}
                  checked={this.state.dayArray[i]}
                  onPress={() => {
                    let arr = this.state.dayArray;
                    arr[i] = !arr[i];
                    this.setState({
                      dayArray: arr
                    })
      
                  }}
                />
                )
              }
            )
          }

        </View>

        <Button
        style={{
          padding:20
        }}
          title="提交"
          onPress={() => {
            data.Instance().addClass(this.state);
          }}

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
