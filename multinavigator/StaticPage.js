import React from 'react';
import {View, Text, Button} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs'


import Static from './static/Static';

//堆栈方式的导航
const Rootstack = createStackNavigator({
  Static: Static
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
