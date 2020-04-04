/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {title} from '../kit/common'


import {
    View,Text,Image
} from 'react-native';

import Modal from '../modal/modal';

import { Button } from 'react-native-elements';
import data from '../data/data';



import Icon from 'react-native-vector-icons/FontAwesome';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           user:{}
        }
    }

     static navigationOptions =  title("学习生涯");
     
    /*  {
      title:"统计",
      headerStyle:{
        backgroundColor:"#fffef9"
      },
      headerTintColor:"#1a2933",
      headerTitleStyle:{
        fontSize:18,
        fontWeight:"bold"
      }
    }  */



    componentDidMount() {
      this.initData()

    }

    componentWillReceiveProps() {
      console.log("componentWillReceiveProps")
      this.initData();
    }

    initData() {
      data.Instance().storage.load({
        key: 'user',
        autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
      })
      .then(ret => {
        this.setState({ user: ret });
      })
      .catch(err => {
      });
    }

    render() {

      let user  = this.state.user;
        return (

         

            <View
            style={{
              padding:10
            }}>

           <Modal ref='modal'></Modal>



           <View style={{backgroundColor:"white",padding:10,margin:10}}>

           


            <Text style={{margin:5}} >{user.name}</Text>
            


          <Text  style={{margin:5}}>当前课程：共{user.classNum}门</Text>
<Text style={{margin:5}}>关联里程碑：共{user.mileNum}个</Text>
<Text style={{margin:5}}>金币总数：{user.coin}个</Text>
<Text style={{margin:5}}>打卡次数：{user.time}个</Text>


<Image
            style={{width:200,height:200,margin:5}}
            source={require("../assets/w1.jpeg")} ></Image>


<Button title="初始化数据" 
          onPress={() => {
            data.Instance().createData();
            this.refs.modal.setModalVisible(true,"初始化数据成功!!!");
          }}
          ></Button>

<Button title="清除数据"
          onPress={() => {
            this.refs.modal.setModalVisible(true,"清除ok!!!");    
            data.Instance().clearData();
          }}
          ></Button>


{/* 测试数据 */}
{/* 测试数据 */}
{/* 测试数据 */}
{/* 测试数据 */}


{/* 测试数据 */}
{/* 测试数据 */}
{/* 测试数据 */}

           </View>
          </View>
        );
    }
}

export default App;