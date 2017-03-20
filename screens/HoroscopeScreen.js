import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Button,
	Alert,
	AsyncStorage
} from 'react-native';
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

		var horoscopeTone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit
		var test = await dominantTones(horoscopeTone)
		console.log(test)

		this.setState({
			dailyHoroscope: horoscope,
			horoscopeTone: JSON.stringify(horoscopeTone)
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
});