/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image
} from 'react-native';
import Modal from '../modal/modal';
import data from '../data/data';
import {title} from '../kit/common'



import { Card, ListItem, Button, Icon, Input,CheckBox,Slider } from 'react-native-elements'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            coin:0.5,
            parentCoin:0.5,
            modalVisible:false,
            modalText:"",
            classes:[],
            dayOutput:"",
            scoreOption:1, //3个选项，分别是0-2
            canRecord:false//是否可以打分


        };
    }

    static navigationOptions = ({navigation}) =>{
        return title("每日打分")
      } 

    componentDidMount() {
      this.initData();

    }

  initData() {
    let weekday = ["日", "一", "二", "三", "四", "五", "六"];
    let day = new Date().getDay();
    let dayOutput = "星期" + weekday[day];
    let date = new Date().toLocaleDateString();
    dayOutput = "今天是 " + date + " , " + dayOutput;
    this.setState({
      dayOutput: dayOutput
    });
    data.Instance().getClassesByWeek(day).then((ret) => {
      console.log("ret", ret);
      this.setState({
        classes: ret
      });
    });
    data.Instance().checkCanScore().then((result) => {
      console.log("result", result);
      this.setState({
        canRecord: result
      });
    }).catch((day) => {
      console.log("day", day);
    });
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.initData();
    });
  }


     getscale(min,max) {
    
      return Math.random()*(max-min)+min
    }



    render() {

  

        return (
            <View style={{backgroundColor:"white",padding:10,margin:10}}>
<Modal ref='modal'></Modal>


<Text style={{margin:5}}>
{this.state.dayOutput}
</Text>

<Text style={{margin:5}}>今天学习的内容有：</Text>
<View style={{flexDirection:"row"}}>
{

  this.state.classes.map(
    (v)=>{
      return (
        <Text style={{margin:5}} key={v.id}
        onPress={() => {
          this.props.navigation.navigate('ClassDetail', {id: v.id});
        }}>
        {"["+v.name+"]"}
      </Text>
      )
    }
  )
}

</View>

<Text style={{margin:15}}>给自己打个分吧</Text>


{
            data.scoreArray.map(
              (v,i)=>{

                return (
                  <CheckBox 
                  key={i}

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



<Button
  title= {this.state.canRecord?"看看今天能得几分":"今天的得分是..."}
  disabled={!this.state.canRecord}
  onPress={() => {


    let totalCoin=0;
    this.state.classes.map((v,i)=>{
      totalCoin += v.coin;
    })

    
    switch (this.state.scoreOption) {
      case 0:
          totalCoin =totalCoin *this.getscale(0.3,0.5);
        break;

        case 1:
          totalCoin =totalCoin *this.getscale(0.6,0.8);
        break;

        case 2:
          totalCoin =totalCoin *this.getscale(1,1.5);
        break;
    
      default:
        break;
    }

    totalCoin = Math.ceil(totalCoin);

    data.Instance().addCoin(totalCoin).then(
      ()=>{
        this.refs.modal.setModalVisible(true,"恭喜得到"+totalCoin+"分");
        this.props.navigation.navigate('Table', {
          refresh:true
        });

        data.Instance().addRecord(totalCoin)


      }
    )
    
  }}
/>




{/* 测试内容 */}
{/* 测试内容 */}
{/* 测试内容 */}


{/* 测试内容 */}
{/* 测试内容 */}
{/* 测试内容 */}







          </View>
        );
    }
}

export default App;