/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text
} from 'react-native';

import {Input, CheckBox, Button,Icon} from 'react-native-elements';
import data from '../data/data';
import {title} from '../kit/common';
import Modal from '../modal/modal'
import Icon2 from 'react-native-vector-icons/FontAwesome';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
      data: {
        name: '',
        coin: 0,
        dayArray: [],
        id: 0,
        relatemile: 0,
        time: 0,
        starttime: 0,
        color:0
      },
    };
  }

  componentDidMount() {
    data
      .Instance()
      .getClassById(this.state.id)
      .then(ret => {
        //{"coin": 5, "dayArray": [1, 2, 3, 4], "id": 11, "name": "C1", "relatemile": "", "starttime": 1585366346212, "time": 0}
        this.setState({
          data: {
            name: ret.name,
            coin: ret.coin,
            dayArray: ret.dayArray,
            id: ret.id,
            color: ret.color,
            relatemile: ret.relatemile,
            time: ret.time,
            starttime: ret.starttime,
          },
        });

        if (ret.relatemile > 0) {
          data
            .Instance()
            .getMileById(ret.relatemile)
            .then(ret => {
              this.setState({
                mileData: ret,
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
                navigation.navigate('Table',{
                  refresh:true
                });
              }}></Button>
          );
        },
      },
      title('课程详细'),
    );
  };

  render() {
    let state = this.state;

    let outPutDayArray ="";
    state.data.dayArray.map(
      (v,i)=>{
        outPutDayArray += "周"+v
      }
    )


    console.log('state', state);
    return (
      <View style={{padding:10}}>

<Modal ref='modal'></Modal>


        <View>
          <Text style={{fontSize:25}}>{state.data.name}</Text>
        </View>

        <View style={{backgroundColor:"white",padding:10,margin:10}}>
          <Text style={{margin:5}}>每日金币 ：{state.data.coin}</Text>

          <Text style={{margin:5}}
            onPress={() => {
              if (state.mileData) {
                this.props.navigation.navigate('MileDetail', {
                  id: state.mileData.id,
                });
              }
            }}>
            里 程 碑  ：{state.mileData ? state.mileData.name : '无'}
          </Text>

          <Text style={{margin:5}}>课程安排 ：</Text>

          <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>

           {
            state.data.dayArray.map(
              (v,i)=>{

                return (
                  <CheckBox key={i}
                  title={"周"+(i+1)}
                  checked={v}
                  onPress={() => {
                    let output = this.state.data;
                    let arr = this.state.data.dayArray;
                    arr[i] = !arr[i];
                    output.dayArray =arr;
                    this.setState({
                      data: output
                    })

                    data.Instance().updateClassById(this.state.id,output)
      
                  }}
                />
                )
              }
            )
          } 

</View>



<Text style={{margin:5}}>课程标签 ：</Text>

<View style={{margin:10,flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
{
            data.colorArray.map(
              (v,i)=>{

                return (
                  <CheckBox 
                  key={i}

                  checkedIcon={<Icon2 name="square" size={18} color={v}/>}
                  uncheckedIcon={<Icon2 name="square-o" size={18} color={v}/>}

                  checked={  i==this.state.data.color? true:false }
                  onPress={() => {

                    let newData =this.state.data;
                    newData.color =i;

                    this.setState({
                      data: newData
                    })

                    data.Instance().updateClassById(this.state.id,this.state.data);

                    
      
                  }}
                />
                )


            })

        }
</View>


        </View>

        <Button
        
          title="删除"
          onPress={() => {
            data.Instance().delClass(this.state.id).then(
              ()=>{
                this.refs.modal.setModalVisible(true,"删除成功");
                  this.props.navigation.navigate('Table', {
                    refresh:true
                  });
              }
            )
            
          }}

          buttonStyle={
            {backgroundColor:"red"}
          }

          icon={
            <Icon
              name="delete-forever"
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
