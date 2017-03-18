import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Alert,
	AsyncStorage
} from 'react-native';
import getAstrologicalSign from '../utils/getAstrologicalSign';
import encodeQueryString from '../utils/encodeQueryString';

export default class HoroscopeScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			dailyHoroscope: "",
		}
		this._getHoroscope = this._getHoroscope.bind(this)
	}

	static route = {
		navigationBar: {
			title: "Horoscope"
		}
	}

	async componentDidMount() {
		var birthday = await AsyncStorage.getAllKeys()
	}

	render () {
		return (
			<View style={styles.container}>			
				<Button onPress={this._getHoroscope} title="Get Horoscope" /> 
				<Text> 
					{this.state.dailyHoroscope} 
				</Text>
			</View>
		)
	}

	_getHoroscope = async () => {
		var sign = await getAstrologicalSign();
		const response = await fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/today`)
		var horoscope = JSON.parse(response._bodyText).horoscope
		this.setState({
			dailyHoroscope: horoscope
		})
		horoscope = encodeQueryString(horoscope)
		var horoscopeTone = await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${horoscope}`)
		console.log(horoscopeTone._bodyInit)
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