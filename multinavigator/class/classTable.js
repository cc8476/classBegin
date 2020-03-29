/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import data from '../data/data';
import {Button, ButtonGroup} from 'react-native-elements';
import MileList from './classTableMileList';

import {title} from '../kit/common';

class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      tableData: [],
      miles: [],
      selected:0,  //里程碑按钮标签 1=未完成，0=已完成
      init:-2  //默认是-2，初始化class+1,初始化mile加1
    };
  }

  componentDidMount() {
    let week = [['周①'], ['周②'], ['周③'], ['周④'], ['周⑤'], ['周⑥'], ['周⑦']];

    data
      .Instance()
      .getClasses()
      .then(classes => {

        const currentInit=this.state.init;

        this.setState({
          init:currentInit+1
        })

        classes.map((v, i) => {
          v.dayArray.map(i => {
            const elementButton = () => (
              <Text
                onPress={() => {
                  this.props.navigation.navigate('ClassDetail', {id: v.id});
                }}>
                {v.name}
              </Text>
            );
            week[i - 1].push(elementButton());
          });
        });

        week.map((v, i) => {
          while (v.length <= 7) {
            v.push('');
          }
        });

        this.setState({
          tableData: week,
        });
      });

    data
      .Instance()
      .getMiles()
      .then(ret => {

        const currentInit=this.state.init;
        this.setState({
          init:currentInit+1
        })

        this.setState({
          miles: ret,
        });
      });
  }

  static navigationOptions = ({navigation}) => {
    return Object.assign(
      {
        headerLeft: () => {
          return (
            <Button
              type="clear"
              title="添加课程"
              onPress={() => {
                navigation.navigate('Add');
              }}
            />
          );
        },
        headerRight: () => {
          return (
            <Button
              title="里程碑"
              type="clear"
              onPress={() => {
                navigation.navigate('AddMile');
              }}></Button>
          );
        },
      },
      title('课程表'),
    );
  };

  shouldComponentUpdate(nextProps,nextState) {

    console.log("this.state.init",this.state.init)
    if(this.state.init!=0) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {

    console.log("classTable render");

    const buttons = ['接下来', '已完成'];

    const state = this.state;

    
    console.log(state.miles);

    let milesArr = state.miles;
    let showmilesArr=[];
    milesArr.filter(
      (v,i)=>{
        if(this.state.selected==0) {
          if( v.uptime>new Date().getTime()) {
            console.log("selet",0)
            showmilesArr.push(v);
          }
        }
        else if(this.state.selected==1) {
          if( v.uptime<new Date().getTime()) {
            console.log("selet",1)
            showmilesArr.push(v);
          }
        }
      }
    )

    console.log('showmilesArr',showmilesArr);

    return (
      <View style={styles.container}>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* 左边�模块 */}
          <TableWrapper style={{width: 40}}>
            <Cell data="" style={styles.singleHead} />
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col
                data={['上午', '下午', '晚上']}
                style={styles.head}
                heightArr={[60, 60, 60]}
                textStyle={styles.text}
              />
            </TableWrapper>
          </TableWrapper>

          {/* 右边模块 */}
          <TableWrapper style={{flex: 1}}>
            <Cols
              data={state.tableData}
              heightArr={[40, 30, 30, 30, 30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>

        <View>
          <ButtonGroup
             onPress={
                ()=>{
                 this.setState(
                  {
                    selected:  (this.state.selected==1)?0:1
                  }
                 ) 
                }

             }
            selectedIndex={this.state.selected} 
            buttons={buttons}
            containerStyle={{height: 25}}
          />

          <Text>最近的里程碑:</Text>
        </View>


             <MileList navigation={this.props.navigation} showmilesArr={showmilesArr}></MileList>

        

        
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  singleHead: {width: 40, height: 40, backgroundColor: '#c8e1ff'},
  head: {flex: 1, backgroundColor: '#c8e1ff'},
  title: {flex: 2, backgroundColor: '#f6f8fa'},
  titleText: {marginRight: 6, textAlign: 'right'},
  text: {textAlign: 'center'},
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: {textAlign: 'center'},
});
