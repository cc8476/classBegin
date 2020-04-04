/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {View, Text, Image, Alert} from 'react-native';

import data from '../data/data';

import {Input, CheckBox, Slider, Button,Icon} from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {title} from '../kit/common';
import Modal from '../modal/modal'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 5,
      className: '',
      dayArray:[true,false,false,false,false,false,false],
      color:0//0-5，一共6种

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

<Modal ref='modal'></Modal>

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

        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:'center'}}>

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

        <Text style={{margin:10,fontSize:20}}>选择标签颜色</Text>
        <View style={{margin:10,flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          
        {
            data.colorArray.map(
              (v,i)=>{

                return (
                  <CheckBox 
                  key={i}

                  checkedIcon={<Icon2 name="square" size={28} color={v}/>}
                  uncheckedIcon={<Icon2 name="square-o" size={28} color={v}/>}

                  checked={  i==this.state.color? true:false }
                  onPress={() => {
                    
                    this.setState({
                      color: i
                    })
      
                  }}
                />
                )


            })

        }


        </View>




        <Button
        style={{
          padding:20
        }}
          title="提交"
          onPress={() => {

            let hasClass =this.state.dayArray.some(
              (v)=>{
                return v
              }
            )

            if(!this.state.className) {
              Alert.alert('请输入课程名称','something you\'ve forgotten');
            }
            else if(!hasClass) {
              Alert.alert('请至少选择一天课','something you\'ve forgotten');
            }
            
            else {
              data.Instance().addClass(this.state).then(
                ()=>{
                  this.refs.modal.setModalVisible(true,"添加成功");
                  this.props.navigation.navigate('Table', {
                    refresh:true
                  });
                }
              );
            }
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
