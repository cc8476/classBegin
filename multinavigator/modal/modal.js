/*
* Created by joechen  2020-03-26 22:40
*/
import React from 'react';
import {
    View,Text,Image,Modal,TouchableHighlight
} from 'react-native';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            modalVisible:this.props.modalVisible
        }
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.modalVisible == this.props.modalVisible) {
            return;
        }

        console.warn("nextProps.modalVisible",nextProps.modalVisible)
        this.state={
            modalVisible:nextProps.modalVisible
        }
    }

    setModalVisible(visible,text) {
        this.setState({ modalVisible: visible,modalText:text });
    }

    render() {
        return (

        <Modal
            animationType="fade"
            presentationStyle="formSheet"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
        <Text>{this.props.text}</Text>
  
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>点击关闭</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>



        );
    }
}

export default App;
