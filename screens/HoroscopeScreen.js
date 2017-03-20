import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Button,
	Alert,
	AsyncStorage,
	TouchableHighlight
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {Components} from 'expo';
import getAstrologicalSign from '../utils/getAstrologicalSign';
import encodeQueryString from '../utils/encodeQueryString';
import dominantTones from '../utils/dominantTones';

export default class HoroscopeScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			screenIsReady: false,
			dailyHoroscope: "",
			horoscopeTone: ""
		}
	}

	const InfoTabs = TabNavigator({
	  tabBarOptions: {
	    style: styles.tabbar,
	    indicatorStyle: styles.indicator,
	    labelStyle: styles.tablabel,
	    activeTintColor: '#222',
	    inactiveTintColor: '#222',
	  },
	  backBehavior: 'none',
	  initialRouteName: 'Details',
	  order: [ 'Details', 'Matches', 'Tools' ],
	});


	static route = {
		navigationBar: {
			title: "Horoscope"
		}
	}

	async componentDidMount() {
		await this._loadContentAsync()
		this.setState({
			screenIsReady: true
		})
	}

	render () {
		if (!this.state.screenIsReady) {
			return (
				<View style={styles.container}>
					<Text> Loading </Text>
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={true}
					>
						<Button title="hello"/>
						<Button title="hello"/>
						<Button title="hello"/>
						<Button title="hello"/>
					</ScrollView>
					<ScrollView>			
						<Text> 
							{this.state.dailyHoroscope} 
						</Text>
						<Text>
							Insert Tone Analysis Here
						</Text>
					</ScrollView>
				</View>
			)	
		}
		
	}

	_loadContentAsync = async () => {
		var sign = await getAstrologicalSign()
		const response = await fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/today`)
		var horoscope = JSON.parse(response._bodyText).horoscope

		// var horoscopeTone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit
		// console.log(horoscopeTone)
		// var dominantTones = await dominantTones(horoscopeTone)
		// console.log(dominantTones)

		this.setState({
			dailyHoroscope: horoscope,
			// horoscopeTone: JSON.stringify(horoscopeTone)
		})
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'stretch'
  }
});