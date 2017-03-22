import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
} from 'react-native';
import {Components} from 'expo'
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import HoroscopePage from '../components/HoroscopePage';
import MoodPage from '../components/MoodPage';
import StatusBarBackground from '../components/StatusBarBackground';

import AboutScreen from '../screens/AboutScreen';
import MapScreen from '../screens/MapScreen';

import getAstrologicalSign from '../utils/getAstrologicalSign';
import decideFoods from '../utils/decideFoods';

export default class HoroscopeTabView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			appIsReady: false,
			index: 0,
			routes: [
				{ key: '1', title: 'Horoscope' },
				{ key: '2', title: 'Map'},
				{ key: '3', title: 'About'}
			],
			horoscope: "",
			tone: "",
			sign: ""
		}
	}

	async componentDidMount() {
	    await this._loadContentAsync()
	    this.setState({
	      	appIsReady: true
	    })
  	}  

  	_loadContentAsync = async () => {
    	var sign = await getAstrologicalSign()
    	const response = await fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/today`)
    	var horoscope = JSON.parse(response._bodyText).horoscope
    	var tone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit
    	var foods = decideFoods(tone)

    	this.setState({
	        horoscope: horoscope,
	        tone: JSON.stringify(tone),
	        sign: sign,
	        foods: foods
	    })
    }

	render() {
		if (!this.state.appIsReady) {
      		return <Components.AppLoading/>
    	}

		return (
			<View style={styles.container}>
				<StatusBarBackground />
				<TabViewAnimated 
					style = {styles.container}
					navigationState = {this.state}
					renderScene = {this._renderScene}
					onRequestChangeTab = {this._handleChangeTab}
					renderFooter = {this._renderFooter}
				/>
			</View>
		)
	}

	_renderScene = ({route}) => {
		switch(route.key) {
		case '1':
			return <HoroscopePage horoscope={this.state.horoscope} sign={this.state.sign} tone={this.state.tone} foods={this.state.foods}/>
			break
		case '2':
			return <MapScreen />
			break
		case '3':
			return <AboutScreen />
			break
		default:
			return null
		}
	}

	_renderLabel = (scene: Scene) => {
    	const label = scene.route.title
    	switch(label) {
    	case 'Horoscope':
    		return <Image style={{height:38, width:30}} source={require('../assets/icons/crystal-ball.png')} />
    		break
		case 'Map':
			return <Icon size={30} name="map-o" />
			break
		case 'About':
			return <Icon size={35} name="question" />
			break
		default:
			break
    	}
	}

	_handleChangeTab = (index) => {
		this.setState({ index })
	}

	_renderFooter = (props) => {
		return <TabBar {...props} 
				renderLabel={this._renderLabel} 
				borderStyle={{color: "#00000"}} 
				labelStyle={{color:"#ffffff"}} 
				indicatorStyle={{backgroundColor: "#ffffff"}}
				/>
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});