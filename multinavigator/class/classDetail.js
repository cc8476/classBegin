/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text,Alert
} from 'react-native';

import {Input, CheckBox, Button,Icon} from 'react-native-elements';
import data from '../data/data';
import {title} from '../kit/common';
import Modal from '../modal/modal'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ClassTimePicker from './classComponents/classTimePicker'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
        name: '',
        coin: 0,
        dayArray: [],
        relatemile: 0,
        time: 0,
        starttime: 0,
        color:0,
      classTimeArr:[]  //备课时间
    };
  }

  componentDidMount() {
    console.log("componentDidMount",this.state.id)

    data
      .Instance()
      .getClassById(this.state.id)
      .then(ret => {
        //{"coin": 5, "dayArray": [1, 2, 3, 4], "id": 11, "name": "C1", "relatemile": "", "starttime": 1585366346212, "time": 0}
        let classTimeArr=[];

        function weekTxt(i) {
          switch(i) {
            case 0:
              return "周一";
              case 1:
                return "周二";
                case 2:
                  return "周三";
                  case 3:
              return "周四";
              case 4:
              return "周五";
              case 5:
              return "周六";
              case 6:
              return "周日";
          }
        }

        ret.dayArray.map(
          (v,i)=>{
            if(v) {
              let str=  weekTxt(i) +" - "+ret.time[i]+"点 - "+ret.duration[i]+"分钟"
              classTimeArr.push(str);
            }
          }
        )

        this.setState({
            name: ret.name,
            coin: ret.coin,
            dayArray: ret.dayArray,
            id: ret.id,
            color: ret.color,
            relatemile: ret.relatemile,
            time: ret.time,
            starttime: ret.starttime,
          classTimeArr:classTimeArr
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

  addPicker() {
    console.log("addPicker")
    if(this.state.classTimeArr.length>=7) {
      return;
    }
    let classTimeArr=this.state.classTimeArr;
    classTimeArr.push("")
    this.setState({
      classTimeArr:classTimeArr
    })
  }

  setPicker(i,data) {
    let classTimeArr=this.state.classTimeArr;
    classTimeArr[i]=data;
    this.setState({
      classTimeArr:classTimeArr
    })
  }

  destroyPicker(i) {

    if(this.state.classTimeArr.length<=1) {
      return;
    }

    let classTimeArr=this.state.classTimeArr;
    classTimeArr.splice(i,1)
    console.log("destroyPicker",classTimeArr);
    this.setState({
      classTimeArr:classTimeArr
    })

  }

  delClass()  {
    data.Instance().delClass(this.state.id).then(
      ()=>{
        this.refs.modal.setModalVisible(true,"删除成功");
          this.props.navigation.navigate('Table', {
            refresh:true
          });
      }
    )    
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

  modifyClass() {
    data.Instance().modifyClass(this.state,this.state.id);
  }

  render() {
    let state = this.state;

    let outPutDayArray ="";
    state.dayArray.map(
      (v,i)=>{
        outPutDayArray += "周"+v
      }
    )


    console.log('state', state);
    return (
      <View style={{padding:10}}>

<Modal ref='modal'></Modal>


        <View>
          <Text style={{fontSize:25}}>{state.name}</Text>
        </View>

        <View style={{backgroundColor:"white",padding:10,margin:10}}>
          <Text style={{margin:5}}>每日金币 ：{state.coin}</Text>

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

          {
          this.state.classTimeArr.map(
            (v,i)=>{
              console.log("classTimeArr",v,i);
              return (<ClassTimePicker key={"class"+i+String(Math.random())} order={i} value={v}
                add={()=>{this.addPicker()}}
                destory={(i)=>{this.destroyPicker(i)}}
                setPicker={(i,v)=>{this.setPicker(i,v)}}
              
              ></ClassTimePicker>)
            }
          )
        }



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

                  checked={  i==this.state.color? true:false }
                  onPress={() => {

                   /*  let newData =this.state;
                    newData.color =i; */

                    this.setState({
                      color: i
                    })

                    data.Instance().updateClassById(this.state.id,this.state);

                    
      
                  }}
                />
                )


            })

        }
</View>


        </View>

        <Button
        
        title="修改"
        onPress={() => {
          this.modifyClass()
        }}

      />


        <Button
        
          title="删除"
          onPress={() => {
            
            Alert.alert('确认删除这个课程吗？','',
            [
              {text:"是的", onPress:()=>{this.delClass()}},
              {text:"点错了"}
            ]
          );


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
