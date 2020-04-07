/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './multinavigator/rootContainer';
//import App from './testApp';
import data from './multinavigator/data/data';
import {name as appName} from './app.json';

data.Instance().init();


AppRegistry.registerComponent(appName, () => App);
