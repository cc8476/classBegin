/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {title} from '../kit/common';
import {View, Text, Image} from 'react-native';
import Modal from '../modal/modal';
import {Button} from 'react-native-elements';
import data from '../data/data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  static navigationOptions = title('学习生涯');

  componentDidMount() {
    this.initData();
  }

  componentWillReceiveProps() {
    this.initData();
  }

  initData() {
    data
      .Instance()
      .storage.load({
        key: 'user',
        autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
      })
      .then(ret => {
        this.setState({user: ret});
      })
      .catch(err => {
        //TODO:增加用户信息读取出错的提示
      });
  }

  render() {
    if (this.state.user == null) {
      return null;
    }
    let user = Object.assign({}, this.state.user);

    return (
      <View
        style={{
          padding: 10,
        }}>
        <Modal ref="modal" />

        <View style={{backgroundColor: 'white', padding: 10, margin: 10}}>
          <Text style={{margin: 5}}>{user.name}</Text>

          <Text style={{margin: 5}}>当前课程：共{user.classNum}门</Text>
          <Text style={{margin: 5}}>关联里程碑：共{user.mileNum}个</Text>
          <Text style={{margin: 5}}>金币总数：{user.coin}个</Text>
          <Text style={{margin: 5}}>打卡次数：{user.time}个</Text>
          {/* TODO:可以不设置每个Text的margin吗 */}

          <Image
            style={{width: 200, height: 200, margin: 5}}
            source={require('../assets/w1.jpeg')}
          />

          <Button
            title="初始化数据"
            onPress={() => {
              data.Instance().createData();
              this.refs.modal.setModalVisible('初始化数据成功!!!');
            }}
          />

          <Button
            title="清除数据"
            onPress={() => {
              this.refs.modal.setModalVisible( '清除ok!!!');
              data.Instance().clearData();
            }}
          />


        </View>
      </View>
    );
  }
}

export default App;
