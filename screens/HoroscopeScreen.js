import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Alert
} from 'react-native';

export default class HoroscopeScreen extends React.Component {
	static route = {
		navigationBar: {
			title: "Horoscope"
		}
	}

	render () {
		return (
			<View style={styles.container}>			
				<Text> Horoscope </Text>
				<Button onPress={this._getHoroscope} title="Get Horoscope" /> 
			</View>
		)
	}

	_getHoroscope = async () => {
		const response = await fetch('http://theastrologer-api.herokuapp.com/api/horoscope/aries/today')
		var horoscope = response._bodyText.horoscope
		console.log(response._bodyText.sunsign)
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