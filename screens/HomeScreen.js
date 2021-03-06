import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	AsyncStorage
} from 'react-native';
import {
	Components,
	Location
} from 'expo';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingScreen from './LoadingScreen';
import HoroscopeScreen from './HoroscopeScreen';
import AboutScreen from './AboutScreen';
import MapScreen from './MapScreen';

import StatusBarBackground from '../components/StatusBarBackground';

import getAstrologicalSign from '../utils/getAstrologicalSign';
import decideFoods from '../utils/decideFoods';
import shuffleArray from '../utils/shuffleArray';


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
			region: props.region
		}

		this.handleChangeTab = this.handleChangeTab.bind(this)
		this.renderFooter = this.renderFooter.bind(this)
		this.loadContentAsync = this.loadContentAsync.bind(this)
		this.renderScene = this.renderScene.bind(this)
		this.handleBirthdayUpdate = this.handleBirthdayUpdate.bind(this)
	}

	async componentDidMount() {
	    await this.loadContentAsync()
	    this.setState({
	      	appIsReady: true
	    })
  	}  

  	async loadContentAsync() {
  		//User's Zodiac Sign
    	var sign = await getAstrologicalSign()

    	//Call Horoscope API
    	const horoscopeRequest = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
    	var horoscope = JSON.parse(horoscopeRequest._bodyText).horoscope
    	//Horoscope API ends with a signature from api creator, signature starts with (c)
    	horoscope = horoscope.split('(c)')[0]

    	//Call Watson Tone Analyzer
    	var tone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit

    	//Get User Location
    	var currentLocation = await Location.getCurrentPositionAsync()
		var region = {
			latitude: currentLocation.coords.latitude,
		 	longitude: currentLocation.coords.longitude,
		 	latitudeDelta: 0.0922,
          	longitudeDelta: 0.0421,
		}

		//Choose Foods, Call Yelp API
		var foods = decideFoods(tone)
    	var [foodDescription, food1, food2, food3] = foods
		
		//An individual API Call for each food reccomendation    	
    	var restaurantReq1 = await fetch(`https://5i9mycougi.execute-api.us-west-1.amazonaws.com/prod/?longitude=${region.longitude}&latitude=${region.latitude}&keyword=${encodeURI(food1)}`)
		var restaurantReq2 = await fetch(`https://5i9mycougi.execute-api.us-west-1.amazonaws.com/prod/?longitude=${region.longitude}&latitude=${region.latitude}&keyword=${encodeURI(food2)}`)
		var restaurantReq3 = await fetch(`https://5i9mycougi.execute-api.us-west-1.amazonaws.com/prod/?longitude=${region.longitude}&latitude=${region.latitude}&keyword=${encodeURI(food3)}`)

		restaurantReq1 = JSON.parse(JSON.parse(restaurantReq1._bodyInit)).businesses
		restaurantReq2 = JSON.parse(JSON.parse(restaurantReq2._bodyInit)).businesses
		restaurantReq3 = JSON.parse(JSON.parse(restaurantReq3._bodyInit)).businesses
		var restaurants = [...restaurantReq1, ...restaurantReq2, ...restaurantReq3]

		restaurants = shuffleArray(restaurants)
    	this.setState({
	        horoscope: horoscope,
	        tone: JSON.stringify(tone),
	        sign: sign,
	        foods: foods,
	        region: region,
	        restaurants: restaurants
	    })
    }

	renderScene({route}) {
		switch(route.key) {
		case '1':
			return <HoroscopeScreen switchToMap={()=> this.setState({index: 1})} horoscope={this.state.horoscope} sign={this.state.sign} tone={this.state.tone} foods={this.state.foods}/>
			break
		case '2':
			return <MapScreen region={this.state.region} restaurants={this.state.restaurants}/>
			break
		case '3':
			return <AboutScreen handleBirthdayUpdate={this.handleBirthdayUpdate} handleLogout={this.props.handleLogout}/>
			break
		default:
			return null
		}
	}

	renderLabel(Scene) {
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

	async handleBirthdayUpdate(date) {
		this.setState({
	      	appIsReady: false
	    })
		await AsyncStorage.setItem('birthday', date)
		await this.loadContentAsync()
	    this.setState({
	      	appIsReady: true,
	      	index: 0
	    })
	}

	handleChangeTab(index) {
		this.setState({ index })
	}

	renderFooter(props) {
		return <TabBar {...props} 
				renderLabel={this.renderLabel} 
				borderStyle={{color: "#00000"}} 
				labelStyle={{color:"#ffffff"}} 
				indicatorStyle={{backgroundColor: "#ffffff"}}
				/>
	}

	render() {
		if (!this.state.appIsReady) {
      		return (
      			<LoadingScreen />
  			)
    	}

		return (
			<View style={styles.container}>
				<StatusBarBackground />
				<TabViewAnimated 
					style = {styles.container}
					navigationState = {this.state}
					renderScene = {this.renderScene}
					onRequestChangeTab = {this.handleChangeTab}
					renderFooter = {this.renderFooter}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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
	}
})