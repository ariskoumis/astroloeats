import {createRouter} from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HoroscopeScreen from '../screens/HoroscopeScreen';

export default createRouter(() => ({
	home: () => HomeScreen,
	about: () => AboutScreen,
	horoscope: () => HoroscopeScreen,
}));