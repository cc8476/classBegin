/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './multinavigator/container';
//import App from './testApp';
import {name as appName} from './app.json';

import data from './multinavigator/data/data';

data.Instance().init();


AppRegistry.registerComponent(appName, () => App);
