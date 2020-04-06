/*
 * Created by joechen  2020-03-22 18:28
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import data from '../data/data';
import {Button, ButtonGroup} from 'react-native-elements';
import MileList from './classTableMileList';

import Table from './classComponents/classTableDetail'

import {title} from '../kit/common';

class App extends React.Component {

  

  constructor(props) {
    super(props);

    this.firstData={
      tableData: [],
      miles: [],
      selected:0,  //里程碑按钮标签 1=未完成，0=已完成
      init:-1  //默认是-2，初始化class+1,初始化mile加1
    }


    this.state = this.firstData;
  }

  componentWillReceiveProps() {
    this.initData();
  }
  shouldComponentUpdate() {
  }

  componentDidMount() {
    this.initData();
  }

  initData() {

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


    const buttons = ['接下来', '已完成'];

    const state = this.state;

    let milesArr = state.miles;
    let showmilesArr=[];
    milesArr.map(
      (v,i)=>{

        const daytime =new Date(new Date(new Date() ).toLocaleDateString()).getTime()

        if(this.state.selected==0) {
          if( v.uptime>=daytime) {
            console.log("selet",0)
            showmilesArr.push(v);
          }
        }
        else if(this.state.selected==1) {
          if( v.uptime<daytime) {
            console.log("selet",1)
            showmilesArr.push(v);
          }
        }
      }
    )
    showmilesArr.sort((a,b)=>{
      return a.uptime - b.uptime;
    })

    return (
      <View style={{flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'}}>
        <Table navigation={this.props.navigation} ></Table>
        
        <View style={{flex:1,flexDirection:"column",justifyContent:"center",marginTop:20}}>
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

          <Text style={{margin:10}}>最近的里程碑:</Text>
      
             <MileList navigation={this.props.navigation} showmilesArr={showmilesArr}></MileList>

             </View>

        

        
      </View>
    );
  }
}

export default App;

