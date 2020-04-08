/*
 * Created by joechen  2020-04-06 14:13
 */
import React from 'react';
import Pickers from 'react-native-picker';
import {Input, CheckBox, Slider, Button, Icon} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native-animatable';

//TODO:把3个方法，add,destory,setPicker回收
class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      order: this.props.order,
      inputValue: props.value,
    };
  }

  pickupInit() {
    let pickData = [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      [
        '6点',
        '7点',
        '8点',
        '9点',
        '10点',
        '11点',
        '12点',
        '13点',
        '14点',
        '15点',
        '16点',
        '17点',
        '18点',
        '19点',
        '20点',
        '21点',
        '22点',
        '23点',
      ],
      [
        '10分钟',
        '20分钟',
        '30分钟',
        '40分钟',
        '50分钟',
        '60分钟',
        '70分钟',
        '80分钟',
        '90分钟',
      ],
    ];

    Pickers.init({
      pickerData: pickData,
      onPickerConfirm: data => {
        this.setState({
          inputValue: data.join(' - '),
        });
        this.props.setPicker(this.state.order, this.state.inputValue);
      },
    });
    Pickers.show();
  }

  render() {
    console.log('class picker render', this.state.inputValue);
    return (
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Icons
          style={{paddingTop: 8}}
          name="plus-square"
          size={22}
          color="green"
          onPress={() => this.props.add()}
        />

        <Input
          containerStyle={{width: 300}}
          placeholder={'点击添加更多时间'}
          value={this.state.inputValue}
          onFocus={() => {
            console.log('this.pickupInit()');
            this.pickupInit();
          }}
        />
        <Icons
          style={{paddingTop: 8}}
          name="minus-square"
          size={22}
          color="red"
          onPress={() => {
            this.props.destory(this.state.order);
          }}
        />
      </View>
    );
  }
}

export default App;
