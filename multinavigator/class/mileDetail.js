/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text,
  Alert
} from 'react-native';

import {Input, CheckBox, Slider, Button,Icon} from 'react-native-elements';
import data from '../data/data';
import {title} from '../kit/common';
import Modal from '../modal/modal'
import CoinFall from '../kit/coinFall'
import Icon2 from 'react-native-vector-icons/FontAwesome5';


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
      scoreOption:0 //3个选项，分别是0-2
    };
  }

  delMile() {
    data.Instance().delMile(this.state.id).then(
      ()=>{
        this.refs.modal.setModalVisible("删除成功");
          this.props.navigation.navigate('Table', {
            refresh:true
          });
      }
    )
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
            coinGot:ret.coinGot

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
    console.log('state',state);
    let leftDay =Math.ceil( (state.data.uptime - new Date().getTime())/3600/24/1000)

    let ButtonFinish;
    let iconsArr=["sad-tear","smile","laugh"];


    let needFinish = (!this.state.data.coinGot || this.state.data.coinGot<=0);
    if(needFinish) {

      ButtonFinish =(<Button
        title="完成里程碑"
        onPress={() => {

          let outputCoin=0;
          switch(state.scoreOption) {
            case 0:
              outputCoin = 0.3 * state.data.coin;
              break;
              case 1:
                outputCoin = 0.8 * state.data.coin;
                break;
                case 2:
                  outputCoin = 1.5 * state.data.coin;
                  break;
          }

          outputCoin=Math.round(outputCoin)

            data.Instance().updateMileById(state.data.id, outputCoin).then(
              ()=>{
                this.refs.modal.setModalVisible("恭喜你获得"+outputCoin+"枚金币!");
                  /* this.props.navigation.navigate('Table', {
                    refresh:true
                  }); */


                  let data =this.state.data;
                  data.coinGot = outputCoin

                  this.setState({
                    coinGot:data
                  })
              }
            )
          }}></Button>
        );
    }


    return (
      <View style={{padding: 10}}>

<Modal ref='modal'></Modal>
<CoinFall count={this.state.coinGot}></CoinFall>


        <View>
          <Text style={{fontSize: 25}}>{state.data.name}</Text>
        </View>

        <View style={{backgroundColor: 'white', padding: 10, margin: 10}}>
          <Text style={{margin: 5}}>到期日     :  {new Date(state.data.uptime).toLocaleDateString()}</Text>
          <Text style={{margin: 5}}>剩余        :  {leftDay} 天</Text>

          <Text style={{margin: 5}}>目标金币 :  {state.data.coin}</Text>
          <Text style={{margin: 5}}>获得金币 :  {state.data.coinGot}</Text>

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

        

        {
            needFinish && data.scoreArray.map(
              (v,i)=>{

                console.log(",,,",i,this.state.scoreOption)

                return (
                  <CheckBox 
                  key={i}

                  checkedIcon={<Icon2 name={iconsArr[i]} size={18} color={"green"} />}
                  uncheckedIcon={<Icon2 name={iconsArr[i]} size={18}/>}


                  title={v}

                  checked={  i==this.state.scoreOption? true:false }
                  onPress={() => {
                    this.setState({
                      scoreOption: i
                    })
      
                  }}
                />
                )


            })

        }

      {ButtonFinish}


        

        
        <Button style={{fontSize:15}}
          title="删除"
          onPress={() => {

            Alert.alert('确认删除这个里程碑吗？','',
            [
              {text:"是的", onPress:()=>{this.delMile()}},
              {text:"点错了"}
            ]
          );


          }}
          buttonStyle={{backgroundColor: 'red'}}
          icon={<Icon name="delete-forever" size={35} color="white" />}
        />
      </View>
    );
  }
}

export default App;
