import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
} from 'react-native';
import {
	Components,
	Location
} from 'expo';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import HoroscopeScreen from './HoroscopeScreen';
import AboutScreen from './AboutScreen';
import MapScreen from './MapScreen';

import StatusBarBackground from '../components/StatusBarBackground';

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
			sign: "",
			region: props.region
		}

		this._handleChangeTab = this._handleChangeTab.bind(this)
		this._renderFooter = this._renderFooter.bind(this)
		this._loadContentAsync = this._loadContentAsync.bind(this)
		this._renderScene = this._renderScene.bind(this)
	}

	async componentDidMount() {
	    await this._loadContentAsync()
	    this.setState({
	      	appIsReady: true
	    })
  	}  

  	async _loadContentAsync() {
    	var sign = await getAstrologicalSign()

    	const horoscopeRequest = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
    	var horoscope = JSON.parse(horoscopeRequest._bodyText).horoscope

    	var tone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit
    	var foods = decideFoods(tone)

    	var currentLocation = await Location.getCurrentPositionAsync()
		var region = {
			latitude: currentLocation.coords.latitude,
		 	longitude: currentLocation.coords.longitude,
		 	latitudeDelta: 0,
      		longitudeDelta: 0
		}

    	var [food1, food2, food3] = foods
		var restaurantRequest = await fetch(`https://5i9mycougi.execute-api.us-west-1.amazonaws.com/prod/?longitude=${region.longitude}&latitude=${region.latitude}&keyword=${encodeURI(food1)}%20${encodeURI(food2)}%20${encodeURI(food3)}`)
		var restaurants = JSON.parse(JSON.parse(restaurantRequest._bodyInit)).businesses
		
    	this.setState({
	        horoscope: horoscope,
	        tone: JSON.stringify(tone),
	        sign: sign,
	        foods: foods,
	        region: region,
	        restaurants: restaurants
	    })
    }

	_renderScene({route}) {
		switch(route.key) {
		case '1':
			return <HoroscopeScreen horoscope={this.state.horoscope} sign={this.state.sign} tone={this.state.tone} foods={this.state.foods}/>
			break
		case '2':
			return <MapScreen region={this.state.region} restaurants={this.state.restaurants}/>
			break
		case '3':
			return <AboutScreen />
			break
		default:
			return null
		}
	}

	_renderLabel(Scene) {
    	const label = Scene.route.title
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

	_handleChangeTab(index) {
		this.setState({ index })
	}

	_renderFooter(props) {
		return <TabBar {...props} 
				renderLabel={this._renderLabel} 
				borderStyle={{color: "#00000"}} 
				labelStyle={{color:"#ffffff"}} 
				indicatorStyle={{backgroundColor: "#ffffff"}}
				/>
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