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

     static navigationOptions =  title("统计");
     
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
              flex: 1,
              backgroundColor: 'cyan',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

           <Modal ref='modal'></Modal>




            <Text>{user.name}</Text>
            <Image
            style={{width:200,height:200}}
            source={require("../assets/w1.jpeg")} ></Image>


          <Text>当前课程：共{user.classNum}门</Text>
<Text>关联里程碑：共{user.mileNum}个</Text>
<Text>金币总数：{user.coin}个</Text>
<Text>打卡次数：{user.time}个</Text>


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
        );
    }
}

export default App;