import React from 'react';

import ClassPage from './ClassPage';
import StaticPage from './StaticPage';
import ScorePage from './ScorePage';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import {Image} from 'react-native';

const TABS = {
  class: {
    screen: ClassPage,
    navigationOptions: {
      tabBarLabel: '课程表',
      tabBarIcon: focus => {
        if (focus) {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/class.png')}></Image>
          );
        } else {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/class.png')}></Image>
          );
        }
      },
    },
  },
  static: {
    screen: StaticPage,
    navigationOptions: {
      tabBarLabel: '统计',
      tabBarIcon: focus => {
        if (focus) {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/static.png')}></Image>
          );
        } else {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/static.png')}></Image>
          );
        }
      },
    },
  },
  score: {
    screen: ScorePage,
    navigationOptions: {
      tabBarLabel: '打分',
      tabBarIcon: focus => {
        if (focus) {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/score.png')}></Image>
          );
        } else {
          return (
            <Image
              style={{width: 20, height: 20}}
              source={require('./assets/score.png')}></Image>
          );
        }
      },
    },
  },
};
const tabs = [TABS.class, TABS.static, TABS.score];
const Rootstack = createBottomTabNavigator(tabs, {
  tabBarOptions: {
    activeTintColor: 'blue', //活动选项卡的标签和图标颜色。
    activeBackgroundColor: 'red', //活动选项卡的背景颜色。
    inactiveTintColor: 'yellow', //非活动选项卡的标签和图标颜色。
    inactiveBackgroundColor: 'pink', //非活动选项卡的背景颜色。

    // showLabel: true,//是否为标签显示标签，默认为true。
    // showIcon: true,//是否显示选项卡的图标，默认为true。

    // style: {},//标签栏的样式对象。
    labelStyle: {
      //选项卡标签的样式对象。
      fontSize: 15,
    },
  },
});

export default createAppContainer(Rootstack);
