import {createRouter} from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HoroscopeTabView from '../screens/HoroscopeTabView';
import MapScreen from '../screens/MapScreen';

export default createRouter(() => ({
	home: () => HomeScreen,
	about: () => AboutScreen,
	horoscope: () => HoroscopeTabView,
	map: () => MapScreen
}));