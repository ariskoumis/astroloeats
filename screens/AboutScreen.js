import React from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

export default class AboutScreen extends React.Component {
	static route = {
		navigationBar: {
			title: "About"
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text> About </Text>
				<Text> AstrologEats decides what you should eat based on your daily horoscope! Using IBM Watson's Tone Analyzer, AstrologEats is able to detect the overall tone of your horoscope and uses it to suggest you a resturant that complements your horoscope!
				</Text>
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