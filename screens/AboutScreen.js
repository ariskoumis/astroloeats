import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import parseDate from '../utils/parseDate';


export default class AboutScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			isDateTimePickerVisible: false
		}
	}

	async _handleDatePicked(date) {
		this.props.handleBirthdayUpdate(parseDate(date))
	}

	render() {
		return (
			<View style={styles.container}>
				<Text> About </Text>
				<Text> AstrologEats decides what you should eat based on your daily horoscope! Using IBM Watson's Tone Analyzer, AstrologEats is able to detect the overall tone of your horoscope and uses it to suggest you a resturant that complements your horoscope!
				</Text>
				<TouchableOpacity onPress={this.props.handleLogout}>
					<Text> Logout </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setState({isDateTimePickerVisible: true})}>
					<Text> Update Birthday </Text>
				</TouchableOpacity>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={() => this.setState({isDateTimePickerVisible: false})}
		        />
		        <Text> Project Created by Aris Koumis </Text>
		        <Text> Insert Github Here </Text>
	        	<Text> Insert Contact Email Here </Text>
	        	<Text> Insert Linkedin </Text> 
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