import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Linking
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';

import parseDate from '../utils/parseDate';

export default class AboutScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			isDateTimePickerVisible: false
		}
		this._handleDatePicked = this._handleDatePicked.bind(this)
	}

	_handleDatePicked(date) {
		this.setState({isDateTimePickerVisible: false})
		this.props.handleBirthdayUpdate(parseDate(date))
	}

	openArisEmail() {
		Communications.email(["ariskoumis@gmail.com"], null, null, "AstroloEats", null)
	}

	openArisGithub() {
		Linking.openURL('https://github.com/ariskoumis/astroloeats').catch(err => console.error('An error occurred', err));		
	}

	openExpoWebite() {
		Linking.openURL('https://expo.io/').catch(err => console.error('An error occurred', err))
	}

	openExpoGithub() {
		Linking.openURL('https://github.com/expo/awesome-exponent').catch(err => console.error('An error occurred', err))
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}> Settings </Text>
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity style={styles.button} onPress={() => this.setState({isDateTimePickerVisible: true})}>
						<Text style={{color:'#ffffff'}}> Update Birthday </Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.props.handleLogout}>
						<Text style={{color:'#ffffff'}}> Logout </Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.header}> About </Text>
				<Text style={styles.body}>
				AstroloEats decides what you should eat based on your daily horoscope! Using IBM Watson's Tone Analyzer, AstrologEats is able to detect the overall tone of your horoscope and uses it to suggest you a resturant that complements your horoscope.
				</Text>

				<View style={{justifyContent: 'center', alignItems: 'center'}}>
					<Text style={styles.subheader}>Created by Aris Koumis</Text>
					<View style={{flexDirection: 'row'}}>
						<Icon onPress={this.openArisEmail} size={30} name="mail" />
						<Icon onPress={this.openArisGithub} size={30} name="github" />
					</View>

					<Text style={styles.subheader}>Built using Expo</Text>
					<View style={{flexDirection: 'row'}}>
						<Icon onPress={this.openExpoWebite} size={30} name="globe" />
						<Icon onPress={this.openExpoGithub} size={30} name="github" />
					</View>
				</View>

		        <DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={() => this.setState({isDateTimePickerVisible: false})}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
  	flex: .5,
  	backgroundColor: '#1B18B1',
  	borderRadius: 5,
  	padding: 5,
  	margin: 5,
  	alignItems: 'center'
  },
  body: {
  	fontSize: 15,
  	paddingLeft: 10,
	paddingRight: 10
  },
  header: {
  	fontSize: 30
  },
  subheader: {
  	fontSize: 15,
  	fontStyle: 'italic'
  }
});