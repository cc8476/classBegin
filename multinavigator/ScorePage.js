import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Score from './score/Score';

/**
 * 得分导航的容器
 * ---得分页面
 *
 */

//堆栈方式的导航
const Rootstack = createStackNavigator(
  {
    Score: Score,
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
