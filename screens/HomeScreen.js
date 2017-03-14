import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
} from 'react-native';
import Router from '../navigation/Router';

export default class HomeScreen extends  React.Component {

	render () {
		return (
			<View style={styles.container}>
				<View style={styles.homebutton}>
					<Button onPress={this._goToAbout} title="About"/>
					<Button onPress={this._goToHoroscope} title="Horoscope"/>
				</View>
			</View>
		)
	}

	_goToHoroscope = () => {
		this.props.navigator.push(Router.getRoute('horoscope'))
	}

	_goToAbout = () => {
		this.props.navigator.push(Router.getRoute('about'))
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebutton: {
  	flex: 1,
  	flexDirection: 'column',
  	justifyContent: 'flex-end',
  	bottom: 100
  }
});