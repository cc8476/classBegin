import React from 'react';

import ClassPage from './ClassPage';
import StaticPage from './StaticPage';
import ScorePage from './ScorePage';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
//calendar

//bar-chart

//pencil-square-o



import Icon from 'react-native-vector-icons/FontAwesome';


import {Image} from 'react-native';

const TABS = {
  class: {
    screen: ClassPage,
    navigationOptions: {
      tabBarLabel: '课程表',
        tabBarIcon: ({focused})=>{
        if(focused) {
          return (<Icon name="calendar" size={24} color="#7fb80e" />);
        }
        else {
          return (<Icon name="calendar" size={24} color="#1a2933" />);
        }
      }  
    },
  },
  static: {
    screen: StaticPage,
    navigationOptions: {
      tabBarLabel: '统计',
      tabBarIcon: ({focused})=>{
        if(focused) {
          return (<Icon name="bar-chart" size={24} color="#7fb80e" />);
        }
        else {
          return (<Icon name="bar-chart" size={24} color="#1a2933" />);
        }
      }  
    },
  },
  score: {
    screen: ScorePage,
    navigationOptions: {
      tabBarLabel: '打分',
      tabBarIcon: ({focused})=>{
        if(focused) {
          return (<Icon name="pencil-square-o" size={24} color="#7fb80e" />);
        }
        else {
          return (<Icon name="pencil-square-o" size={24} color="#1a2933" />);
        }
      }  
    },
  },
};
const tabs = [TABS.class, TABS.static, TABS.score];
const Rootstack = createBottomTabNavigator(tabs, {
  tabBarOptions: {
 /*    activeTintColor: '#1d953f', //活动选项卡的标签和图标颜色。
    activeBackgroundColor: '#77ac98', //活动选项卡的背景颜色。
    inactiveTintColor: '#6f60aa', //非活动选项卡的标签和图标颜色。
    inactiveBackgroundColor: '#cde6c7', //非活动选项卡的背景颜色。 */
    style: {
      backgroundColor: '#fffef9',//fffef9
      borderTopWidth: 0.2,
      paddingTop:10,
      borderTopColor: 'red',
  },
  activeTintColor: '#7fb80e',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#1a2933',
            animationEnabled: true,

    // style: {},//标签栏的样式对象。
    labelStyle: {
      //选项卡标签的样式对象。
      fontSize: 10
      
      //color:"#7fb80e"
    },
  },
});

export default createAppContainer(Rootstack);
