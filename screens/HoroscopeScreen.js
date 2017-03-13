import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button
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
			</View>
		)
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