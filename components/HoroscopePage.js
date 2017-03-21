import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import HoroscopePageHeader from '../components/HoroscopePageHeader';
import FoodSuggestions from '../components/FoodSuggestions';

export default class HoroscopeScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sign: props.sign,
			horoscope: props.horoscope,
			tone: props.tone
		}
	}
	render () {
		return (
			<View style={[styles.page, { backgroundColor: '#ffffff' }]}>
				<View style={styles.header}>
					<HoroscopePageHeader sign={this.state.sign} />
				</View>
				<View style={styles.horoscope}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Today's Horoscope
					</Text>
					<Text style={{color: "#000000"}}>
						{this.state.horoscope} 
					</Text>
				</View>
				<View style={styles.tone}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Mood Prediction
					</Text>
				</View>
				<View style={styles.reccomendation}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Food Suggestions
					</Text>
					<FoodSuggestions tone={this.state.tone} />
				</View>
			</View>
		)   
	}
	
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
  	},
  	header: {
		flex: .09
	},
  	horoscope: {
		alignItems: 'center',
		backgroundColor: "#f9c26a",
		borderRadius: 15,
		padding:5
  	},
  	tone: {
		alignItems: 'center',
		backgroundColor: "#ac728f",
		borderRadius: 15,
		padding:5
  	},
  	reccomendation: {
  		alignItems: 'center',
		backgroundColor: "#ac728f",
		borderRadius: 15,
		padding:5	
  	}
});

