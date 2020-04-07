import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ClassTable from './class/classTable';
import AddClass from './class/addClass';
import AddMile from './class/addMile';
import ClassDetail from './class/classDetail';
import MileDetail from './class/mileDetail';

/**
 * 课程表导航的容器
 * ---课程表页面
 * ---添加课程页面
 * ---课程表详细
 * ---添加里程碑
 * ---里程碑详细
 *
 */

//堆栈方式的导航
const Rootstack = createStackNavigator(
  {
    Table: ClassTable,
    Add: AddClass,
    AddMile: AddMile,
    ClassDetail: ClassDetail,
    MileDetail: MileDetail,
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
