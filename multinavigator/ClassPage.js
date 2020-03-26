import React from 'react';
import {View, Text, Button} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



import ClassTable  from './class/classTable'
import AddClass  from './class/addClass'
import AddMile  from './class/addMile'
import ClassDetail  from './class/classDetail'
import MileDetail  from './class/mileDetail'

//堆栈方式的导航
const Rootstack = createStackNavigator({
  Table: ClassTable,
  Add: AddClass,
  AddMile:AddMile,
  ClassDetail:ClassDetail,
  MileDetail:MileDetail
},
{
  navigationOptions:(
    ({navigation})=>(
      {
        tabBarVisible:navigation.state.index===0
      }

    )
  )
}

);

//这里不用输出AppContainer
const AppContainer = createAppContainer(Rootstack);

export default Rootstack;
