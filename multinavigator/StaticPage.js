import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Static from './static/Static';

/**
 * 导航的容器
 * ---统计页面
 *
 */
const Rootstack = createStackNavigator(
  {
    Static: Static,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index === 0,
    }),
  },
);

//这里不用输出AppContainer
const AppContainer = createAppContainer(Rootstack);

export default Rootstack;
