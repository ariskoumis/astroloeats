import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

import HoroscopeScreenHeader from '../components/HoroscopeScreenHeader';
import MoodGraph from '../components/MoodGraph';

var {height, width} = Dimensions.get('window')

const CONTENT = [
	{
		title: "Today's Horoscope",
	},
	{
		title: "Horoscope's Tone"
	},
	{
		title: "Food Recommendations"
	}
]

export default class HoroscopeScreen extends React.Component {
	constructor() {
		super()

		this.renderContent = this.renderContent.bind(this)
		this.foodRecText = this.foodRecText.bind(this)
	}

	renderHeader(section, i, isActive) {
		return (
			<Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
				<Text style={styles.headerText}>{section.title}</Text>
			</Animatable.View>
		);
	}

	foodRecText() {
		if (this.props.foods[0].length == 1) {
			return `Your horoscope shows signs of ${this.props.foods[0][0]}.`
		}
		return `Your horoscope shows signs of ${this.props.foods[0][0]} and ${this.props.foods[0][1]}.`
	}

	renderContent(section, i, isActive) {
		switch(section.title) {
			case "Today's Horoscope":
				return (
					<Animatable.View duration={400}  style={styles.content} transition="backgroundColor">
						<Animatable.Text animation={isActive ? 'bounceIn' : undefined}>{this.props.horoscope}</Animatable.Text>
					</Animatable.View>
				)
				break
			case "Horoscope's Tone":
				return (
					<Animatable.View duration={400}  style={styles.content} transition="backgroundColor">
						<Animatable.Text style={styles.bodyHeader} animation={isActive ? 'bounceIn' : undefined}>
							This graph displays the probability of each tone that is detected in your horoscope. 
						</Animatable.Text>
						<Animatable.View duration={600}>
							<MoodGraph tone={this.props.tone}/>
						</Animatable.View>
					</Animatable.View>
				)
				break
			case "Food Reccomendations":
				return (
					<Animatable.View duration={400}  style={[styles.content]} transition="backgroundColor">
						<Animatable.Text style={styles.bodyHeader} animation={isActive ? 'bounceIn' : undefined}>
							{this.foodRecText()}
						</Animatable.Text>
						<Animatable.Text style={styles.bodySubheader} animation={isActive ? 'bounceIn' : undefined}>
							We Reccomend: 
						</Animatable.Text>
						<Animatable.Text style={styles.bodyText} animation={isActive ? 'bounceIn' : undefined}>
							• {this.props.foods[1]} {"\n"}
							• {this.props.foods[2]} {"\n"}
							• {this.props.foods[3]}
						</Animatable.Text>
						<Animatable.View>
							<TouchableOpacity style={styles.mapButton} activeOpacity={1}  onPress={this.props.switchToMap}>
								<Text style={{fontSize: 30, paddingRight: 5}} style={{color: '#000000'}}>Show Me Restaurants</Text>
								<Icon style={{marginLeft: 5}} size={30} name="arrow-right" color="#000000" />
							</TouchableOpacity>
						</Animatable.View>
					</Animatable.View>
				)
				break
			default:
				break

		}
		
	}

	render() {
		return (
			<View style={{flex: 1}} >
				<HoroscopeScreenHeader sign={this.props.sign} />
				<View style={styles.container}>
					<Accordion
						initiallyActiveSection={0}
						sections={CONTENT}
						renderHeader={this.renderHeader}
						renderContent={this.renderContent}
						duration={400}
					/> 
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		padding: 5
	},
	headerText: {
		textAlign: 'center',
		fontSize: 25,
		fontWeight: '500'
	},
	bodyHeader: {
		alignSelf: 'center',
		fontStyle: 'italic'
	},
	bodySubheader: {
		marginTop: 5,
		fontWeight: '700',
		alignSelf: 'center'
	},
	bodyText: {
		alignSelf: 'center'
	},
	content: {
		backgroundColor: 'transparent',
		paddingLeft: 10,
		paddingRight: 10,
	},
	active: {
		backgroundColor: '#488FCC',
	},
	inactive: {
		backgroundColor: '#6CA9DC',
	},
	container: {
		flex: 1,
		alignItems: 'stretch'
	},
	mapButton: {
		flexDirection:'row', 
		alignSelf: 'stretch',
		alignItems:'center', 
		justifyContent:'center', 
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#FFC474",
		borderRadius: 5,
		padding: 5
	}
})
