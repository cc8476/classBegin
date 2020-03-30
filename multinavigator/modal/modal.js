/*
 * Created by joechen  2020-03-26 22:40
 */
import React from 'react';
import {View, Text} from 'react-native';

import {Button,Overlay} from 'react-native-elements';


/**
 * 如何使用：
 * 
 * 1.放在父组件的render函数里面
 * <Modal ref='modal'></Modal>
 * 2.在函数内调用如下代码：
 * this.refs.modal.setModalVisible(true,"清除ok!!!");
 * 
 * 
 * 
 */

class MyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalText:""
    };
  }

  setModalVisible(visible, text) {
    console.log("modal dddd");
    this.setState({modalVisible: visible, modalText: text});
  }

  render() {
    return (
      <Overlay
        animationType="fade"
        borderRadius={8}
        style={{
          height: 100,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30,
        }}
        height={200}
        isVisible={this.state.modalVisible}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 30,
          }}>
          <Text style={{fontSize: 25, color: '#7fb80e'}}>
            {this.state.modalText}
          </Text>
          <Button
            style={{margin: 30}}
            title="知道了"
            onPress={() => {
              this.setState(
                {
                  "modalVisible":false
                }
              )
            }}></Button>
        </View>
      </Overlay>
    );
  }
}

export default MyModal;
