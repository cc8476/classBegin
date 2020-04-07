import React from 'react';

import ClassPage from './ClassPage';
import StaticPage from './StaticPage';
import ScorePage from './ScorePage';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 *
 *底部导航
 *
 */


function getNavigation(label,icon) {

  return {
    tabBarLabel: label,
    tabBarIcon: ({focused}) => {
      if (focused) {
        return <Icon name={icon} size={24} color="#7fb80e" />;
      } else {
        return <Icon name={icon} size={24} color="#1a2933" />;
      }
    },
  }
}


const TABS = {
  class: {
    screen: ClassPage,
    navigationOptions:getNavigation("课程表","calendar")
  },
  static: {
    screen: StaticPage,
    navigationOptions: getNavigation("统计",'bar-chart'),
  },
  score: {
    screen: ScorePage,
    navigationOptions: getNavigation("打分",'pencil-square-o')
  },
};
const tabs = [TABS.class, TABS.static, TABS.score];
const Rootstack = createBottomTabNavigator(tabs, {
  tabBarOptions: {
    style: {
      backgroundColor: '#fffef9', //fffef9
      borderTopWidth: 0.2,
      paddingTop: 10,
      borderTopColor: 'red',
    },
    activeTintColor: '#7fb80e',
    inactiveTintColor: '#1a2933',
    animationEnabled: true,

    labelStyle: {
      fontSize: 10
    },
  },
});

export default createAppContainer(Rootstack);
