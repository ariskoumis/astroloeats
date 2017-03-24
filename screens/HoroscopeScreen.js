import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import HoroscopeScreenHeader from '../components/HoroscopeScreenHeader';
import MoodAnalytics from '../components/MoodAnalytics';

export default class HoroscopeScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sign: props.sign,
			horoscope: props.horoscope,
			tone: props.tone,
			foods: props.foods
		}
	}

	render() {
		return (
			
			<View style={[styles.page, { backgroundColor: '#ffffff' }]}>
				<View style={styles.header}>
					<HoroscopeScreenHeader sign={this.props.sign} />
				</View>
				<View style={styles.horoscope}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Today's Horoscope
					</Text>
					<Text style={{color: "#000000"}}>
						{this.props.horoscope} 
					</Text>
				</View>
				<View style={styles.tone}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Mood Prediction
					</Text>
					<MoodAnalytics />
				</View>
				<View style={styles.reccomendation}>
					<Text style={{fontWeight: "bold", fontSize: 16}}>
						Food Suggestions
					</Text>
					<Text> {this.props.foods[0]}, {this.props.foods[1]}, {this.props.foods[2]} </Text>
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

